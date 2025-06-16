from flask import Blueprint, jsonify, request, current_app
import json

api = Blueprint("api", __name__, url_prefix="/api")

@api.route("/hello", methods=["GET"])
def hello():
    return jsonify({"message": "Hello from Flask API!"})

@api.route("/echo", methods=["POST"])
def echo():
    data = request.get_json()
    return jsonify({"you_sent": data})

@api.route("/students", methods=["GET"])
def get_all():
    """
    Gets basic information (name, gender, feedback, scores) of students to display in the dashboard.
    """
    # pass
    return jsonify(current_app.dl)

@api.route("/general", methods=["GET"])
def get_general():
    """
    Gets LLM-generated overall feedback/comment on pace, difficulty, overall performance and suggestions
    """
    pass

@api.route("/stats", methods=["GET"])
def get_stats():
    """
    Stats for assessments used in (json, a list of score for each assessments) for visualization in dashboard
    e.g. exams: [{finals: {scores: [....]}}]
    """
    pass

@api.route("/student/<student_id>", methods=["GET"])
def get(student_id):
    """
    Personalized information for individual student
    Extracts students information for the context of LLM prompt
    """
    # You can now use the student_id URL parameter in your logic
    pass