# Entry point for the application.
from . import server, webapi, api    # For application discovery by the 'flask' command.
from .dashboard.util import time
from .dashboard import food_finder_llm_integration
from .dashboard import recipe_finder

webapi.register_blueprint(api)