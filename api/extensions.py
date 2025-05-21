from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (JWTManager, create_access_token, jwt_required, get_jwt_identity)
import cloudinary

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt_manager = JWTManager()