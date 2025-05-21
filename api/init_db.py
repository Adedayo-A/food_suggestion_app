from . import db
from . import app
from .users.models import User

with app.app_context():
  # Needed for DB operations
  db.drop_all()
  db.create_all()
  print("Database created")

  user1 = User(username = 'jackson', password='12345')
  user2 = User(username = 'matt', password='123456')
  db.session.add_all([user1, user2])
  db.session.commit()

