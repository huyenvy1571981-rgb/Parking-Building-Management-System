import os
from urllib.parse import quote_plus

from dotenv import load_dotenv
import pyodbc
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

available_drivers = pyodbc.drivers()
sql_driver = next((name for name in (
    "ODBC Driver 18 for SQL Server", "ODBC Driver 17 for SQL Server", "SQL Server"
) if name in available_drivers), "ODBC Driver 18 for SQL Server")
odbc = quote_plus(
    f"DRIVER={{{sql_driver}}};SERVER=localhost\\SQLEXPRESS01;"
    "DATABASE=ParkingBuildingDB;Trusted_Connection=yes;TrustServerCertificate=yes"
)
DEFAULT_DATABASE_URL = f"mssql+pyodbc:///?odbc_connect={odbc}"
DATABASE_URL = os.getenv("DATABASE_URL", DEFAULT_DATABASE_URL)

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
