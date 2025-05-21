from flask import request, jsonify, abort
from flask_smorest import Blueprint
from flask_bcrypt import Bcrypt
from marshmallow import Schema, fields
from sqlalchemy import select, join


from api.extensions import db, bcrypt, create_access_token, get_jwt_identity 

from .models import User as DBUsers, User_Ingredient, Ingredient as DBIngredients  # Your model
from api.recipes.recipe_finder import Ingredient

bp = Blueprint('users', __name__)  # instantiate your 'route' Blueprint

class User(Schema):
    username = fields.String()
    password = fields.String()

class DBResponse(Schema):
    success = fields.Boolean()
    message = fields.String()

class LoggedIn(Schema):
    username = fields.String()
    token = fields.String()

# class CreateUserResponse(LoggedIn, DBResponse):
#     success = fields.Boolean()
#     message = fields.String()
#     username = fields.String()
#     token = fields.String()

class Profile(LoggedIn):
    Ingredients = fields.List(fields.Nested(Ingredient))

class user_fn ():
    @bp.route('/', methods=['GET', 'POST']) 
    def home():
        return jsonify()
    
    def protected():
        current_user = get_jwt_identity()
        return jsonify(logged_in_as=current_user)
    
    def validate_username (self, username):
        existing_user_username = DBUsers.query.filter_by(
        username=username.data).first()
        if existing_user_username:
            return False
        return True
        
    @bp.route('/register', methods=['GET', 'POST'])
    @bp.arguments(User)
    @bp.response(status_code=201, schema=LoggedIn) 
    def register(self):
        username = request.json.get('username')
        password = request.json.get('password')

        existing_user_username = DBUsers.query.filter_by(
        username=username).first()

        if existing_user_username == None:
            hashed_password = bcrypt.generate_password_hash(password)
            new_user = DBUsers(username=username, password=hashed_password)
            db.session.add(new_user)
            db.session.commit()

            access_token = create_access_token(identity=username)
            user_id = new_user.id

            response = {
                username: username, 
                "token": access_token,
                "user_id": user_id
            }
            return jsonify(response)
        
        abort(400, f"User {username} already exists")

    @bp.route('/login', methods=['GET', 'POST'])
    @bp.arguments(User) 
    @bp.response(status_code=200, schema=Profile)
    def login(self):
        username = request.json.get('username')
        password = request.json.get('password')
        user = DBUsers.query.filter_by(username=username).first()
        if user:
            if bcrypt.check_password_hash(user.password, password):
                
                token = create_access_token(identity=username)
                return jsonify({
                    "user_id": user.id,
                    "username": user.username, 
                    "token": token
                })
        abort(404, f"User {username} cannot be found")
    