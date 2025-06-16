from flask import Blueprint, jsonify, request

api = Blueprint("api", __name__, url_prefix="/api")

@api.route("/hello", methods=["GET"])
def hello():
    return jsonify({"message": "Hello from Flask API!"})

@api.route("/echo", methods=["POST"])
def echo():
    data = request.get_json()
    return jsonify({"you_sent": data})
