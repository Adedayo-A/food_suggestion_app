import os
from datetime import timedelta
from extensions import cloudinary

class ProdConfig:
    # Database configuration
    API_TOKEN = os.environ.get('PROD_MARKET_STACK_API_KEY_SECRET')


class DevConfig:
    # Database configuration
    API_TOKEN = os.environ.get('API_KEY_SECRET')
    API_TITLE = "Food Search API"
    API_VERSION = "v1"
    OPENAPI_VERSION = "3.0.3"
    OPENAPI_URL_PREFIX = "/"
    OPENAPI_SWAGGER_UI_PATH = "/docs"
    OPENAPI_SWAGGER_UI_URL = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    #SQLALCHEMY_DATABASE_URI = "sqlite:///database.db" 
    SQLALCHEMY_DATABASE_URI = 'sqlite:////Users/adedayoadesegun/Documents/recipe-suggestion/food_suggestion_app/database.db'
    SECRET_KEY = os.environ.get('SQL_ALCHEMY_KEY')
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_SECRET_KEY = 'mysecretkey'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    # JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    JWT_ALGORITHM = "HS256"
    

class TestConfig:
    # Database configuration
    API_TOKEN = os.environ.get('MARKET_STACK_API_KEY')

configs = {
    'development': DevConfig,
    'test': TestConfig,
    'prod': ProdConfig
}