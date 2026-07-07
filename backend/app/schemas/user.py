from pydantic import BaseModel
from datetime import datetime


class UserCreate(BaseModel):
    FullName: str
    Username: str
    Email: str
    PasswordHash: str
    Phone: str
    RoleID: int
    Status: int


class UserUpdate(BaseModel):
    FullName: str
    Username: str
    Email: str
    PasswordHash: str
    Phone: str
    RoleID: int
    Status: int


class UserResponse(BaseModel):
    UserID: int
    FullName: str
    Username: str
    Email: str
    PasswordHash: str
    Phone: str
    RoleID: int
    Status: int
    CreatedAt: datetime

    class Config:
        from_attributes = True