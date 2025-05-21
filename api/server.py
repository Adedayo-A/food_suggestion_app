import os

from . import create_app

app = create_app(os.getenv("FLASK_ENV", "development"))

if __name__ == "__main__":  
    app.run(port=os.getenv("PORT", 5000), debug=os.getenv("DEBUG", True))
