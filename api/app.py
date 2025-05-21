from flask import Flask
from flask_smorest import Api
import os



from .config import CONFIGS

def create_app(app_environment):
    """Create a Flask application using the app factory pattern."""

    app = Flask(__name__)

    """Load configuration."""
    app.config.from_object(CONFIGS[app_environment])  # an example 

    """Init app extensions."""
    from .extensions import db, bcrypt, jwt_manager, cloudinary
    db.init_app(app)
    bcrypt.init_app(app)
    jwt_manager.init_app(app)
    cloudinary.config( 
        cloud_name = "ddf91r8gu", 
        api_key = "724667567854695", 
        api_secret = "rKYUG6gXrlsWEmqOx_Sp4SNAsf8",
        secure=True 
    )   
    # cloudinary.config( 
    #     cloud_name = os.environ.get('CLOUDINARY_CLOUD_NAME'), 
    #     api_key = os.environ.get('CLOUDINARY_API_KEY'), 
    #     api_secret = os.environ.get('CLOUDINARY_API_SECRET'),
    #     secure=True 
    # )   

    """Register blueprints."""
    from .errors import bp as errors_bp
    app.register_blueprint(errors_bp)

    from .users import bp as users_bp
    app.register_blueprint(users_bp, url_prefix='/api/users')

    from .utility import bp as utils_bp
    app.register_blueprint(utils_bp, url_prefix='/api/utils')

    from .integration import bp as integrations_bp
    app.register_blueprint(integrations_bp, url_prefix='/api/integrations')

    from .recipes import bp as recipes_bp
    app.register_blueprint(recipes_bp, url_prefix='/api')

    # app =  Api(app)

    return app