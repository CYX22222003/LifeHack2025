from flask import Flask
from flask_cors import CORS
from .routes import api
def create_app():
    app = Flask(__name__)
    CORS(app)  # enable CORS for all routes

    
    app.register_blueprint(api)

    return app
