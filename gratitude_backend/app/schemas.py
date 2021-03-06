from app import ma
from app.models import User, Gratitude, Prompt, Entry

class GratitudeSchema(ma.ModelSchema):
  class Meta:
    fields = ('id', 'response', 'created_at')

  model = Gratitude

class PromptSchema(ma.ModelSchema):
  class Meta:
    fields = ('id', 'text')

  model = Prompt

class EntrySchema(ma.ModelSchema):
  class Meta:
    fields = ('id', 'prompt', 'response', 'created_at')

  prompt = ma.Nested(PromptSchema)
  model = Entry

class UserSchema(ma.Schema):
  class Meta:
    fields = ('id', 'firebase_id', 'entries', 'grats', 'created_at')

  entries = ma.Nested(EntrySchema, many=True)
  grats = ma.Nested(GratitudeSchema, many=True)
