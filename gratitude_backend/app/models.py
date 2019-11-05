from app import db

""" Models go here """

prompt_entries = db.Table('prompt_entries', db.metadata,
  db.Column('entry_id', db.Integer, db.ForeignKey('entry.id')),
  db.Column('prompt_id', db.Integer, db.ForeignKey('prompt.id')))

class Entry(db.Model):
  __tablename__ = 'entry'
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.String(128), index=True)
  prompt = db.relationship('Prompt', secondary=prompt_entries, backref='prompt')
  response = db.Column(db.String(5000))

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
  user_id = db.Column(db.String(128), index=True)
  response = db.Column(db.String(1000))

  def __repr__(self):
    return '<Gratitude {}>'.format(self.id)