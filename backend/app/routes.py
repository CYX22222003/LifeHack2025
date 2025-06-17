from flask import Blueprint, jsonify, request, current_app
import json
from . import llm

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
    return jsonify(current_app.dl.students)

@api.route("/general", methods=["GET"])
def get_general():
    """
    Gets LLM-generated overall feedback/comment on pace, difficulty, overall performance and suggestions
    """
    return jsonify(llm.get_all_dist_feedback(current_app.dl.get_distribution_text_all()))


@api.route("/stats", methods=["GET"])
def get_stats():
    """
    Stats for assessments used in (json, a list of score for each assessments) for visualization in dashboard
    e.g. exams: [{finals: {scores: [....]}}]
    """
    return jsonify(current_app.dl.get_all_exams())

@api.route("/student/<student_name>", methods=["GET"])
def get(student_name):
    """
    Personalized information for individual student
    Extracts students information for the context of LLM prompt
    """
    return jsonify(llm.get_student_feedback(current_app.dl.get_student_text(student_name)))
    