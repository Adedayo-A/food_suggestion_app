# Entry point for the application.
from . import server, webapi, api    # For application discovery by the 'flask' command.
from .utility import utility
from .integration import integration
from .recipes import recipe_finder
from flask_sqlalchemy import SQLAlchemy

webapi.register_blueprint(api)
