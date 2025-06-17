from app import create_app
from app.DataLoader import DataLoader

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
