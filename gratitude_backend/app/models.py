from app import db
from datetime import datetime

""" Models go here """

class Entry(db.Model):
  __tablename__ = 'entry'
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), index=True)
  prompt_id = db.Column(db.Integer, db.ForeignKey('prompt.id'))
  response = db.Column(db.String(5000))

  prompt = db.relationship('Prompt', backref='prompt_id')

  def __repr__(self):
    return '<Entry {}>'.format(self.id)

class Prompt(db.Model):
  __tablename__ = 'prompt'
  id = db.Column(db.Integer, primary_key=True)
  text = db.Column(db.String(500))

  def __repr__(self):
    return '<Prompt {}>'.format(self.id)

class Gratitude(db.Model):
  __tablename__ = 'gratitude'
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), index=True)
  response = db.Column(db.String(1000))

  def __repr__(self):
    return '<Gratitude {}>'.format(self.id)

class User(db.Model):
  __tablename__ = 'user'
  id = db.Column(db.Integer, primary_key=True)
  firebase_id = db.Column(db.String(128), unique=True)
  created_at = db.Column(db.DateTime, default=datetime.now)
  entries = db.relationship('Entry', backref='user')
  grats = db.relationship('Gratitude', backref='user')

  def as_dict(self):
    return {c.name: getattr(self, c.name) for c in self.__table__.columns}