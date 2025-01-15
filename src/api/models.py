from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'User'


    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(120), unique=True, nullable=False)
    last_name = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    creation = db.Column(db.Date, unique=False, nullable=False)


    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "creation": self.creation.strftime('%Y-%m-%DT')
            # do not serialize the password, its a security breach
        }
    

class Habits(db.Model):
    __tablename__ = 'Habits'


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    type = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(120), unique=True, nullable=False)
    duration = db.Column(db.DateTime, unique=False, nullable=False)
    score = db.Column(db.Integer, unique=False)


    def __repr__(self):
        return '<Habits %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "description": self.description,
            "duration": self.duration,
            "score": self.score
            # do not serialize the password, its a security breach
        }

class User_habits_list(db.Model):
    __tablename__ = 'User_habits_list'


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeingKey=User.id)   
    habits_id = db.Column(db.Integer, ForeingKey=Habits.id)
    duration = db.Column(db.DateTime, unique=False, nullable=False)
    completed = db.Column(db.Boolean, unique=False)


    def __repr__(self):
        return '<User_habits_list %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "habits_id": self.habits_id,
            "duration": self.duration,
            "completed": self.completed
            # do not serialize the password, its a security breach
        }