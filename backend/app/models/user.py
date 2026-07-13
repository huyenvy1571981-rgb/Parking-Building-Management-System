from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base


class User(Base):
    __tablename__ = "Users"

    UserID = Column(Integer, primary_key=True, index=True)

    FullName = Column(String(100))
    Username = Column(String(50), unique=True, nullable=False)
    Email = Column(String(100), nullable=False)
    PasswordHash = Column(String(255), nullable=False)
    Phone = Column(String(20))

    RoleID = Column(Integer)

    Status = Column(Integer, default=1)

    CreatedAt = Column(DateTime)