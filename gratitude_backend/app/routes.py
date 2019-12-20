from app import app
from app.models import Entry, Prompt, Gratitude, User

@app.route('/')
@app.route('/index')
def index():
  return 'ayelmao'

@app.route('/users')
def users():
  user = User.query.all()[0]
  user_entries = user.entries
  user_grats = user.grats

  return user.firebase_id + user_entries[0].prompt.text + user_grats[0].response

