from sqlalchemy import Column, Integer, String, DateTime, DECIMAL, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Payment(Base):
    __tablename__ = "Payments"

    PaymentID = Column(Integer, primary_key=True, index=True)

    SessionID = Column(
        Integer,
        ForeignKey("ParkingSessions.SessionID")
    )

    Amount = Column(DECIMAL(10, 2))

    PaymentMethod = Column(String)

    PaymentTime = Column(DateTime)

    TransactionCode = Column(String)

    PaymentStatus = Column(String)

    Session = relationship("ParkingSession")