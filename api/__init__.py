import os, sys; sys.path.append(os.path.dirname(os.path.realpath(__file__)))

from .app import create_app
from .server import app
from .extensions import db 

