from datetime import datetime, timezone
from flask import views
from marshmallow import Schema, fields

import uuid
import enum

from .. import server, api


recipes = [
    {
        "id": uuid.UUID("19ffa10e-7301-45ee-ab84-c651b08612de"), 
        "name": "Rice",
        "created": datetime.now(timezone.utc),
        "verified": True
    }
]

class CreateRecipe(Schema):
    name  = fields.String()

class Recipe(CreateRecipe):
    id = fields.UUID()
    created = fields.DateTime()

class ListRecipes(Schema):
    recipes = fields.List(fields.Nested(Recipe))

class SortByEnum(enum.Enum):
    name = "name"
    created = "created"

class SortDirectionEnum(enum.Enum):
    asc = "asc"
    desc = "desc"

class ListRecipeParameters(Schema):
    order_by = fields.Enum(SortByEnum, load_default=SortByEnum.created)
    order = fields.Enum(SortDirectionEnum, load_default=SortDirectionEnum.asc)
    name = fields.String()


@api.route('/recipe-finder')
class RecipeCollection(views.MethodView):
    @api.arguments(ListRecipeParameters, location="query")
    @api.response(status_code = 200, schema= ListRecipes)
    def get(self, parameters):
        if parameters["name"] != '':
            pass
        else:
            return {
                "recipes": sorted(
                    recipes,
                    key= lambda task: task[parameters["order_by"].value],
                    reverse = parameters["order"] == SortDirectionEnum.desc
                )
        }
    
    #Add to Recipe Collection
    @api.arguments(CreateRecipe)
    @api. response(status_code = 201, schema = Recipe)
    def post(self, recipe):
        recipe["id"] = uuid.uuid4()
        recipe["created"] = datetime.now(timezone.utc)
        recipe["verified"] = False
        recipes.append(recipe)

        return recipe
    