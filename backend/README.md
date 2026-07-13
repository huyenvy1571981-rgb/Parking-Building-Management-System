# Backend Source Code

FastAPI backend for Parking Building Management System.

## Setup

```powershell
python -m pip install -r requirements.txt
Copy-Item .env.example .env
python init_db.py
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Update `DATABASE_URL` in `.env` to match the local SQL Server instance. `init_db.py`
creates only missing tables and preserves existing data. API documentation is available at
`http://127.0.0.1:8000/docs`.
