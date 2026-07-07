from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from app.database import Base


class Floor(Base):
    __tablename__ = "Floors"

    FloorID = Column(Integer, primary_key=True, index=True)
    BuildingID = Column(Integer, ForeignKey("Buildings.BuildingID"))
    FloorName = Column(String)
    FloorType = Column(String)
    TotalSlots = Column(Integer)
    Status = Column(Integer)
    Description = Column(String)
    CreatedAt = Column(DateTime)
    VehicleTypeID = Column(Integer)