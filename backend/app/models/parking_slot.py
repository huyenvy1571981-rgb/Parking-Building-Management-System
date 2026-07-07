from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class ParkingSlot(Base):
    __tablename__ = "ParkingSlots"

    SlotID = Column(Integer, primary_key=True, index=True)

    FloorID = Column(
        Integer,
        ForeignKey("Floors.FloorID")
    )

    VehicleTypeID = Column(
        Integer,
        ForeignKey("VehicleTypes.VehicleTypeID")
    )

    SlotCode = Column(String)
    SlotStatus = Column(String)
    IsActive = Column(Boolean)
    CreatedAt = Column(DateTime)

    # ==========================
    # Relationship
    # ==========================
    Floor = relationship("Floor")

    VehicleType = relationship("VehicleType")