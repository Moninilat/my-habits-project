"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, User_habit_list, Habit_records, Habits
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import date
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import bcrypt 

salt = bcrypt.gensalt()


api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup/google', methods=['POST'])
def signup_google():
 
    request_body = request.get_json()
    print(request_body)

    first_name=request_body["name"]
    email=request_body["email"] 
    google_id=request_body["google_id"]

    if not email or not google_id or not first_name: 
        return jsonify({"msg": "All fields are required"}), 400;

    user = User.query.filter_by(email=email, google_id=google_id).first()
    if user:
        token = create_access_token(identity=user.email)
        print(token)
        return jsonify({"msg":"User created", "token": token}), 200
    
    new_user = User(first_name=first_name, email=email, google_id=google_id)
    db.session.add(new_user)
    db.session.commit()

    token = create_access_token(identity=new_user.email)
    print(token)
    return jsonify({"msg":"User created", "token": token}), 200


@api.route('/signup', methods=['POST'])
def signup():
 
   request_body = request.get_json()
   print(request_body)
   user = User.query.filter_by(email=request_body["email"]).first()
   if user:
      return jsonify ({"msg":"User already registered"}), 400
   
   request_body = request.get_json()
   password= request_body.get("password")
   pw_hash = bcrypt.hashpw(password.encode("utf-8"), salt)
   new_user = User(first_name=request_body["first_name"], last_name=request_body["last_name"], email=request_body["email"], city=request_body["city"], gender=request_body["gender"], password=pw_hash.decode("utf-8"))
   db.session.add(new_user)
   db.session.commit()

   token = create_access_token(identity=new_user.email)
   print(token)
   return jsonify({"msg":"User created", "token": token}), 200



@api.route('/login', methods=['POST'])
def login():
   request_body = request.get_json()
   email = request_body.get("email")
   password= request_body.get("password")
   
   if not email or not password:
      return jsonify({"msg": "All fields are required"}), 400
   user = User.query.filter_by(email=email).first()
   
   if not user:
      return jsonify ({"msg":"Email and password are incorrect"}), 401
   
   if bcrypt.checkpw(password.encode("utf-8"), user.password.encode("utf-8")):
       token = create_access_token(identity=user.email)
       return jsonify({"msg":"logged", "token": token}), 200
   
   return jsonify ({"msg":"Email and password are incorrect"}), 401
   

#endpoint para que el usuario modifique sus datos
@api.route('/user/', methods=['PUT'])
@jwt_required()
def update_user():
    token_email = get_jwt_identity()
    user=User.query.filter_by(email = token_email).first()
    if user is None:
         return jsonify({"msg":"user not found"}),404
    request_body = request.get_json()
    
    first_name = request_body.get("first_name")
    last_name = request_body.get("last_name")
    city = request_body.get("city")     
    if first_name:
        user.first_name = first_name
    if last_name:
        user.last_name = last_name
    if city:
        user.city = city

    db.session.commit()
    return jsonify({"msg": "User updated successfully"}), 200

#endpoint para modificar la contraseña del usuario
@api.route('/user', methods=['PATCH'])
@jwt_required()
def update_password():
    token_email = get_jwt_identity()
    user = User.query.filter_by(email=token_email).first()

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    request_body = request.get_json()
    current_password = request_body.get("current_password")  
    new_password = request_body.get("new_password")  

    
    if not current_password or not new_password:
        return jsonify({"msg": "Debes ingresar tu contraseña actual y una nueva"}), 400

    if not bcrypt.checkpw(current_password.encode("utf-8"), user.password.encode("utf-8")):
        return jsonify({"msg": "La contraseña actual es incorrecta"}), 401

    pw_hash = bcrypt.hashpw(new_password.encode("utf-8"), bcrypt.gensalt())
    user.password = pw_hash.decode("utf-8")

    db.session.commit()
    return jsonify({"msg": "Contraseña actualizada correctamente"}), 200

#endpoint para eliminar usuario, elimina en cascada, primero los records, luego su listado y por último el usuario
@api.route('/user/', methods=['DELETE'])
@jwt_required()
def delete_user():
    token_email = get_jwt_identity()
    request_data = request.get_json()
    password = request_data.get("password") 
    user=User.query.filter_by(email = token_email).first()
    if user is None:
         return jsonify({"msg":"User not found"}),404
    
    if not bcrypt.checkpw(password.encode("utf-8"), user.password.encode("utf-8")):
        return jsonify({"msg": "Contraseña incorrecta"}), 401
    habit_records = Habit_records.query.filter_by(user_id=user.id).all()
    for record in habit_records:
        db.session.delete(record)
    user_habits = User_habit_list.query.filter_by(user_id=user.id).all()
    for habit in user_habits:
        db.session.delete(habit)
   
    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg": "User deleted successfully"}), 200

#endpoint para traerte al usuario con el token
@api.route('/user/', methods=['GET'])
@jwt_required()
def get_user():
    token_email = get_jwt_identity()
    user=User.query.filter_by(email = token_email).first()
    if user is None:
         return jsonify({"msg":"User not found"}),404
    return jsonify(user.serialize()), 200

