from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Vehicle(Base):
    __tablename__ = "Vehicles"

    VehicleID = Column(Integer, primary_key=True, index=True)

    PlateNumber = Column(String)

    VehicleTypeID = Column(
        Integer,
        ForeignKey("VehicleTypes.VehicleTypeID")
    )

    OwnerName = Column(String)

    Phone = Column(String)

    CreatedAt = Column(DateTime)

    VehicleType = relationship("VehicleType")