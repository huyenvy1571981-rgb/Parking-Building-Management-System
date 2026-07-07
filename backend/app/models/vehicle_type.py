from sqlalchemy import Column, Integer, String, DateTime, Numeric
from app.database import Base


class VehicleType(Base):
    __tablename__ = "VehicleTypes"

    VehicleTypeID = Column(Integer, primary_key=True, index=True)
    VehicleTypeName = Column(String)
    Width = Column(Numeric(10, 2))
    Height = Column(Numeric(10, 2))
    HourlyPrice = Column(Numeric(10, 2))
    DailyPrice = Column(Numeric(10, 2))
    Description = Column(String)
    CreatedAt = Column(DateTime)