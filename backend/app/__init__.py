from flask import Flask
from flask_cors import CORS
from routes import api
import DataLoader

def create_app():
    app = Flask(__name__)
    CORS(app)  # enable CORS for all routes
    app.dl = DataLoader("SampleData.json")
    app.register_blueprint(api)

    return app
