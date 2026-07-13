from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base


class Role(Base):
    __tablename__ = "Roles"

    RoleID = Column(Integer, primary_key=True, index=True)
    RoleName = Column(String)
    Description = Column(String)
    CreatedAt = Column(DateTime)