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

@app.route('/api/users/me', methods=['GET'])
def get_user_by_firebase_id():
  user_schema = UserSchema()

  fb_id = json.loads(request.data)['firebase_id']
  user = db.session.query(User).filter(User.firebase_id == fb_id).first()

  if user:
    return user_schema.dumps(user)
  else:
    raise NotFound("Could not find user with firebase_id of '{}'".format(fb_id))

@app.route('/api/users', methods=['POST'])
def add_new_user():
  fb_id = json.loads(request.data)['firebase_id']
  try:
    new_user = User(firebase_id=fb_id)
    db.session.add(new_user)
    db.session.commit()
    return 'Successfully added new user with id of {}'.format(new_user.id)
  except Exception as e:
    raise e

@app.route('/api/users/<user_id>', methods=['PUT', 'DELETE'])
def edit_user(user_id):
  if request.method == 'DELETE':
    User.query.filter(User.id == user_id).delete()
    db.session.commit()
    return 'Deleting user {}'.format(user_id)
  elif request.method == 'PUT':
    user = User.query.get(user_id)
    return 'Editing user {}'.format(user_id)

@app.route('/api/prompts')
def get_all_prompts():
  prompt_schema = PromptSchema()
  prompts = Prompt.query.all()
  return prompt_schema.dumps(prompts, many=True)

@app.route('/api/prompts/<prompt_id>')
def get_prompt_by_id(prompt_id):
  prompt_schema = PromptSchema()
  prompt = Prompt.query.filter(Prompt.id == prompt_id).first()

  if prompt:
    return prompt_schema.dumps(prompt)
  else:
    raise NotFound("Could not find prompt with id of '{}'".format(prompt_id))

@app.route('/api/entries/add', methods=['POST'])
def add_new_entry():
  entry_json = json.loads(request.data)
  new_entry = Entry(response=entry_json['response'])

  user = User.query.filter(User.id == entry_json['user_id']).first()
  prompt = Prompt.query.filter(Prompt.id == entry_json['prompt_id']).first()
  new_entry.user = user
  new_entry.prompt = prompt

  db.session.add(new_entry)
  db.session.commit()
  return 'Success'

@app.route('/api/entries/<entry_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_entries(entry_id):
  if request.method == 'GET':
    entry_schema = EntrySchema()
    entry = Entry.query.filter(Entry.id == entry_id).first()
    return entry_schema.dumps(entry)

  elif request.method == 'PUT':
    entry = Entry.query.filter(Entry.id == entry_id).first()
    entry.response = json.loads(request.data)['response']
    db.session.add(entry)
    db.session.commit()
    return 'Successfully edited entry {}'.format(entry.id)

  elif request.method == 'DELETE':
    Entry.query.filter(Entry.id == entry_id).delete()
    db.session.commit()
    return 'Successfully deleted entry {}'.format(entry_id)

@app.route('/api/gratitudes/add', methods=['POST'])
def add_gratitude():
  grat = json.loads(request.data)
  new_grat = Gratitude(response=grat['response'])
  user = User.query.filter(User.id == grat['user_id']).first()
  user.grats.append(new_grat)
  db.session.add(user)
  db.session.commit()
  return 'Added gratitude'

