from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base


class Building(Base):
    __tablename__ = "Buildings"

    BuildingID = Column(Integer, primary_key=True, index=True)
    BuildingName = Column(String)
    Address = Column(String)
    TotalFloors = Column(Integer)
    Status = Column(Integer)
    Description = Column(String)
    CreatedAt = Column(DateTime)