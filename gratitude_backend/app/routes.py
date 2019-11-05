from app import app
from app.models import Entry, Prompt, Gratitude

@app.route('/')
@app.route('/index')
def index():
  return 'ayelmao'

@app.route('/initdb')
def initdb():
  """seed me"""
  return 'it worked?'