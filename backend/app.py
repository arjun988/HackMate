from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import google.generativeai as ggi
import os
import requests
from dotenv import load_dotenv
import json
import regex as re
import jwt
from datetime import datetime, timedelta

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

# Helper function to generate JWT token
def generate_jwt_token(user_id):
    expiration_time = datetime.utcnow() + timedelta(hours=1)  # Token expires in 1 hour
    token = jwt.encode({'user_id': user_id, 'exp': expiration_time}, app.config['SECRET_KEY'], algorithm='HS256')
    return token

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
        # Generate JWT token
        token = generate_jwt_token(user.id)
        return jsonify({"message": "User created successfully", "token": token}), 201
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
        # Generate JWT token
        token = generate_jwt_token(user.id)
        return jsonify({"message": "Login successful", "token": token}), 200
    return jsonify({"message": "Invalid credentials"}), 401

# Route to generate a problem statement
@app.route('/generate_problem', methods=['POST'])
def generate_problem():
    data = request.json
    language = data['language']
    difficulty = data['difficulty']

    prompt = f'''Generate a {difficulty} coding problem in {language}. Return the problem statement, input, output, and output explanation in JSON format:
    {{
        "problem_statement": "",
        "input": "",
        "output": "",
        "output_explanation": ""
    }}
    '''
    response = gpt.send_message(prompt)

    if response:
        # Extract JSON from the response
        json_string = extract_json_from_response(response.text)
        
        if json_string:
            try:
                problem_data = json.loads(json_string)
                return jsonify(problem_data), 200
            except json.JSONDecodeError:
                return jsonify({"message": "Failed to parse JSON from response"}), 400
        
        # If no JSON found, return an error
        return jsonify({"message": "No JSON found in the response"}), 400
    
    return jsonify({"message": "Failed to generate problem"}), 500

def extract_json_from_response(text):
    # Regular expression to find JSON-like structures
    pattern = r'\{[^{}]*\}'
    matches = re.findall(pattern, text)
    
    if matches:
        # Try to validate and return the first valid JSON
        for match in matches:
            try:
                json.loads(match)
                return match
            except json.JSONDecodeError:
                continue
    return None

# Route to execute code
@app.route('/execute_code', methods=['POST'])
def execute_code():
    data = request.json
    language = data.get('language', 'javascript')  # Default language to 'python'
    version = data.get('version', '1.32.3')   # Default version to '3.10.0'
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

@app.route('/execute_javascriptcode', methods=['POST'])
def execute_code():
    data = request.json
    language = data.get('language', 'javascript')  # Default language to 'python'
    version = data.get('version', '1.32.3')   # Default version to '3.10.0'
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
    code = data.get('code')
    problem_data = data.get('problem_data')

    # Check if both code and problem_data exist
    if not code or not problem_data:
        return problem_data, 400

    # Parse the problem_data JSON string
    try:
        parsed_problem_data = json.loads(problem_data)
    except json.JSONDecodeError:
        return problem_data, 400

    # Extract individual components
    problem_statement = parsed_problem_data.get('problem_statement')
    input_data = parsed_problem_data.get('input')
    output_data = parsed_problem_data.get('output')
    output_explanation = parsed_problem_data.get('output_explanation')

    # Check if all required components are present
    if not all([problem_statement, input_data, output_data, output_explanation]):
        return problem_data, 400

    # Build the prompt using structured problem data
    prompt = f"""
    Given the following problem statement:
    Problem Statement: {problem_statement}
    Input: {input_data}
    Output: {output_data}
    Output Explanation: {output_explanation}
    
    Suggest improvements for the code below, including optimizations and solutions with better time and space complexity:
    {code}
    """

    # Send the request to Gemini for suggestions
    response = gpt.send_message(prompt)

    if response:
        return response.text, 200
    
    return "Failed to generate suggestions", 500

if __name__ == '__main__':
    app.run(debug=True)
