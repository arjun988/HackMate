from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import google.generativeai as ggi
import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Use environment variables from .env
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI', 'sqlite:///users.db')  # Default if not set in .env
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app)

# Configure Gemini API with the key from .env
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')  # Get Gemini API key from .env
ggi.configure(api_key=GEMINI_API_KEY)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

# Initialize database within an application context
with app.app_context():
    db.create_all()

# Helper function to initialize Gemini chat model
def initialize_model():
    model = ggi.GenerativeModel("gemini-pro")
    chat = model.start_chat()
    return chat

gpt = initialize_model()

# Route for user signup
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data['username']
    password = data['password']

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(username=username, password=hashed_password)

    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 201
    except:
        return jsonify({"message": "Username already exists"}), 400

# Route for user login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        session['user_id'] = user.id
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"message": "Invalid credentials"}), 401

# Route to generate a problem statement
@app.route('/generate_problem', methods=['POST'])
def generate_problem():
    data = request.json
    language = data['language']
    difficulty = data['difficulty']

    prompt = f"Generate a {difficulty} coding problem in {language}. Only provide the problem statement , input and expected output"
    response = gpt.send_message(prompt)

    if response:
        problem_statement = response.text
        return jsonify({"problem_statement": problem_statement}), 200
    return jsonify({"message": "Failed to generate problem"}), 500

# Route to execute code
@app.route('/execute_code', methods=['POST'])
def execute_code():
    data = request.json
    language = data.get('language', 'python')  # Default language to 'python'
    version = data.get('version', '3.10.0')   # Default version to '3.10.0'
    code = data.get('code')

    # Use Piston API for execution
    execution_api_url = "https://emkc.org/api/v2/piston/execute"
    payload = {
        "language": language,
        "version": version,  # Use the specified version or default to '3.10.0'
        "files": [             # Provide the source code as an array of file objects
            {
                "name": "main",
                "content": code
            }
        ]
    }

    try:
        response = requests.post(execution_api_url, json=payload)
        response_data = response.json()
        
        if response.status_code == 200:
            # Extracting the correct output from response
            output = response_data.get('run', {}).get('stdout', 'No output from the code')
            return jsonify({"output": output}), 200
        else:
            print(f"Error from Piston API: {response_data}")
            return jsonify({"message": "Code execution failed", "details": response_data}), 500
    except Exception as e:
        print(f"Exception occurred: {e}")
        return jsonify({"message": "Internal server error", "error": str(e)}), 500

# Route to suggest code improvements
@app.route('/suggest_improvement', methods=['POST'])
def suggest_improvement():
    data = request.json
    code = data['code']
    problem_statement = data.get('problem_statement', '')

    if not problem_statement:
        return jsonify({"message": "Problem statement is required"}), 400

    prompt = f"Given the following problem statement: '{problem_statement}', suggest improvements for the code below, including optimizations and solutions with better time and space complexity:\n{code}"
    response = gpt.send_message(prompt)

    if response:
        suggestions = response.text
        return jsonify({"suggestions": suggestions}), 200
    return jsonify({"message": "Failed to generate suggestions"}), 500


if __name__ == '__main__':
    app.run(debug=True)
