from app import app, db
from app.models import Entry, User, Prompt, Gratitude

db.drop_all()
db.create_all()

"""Users"""
users = [
  User(firebase_id='asdf'),
  User(firebase_id='butts'),
  User(firebase_id='cheese'),
  User(firebase_id='chicken')
  ]

"""Prompts"""
prompts = [
  Prompt(text='What are you grateful for?'),
  Prompt(text='How many fingers am I holding up?'),
  Prompt(text='How long is a piece of string?'),
  Prompt(text='If a tree falls in a forest, does it make a sound?')
  ]

"""Entries"""
entries = [
  Entry(response='butts'),
  Entry(response='The quick brown fox jumps over the lazy dog'),
  Entry(response='Long walks on the beach'),
  Entry(response='Ayelmao')
  ]

"""Grats"""
grats = [
  Gratitude(response='chicken fingers'),
  Gratitude(response='wowee zowee'),
  Gratitude(response='buttcheeks'),
  Gratitude(response='wubba lubba dub dub')
]

entries[0].prompt = prompts[0]
entries[1].prompt = prompts[0]
entries[2].prompt = prompts[2]
entries[3].prompt = prompts[3]

users[0].entries.append(entries[0])
users[0].entries.append(entries[2])
users[1].entries.append(entries[1])
users[2].entries.append(entries[3])

users[0].grats.append(grats[0])
users[1].grats.append(grats[1])
users[3].grats.append(grats[2])
users[1].grats.append(grats[3])


for x in [*users, *entries, *prompts, *grats]:
  db.session.add(x)

db.session.commit()