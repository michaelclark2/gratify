from flask import json
from app import app
from app.models import Entry, Prompt, Gratitude, User
from app.schemas import UserSchema, EntrySchema, PromptSchema, GratitudeSchema

@app.route('/')
@app.route('/index')
def index():
  return 'ayelmao'

@app.route('/users', methods=['GET'])
def users():
  user_schema = UserSchema()
  users = User.query.all()

  return user_schema.dumps(users, many=True)
