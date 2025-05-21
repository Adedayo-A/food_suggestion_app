from flask import request, jsonify
from flask_smorest import Blueprint

from api.extensions import db  # maybe you need it here


bp = Blueprint('errors', __name__)  # instantiate your 'users' Blueprint


@bp.route('/', methods=['GET', 'POST']) 
def index():

    return jsonify()