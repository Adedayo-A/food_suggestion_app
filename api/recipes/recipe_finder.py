from datetime import datetime, timezone
from flask import views, abort, request, jsonify
from flask_smorest import Blueprint
from marshmallow import Schema, fields
from sqlalchemy import select, join

import uuid
import enum

from api.extensions import db, jwt_required
from api.users.models import Ingredient as DBIngredients, User_Ingredient

bp = Blueprint('recipes', __name__)  # instantiate your 'recipe' Blueprint


class CreateMyIngredient(Schema):
    ingredientId = fields.Integer()
    userId = fields.Integer()

class CreateIngredient(Schema):
    name  = fields.String()
    imageUrl = fields.String()
    userId = fields.Integer()

class Ingredient(CreateIngredient):
    id = fields.UUID()
    created = fields.DateTime()
    verified = fields.Boolean()

class Ingredients(Schema):
    ingredients = fields.List(fields.Nested(Ingredient))

class SortByEnum(enum.Enum):
    name = "name"
    created = "created"

class SortDirectionEnum(enum.Enum):
    asc = "asc"
    desc = "desc"

class GetIngredientsParameters(Schema):
    order_by = fields.Enum(SortByEnum, load_default=SortByEnum.created)
    order = fields.Enum(SortDirectionEnum, load_default=SortDirectionEnum.asc)
    name = fields.String()


# class IngredientsCollection(views.MethodView):
class IngredientsCollection():
    @bp.route('/ingredients')
    @bp.arguments(GetIngredientsParameters, location="query")
    @bp.response(status_code = 200, schema= Ingredients)
    def get(self):
        name = request.args.get('name')
        sortby = request.args.get('order_by', default=name, type=str)
        reverse = request.args.get('order') == SortDirectionEnum.desc
        # sortby = parameters["order_by"].value
        # reverse = parameters["order"] == SortDirectionEnum.desc
        
        if (reverse):
            ingredients = DBIngredients.query.order_by(sortby.desc()).all()
        
        ingredients = DBIngredients.query.order_by(sortby).all()

        return {
            "ingredients": ingredients
        }


    #Add to Ingredients Collection
    @jwt_required()
    @bp.route('/add-ingredient',  methods=['GET', 'POST'])
    @bp.arguments(CreateIngredient)
    @bp.response(status_code = 201, schema = Ingredient)
    def post(self):
        data = request.get_json()
        # ingredient = {}
        ingredient_name = data.get('name')
        ingredient_imageUrl = data.get('imageUrl')
        user_id = data.get('userId')
        # ingredient["id"] = uuid.uuid4()
        ingredient_created = datetime.now(timezone.utc)
        ingredient_verified = False

        new_ingredient = DBIngredients(name=ingredient_name, imageUrl=ingredient_imageUrl,
                                       created=ingredient_created, verified=ingredient_verified
                                       )
        
        db.session.add(new_ingredient)
        db.session.commit()

        new_ingredient_id = new_ingredient.id
        insert_stmt = User_Ingredient.insert().values(user_id = user_id, ingredient_id = new_ingredient_id)
        db.session.execute(insert_stmt)
        db.session.commit()

        # recipes.append(recipe)
        return jsonify({
            "name": new_ingredient.name,
            "created": new_ingredient.created,
            "imageUrl": new_ingredient.imageUrl,
            "id": new_ingredient.id,
            "created": new_ingredient.created,
            "verified": new_ingredient.verified
        })


    #Add to My Ingredients Collection
    @jwt_required()
    @bp.route('/add-favourite-ingredient',  methods=['GET', 'POST'])
    @bp.arguments(CreateMyIngredient)
    @bp.response(status_code = 201)
    def postMyIngredients(self):
        data = request.get_json()
        ingredient_id= data.get('ingredientId')
        user_id = data.get('userId')

        insert_stmt = User_Ingredient.insert().values(user_id = user_id, ingredient_id = ingredient_id)
        db.session.execute(insert_stmt)
        db.session.commit()

        return jsonify({
            "success": True
        })


    @bp.route('/my-ingredients')
    @bp.arguments(GetIngredientsParameters, location="query")
    @bp.response(status_code = 200)
    def getMyIngredients(self):
        user_id_str = request.args.get('user_id')
        sortby = request.args.get('order_by', default="created", type=str)
        reverse = request.args.get('order') == SortDirectionEnum.desc

        user_id = int(user_id_str)

        j = join(User_Ingredient, DBIngredients, User_Ingredient.c.ingredient_id == DBIngredients.id)
        
        if (reverse):        
            selectMyIngredientsQuery = select(User_Ingredient.c.user_id, DBIngredients.name, DBIngredients.imageUrl, DBIngredients.created)\
            .select_from(j)\
            .where(User_Ingredient.c.user_id == user_id).order_by(sortby.desc())

        squery = select(User_Ingredient).where(User_Ingredient.c.user_id == 5) #testing
        
        selectMyIngredientsQuery = select(User_Ingredient.c.user_id, DBIngredients.name, DBIngredients.id, DBIngredients.imageUrl, DBIngredients.created)\
            .select_from(j)\
            .where(User_Ingredient.c.user_id == user_id)
        
        result = db.session.execute(selectMyIngredientsQuery)
        #result = db.session.execute(squery)

        myIngredients = result.fetchall()
        results = [dict(row._mapping) for row in myIngredients]
        return jsonify ( 
            results
        )


@jwt_required()
@bp.route("/<uuid:ingredient_id>")
class Ingredient(views.MethodView):
    @bp.response(status_code = 200, schema = Ingredient)
    def get(self, ingredient_id):
        for ingredient in DBIngredients:
            if ingredient["id"] == ingredient_id:
                return ingredient
        abort(404, f"Recipe with ID {ingredient_id} not found")
