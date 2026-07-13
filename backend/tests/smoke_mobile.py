"""Small dependency-free smoke test for the mobile authentication flow."""

import os
import sys
from pathlib import Path

DB_FILE = Path(__file__).with_name("smoke_mobile.db")
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
os.environ["DATABASE_URL"] = f"sqlite:///{DB_FILE.as_posix()}"
os.environ["MOBILE_DEMO_OTP"] = "123456"

from fastapi.testclient import TestClient  # noqa: E402
from app.database import Base, engine  # noqa: E402
from app.main import app  # noqa: E402


def main():
    Base.metadata.create_all(engine)
    client = TestClient(app)

    register = client.post("/mobile/auth/register", json={
        "full_name": "Mobile Demo", "phone": "0900000008", "password": "123456"
    })
    assert register.status_code == 201, register.text

    verify = client.post("/mobile/auth/verify-otp", json={
        "phone": "0900000008", "code": "123456"
    })
    assert verify.status_code == 200, verify.text
    token = verify.json()["access_token"]

    profile = client.get("/mobile/profile", headers={"Authorization": f"Bearer {token}"})
    assert profile.status_code == 200, profile.text
    assert profile.json()["phone"] == "0900000008"
    print("Mobile auth smoke test: OK")


if __name__ == "__main__":
    try:
        main()
    finally:
        engine.dispose()
        DB_FILE.unlink(missing_ok=True)
