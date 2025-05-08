from flask import Flask

import time

from ...import server

# app = Flask(__name__)

@server.route('/time')
def get_current_time():
  return {'time': time.time()}
