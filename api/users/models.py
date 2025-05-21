from api.extensions import db

from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(20), nullable = False)
    password = db.Column(db.String(80), nullable = False)

class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(80), nullable = False)
    created = db.Column(db.DateTime(), nullable = False)
    verified = db.Column(db.Boolean(), nullable = False)
    imageUrl = db.Column(db.String(), nullable = True)

User_Ingredient = db.Table('user_ingredient',
                    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
                    db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredient.id')))