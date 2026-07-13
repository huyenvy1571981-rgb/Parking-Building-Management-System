from sqlalchemy import Column, Integer, String, DateTime, DECIMAL, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class ParkingSession(Base):
    __tablename__ = "ParkingSessions"

    SessionID = Column(Integer, primary_key=True, index=True)

    VehicleID = Column(
        Integer,
        ForeignKey("Vehicles.VehicleID")
    )

    SlotID = Column(
        Integer,
        ForeignKey("ParkingSlots.SlotID")
    )

    EntryTime = Column(DateTime)

    ExitTime = Column(DateTime)

    PaymentStatus = Column(String)

    TotalAmount = Column(DECIMAL(10, 2))

    SessionStatus = Column(String)

    CreatedAt = Column(DateTime)

    # Relationship
    Vehicle = relationship("Vehicle")

    Slot = relationship("ParkingSlot")