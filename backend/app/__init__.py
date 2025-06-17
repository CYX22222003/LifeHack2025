from flask import Flask
from flask_cors import CORS
from .routes import api
from .DataLoader import DataLoader
import os

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}})
    #CORS(app)  # enable CORS for all routes
    app_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(app_dir, "SampleData.json")
    app.dl = DataLoader(data_path)
    app.register_blueprint(api)

    return app
