from flask import request, json, jsonify
from app import app, db
from app.models import Entry, Prompt, Gratitude, User
from app.schemas import UserSchema, EntrySchema, PromptSchema, GratitudeSchema

class NotFound(Exception):
  status_code = 404
  def __init__(self, message, status_code=None, payload=None):
    Exception.__init__(self)
    self.message = message
    if status_code is not None:
      self.status_code = status_code
    self.payload = payload

  def to_dict(self):
    rv = dict(self.payload or ())
    rv['message'] = self.message
    return rv

@app.errorhandler(NotFound)
def handle_not_found(error):
  response = jsonify(error.to_dict())
  response.status_code = error.status_code
  return response

@app.route('/')
@app.route('/index')
def index():
  return 'ayelmao'

@app.route('/api/me', methods=['GET'])
def get_user_by_firebase_id():
  user_schema = UserSchema()

  fb_id = json.loads(request.data)['firebase_id']
  user = db.session.query(User).filter(User.firebase_id == fb_id).first()

  if user:
    return user_schema.dumps(user)
  else:
    raise NotFound("Could not find user with firebase_id of '{}'".format(fb_id))

