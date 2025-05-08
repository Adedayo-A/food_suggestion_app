from flask import Flask
from flask_smorest import Api, Blueprint

server = Flask(__name__)

#Config like this
# server.config["API_TITLE"] = "My API"
# server.config["API_VERSION"] = "v1"
# server.config["OPENAPI_VERSION"] = "3.0.2"

#OR

class APIConfig:
    API_TITLE = "Food Search API"
    API_VERSION = "v1"
    OPENAPI_VERSION = "3.0.3"
    OPENAPI_URL_PREFIX = "/"
    OPENAPI_SWAGGER_UI_PATH = "/docs"
    OPENAPI_SWAGGER_UI_URL = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

server.config.from_object(APIConfig)

webapi =  Api(server)

api = Blueprint("api", __name__, url_prefix = "/api", description = "Food Finder API")
