from flask_smorest import Blueprint
from flask import request, jsonify, abort
import time
from api.extensions import cloudinary, jwt_required
from cloudinary.uploader import upload
from marshmallow import Schema, fields

bp = Blueprint('util', __name__)  # instantiate your 'util' Blueprint

class FileResponse(Schema):
  imageUrl = fields.String()


@bp.route('/time')
def get_current_time():
  return {'time': time.time()}


@jwt_required()
@bp.route('/upload-image', methods=['GET', 'POST'])
@bp.response(status_code = 200, schema=FileResponse)
def upload_image():

  if 'file' not in request.files:
    abort(400, "No file part")
  
  file = request.files['file']

  if file.filename == '':
    abort(400, "No selected file")

  try:
    #upload image
    result = upload(file)
    return jsonify( {
      'url': result['secure_url']
    })
  
  except Exception as e:
    abort(500, str(e))