#endpoint para añadir/eliminar hábito de usuario, el usuario lo sacaremos del token
@api.route("/user/habits", methods=["POST", "GET", "DELETE"])
@jwt_required()
def manage_user_habits():
    token_email = get_jwt_identity()
    user=User.query.filter_by(email = token_email).first()
    if user is None:
         return jsonify({"msg":"user not found"}),404
    if request.method == "POST": 
        request_body = request.get_json()
        exist = User_habit_list.query.filter_by(user_id=user.id, habits_id=request_body["habit_id"]).first()
        if exist:
            return jsonify({"msg": "Habit already added"}), 400
        
       
        new_habit = User_habit_list(user_id=user.id, habits_id=request_body["habit_id"])
        db.session.add(new_habit)
        db.session.commit()
        return jsonify(new_habit.serialize()), 200
    
    if request.method == "GET": 
        
            
        user_habit_list = User_habit_list.query.filter_by(user_id=user.id).all()
        return jsonify([habit.serialize() for habit in user_habit_list]), 200
    
    if request.method == "DELETE":
        request_body = request.get_json()
        habit = User_habit_list.query.filter_by(user_id=user.id, habits_id=request_body["habit_id"]).first()
        if habit:
            db.session.delete(habit)
            db.session.commit()
            return jsonify({"msg": "Habit deleted"}), 200
        else:
            return jsonify({"msg": "Habit not found"}), 404


#endpoint para devolver el ranking de los usuarios -> Devuélveme todos los usuarios ordenados por score
@api.route('/ranking', methods=['GET'])
def get_user_ranking():
    users = User.query.order_by(User.score.desc()).all()
    ranking = [user.serialize() for user in users]
    return jsonify({"ranking": ranking}), 200
    

#endpoint que devuelva el listado de hábitos para pintar en la home
@api.route('/habits', methods=['GET'])
def get_all_habits():
    habits = Habits.query.all()
    habits_list = [habit.serialize() for habit in habits]
    return jsonify({"habits": habits_list}), 200
    

#endpoint para el hábito completado por el usuario, al usuario lo buscamos con el token
@api.route('/complete_habit', methods=['POST'])
@jwt_required()
def complete_habit():
    token_email = get_jwt_identity()
    user=User.query.filter_by(email = token_email).first()
    if user is None:
         return jsonify({"msg":"user not found"}),404
    request_body = request.get_json()
    
    habit_id = request_body.get('habit_id')
      
    if not habit_id:
        return jsonify({"msg": "Se requiere el habit_id"}), 400
         
    habit = Habits.query.get(habit_id)

    if not habit:
        return jsonify({"msg": "Hábito no encontrado"}), 404
    
    # Verificamos si el hábito está en el listado de hábitos del usuario
    user_habit = User_habit_list.query.filter_by(user_id=user.id, habits_id=habit_id).first()
    if not user_habit:
        return jsonify({"error": "El hábito no pertenece al usuario"}), 400
    existin_record = Habit_records.query.filter_by(user_id=user.id, habits_id=habit.id, date=date.today()).first()
    if existin_record:
        return jsonify({"msg":"Este hábito ya se registró el día de hoy"}), 400
    habit_record = Habit_records(
        user_id=user.id,
        habits_id=habit.id,
        date=date.today()
        
    )
    serialize_user=user.serialize()
    serialize_habit=habit.serialize()
    user.score=serialize_user["score"]+serialize_habit["score"]
    db.session.add(habit_record)
    db.session.commit()
    
    return jsonify({"message": "Hábito completado con éxito", "habit_record": habit_record.serialize() }), 201

@api.route("/new/habit", methods=["POST"])
def new_habit():
    request_body = request.get_json()
    if not isinstance(request_body, list):
        return jsonify({"error": "Se esperaba una lista de hábitos"}), 400
    for habit_data in request_body:
        # Validar campos mínimos (name, description, score)
        if not all(key in habit_data for key in ["name", "description", "score", "image"]):
            return jsonify({"error": "Formato de hábito inválido"}), 400
        # Extraemos la info
        name = habit_data["name"]
        description = habit_data["description"]
        score = habit_data["score"]
        image = habit_data["image"]
        # Comprobamos si ya existe un hábito con el mismo nombre
        existing_habit = Habits.query.filter_by(name=name).first()
        if existing_habit:
            return jsonify({"error": f"El hábito '{name}' ya existe"}), 400
        # Si no existe, creamos y agregamos a la sesión
        new_habit = Habits(
            name=name,
            description=description,
            score=score,
            image=image
        )
        db.session.add(new_habit)
    # Realizamos el commit una sola vez al final
    db.session.commit()
    return jsonify({"message": "Hábitos agregados exitosamente"}), 200

@api.route('/habit_records', methods=['GET'])
@jwt_required()
def get_records():
    token_email = get_jwt_identity()
    user=User.query.filter_by(email = token_email).first()
    if user is None:
         return jsonify({"msg":"user not found"}),404
    
    habit_records = Habit_records.query.filter_by(user_id=user.id).all()
    if not habit_records:
        return jsonify({"msg": "No hay registros de hábitos"}), 400
    return jsonify([record.serialize() for record in habit_records]), 200

    