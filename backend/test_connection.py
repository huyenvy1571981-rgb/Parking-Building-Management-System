from app.database import engine
from sqlalchemy import text

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT DB_NAME()"))
        print("Connected to:", result.scalar())
except Exception as e:
    print("Connection failed!")
    print(e)