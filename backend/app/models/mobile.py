from sqlalchemy import Boolean, Column, DateTime, DECIMAL, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database import Base


class DriverVehicle(Base):
    __tablename__ = "DriverVehicles"

    DriverVehicleID = Column(Integer, primary_key=True, index=True)
    UserID = Column(Integer, ForeignKey("Users.UserID"), nullable=False, index=True)
    VehicleID = Column(Integer, ForeignKey("Vehicles.VehicleID"), nullable=False, index=True)
    Color = Column(String(50))
    IsDefault = Column(Boolean, default=False, nullable=False)
    CreatedAt = Column(DateTime, nullable=False)

    Vehicle = relationship("Vehicle")


class Booking(Base):
    __tablename__ = "Bookings"

    BookingID = Column(Integer, primary_key=True, index=True)
    BookingCode = Column(String(40), unique=True, nullable=False, index=True)
    UserID = Column(Integer, ForeignKey("Users.UserID"), nullable=False, index=True)
    VehicleID = Column(Integer, ForeignKey("Vehicles.VehicleID"), nullable=False)
    BuildingID = Column(Integer, ForeignKey("Buildings.BuildingID"), nullable=False)
    FloorID = Column(Integer, ForeignKey("Floors.FloorID"), nullable=False)
    SlotID = Column(Integer, ForeignKey("ParkingSlots.SlotID"), nullable=False)
    ArrivalTime = Column(DateTime, nullable=False)
    ExpiresAt = Column(DateTime, nullable=False)
    BookingFee = Column(DECIMAL(10, 2), default=0, nullable=False)
    PaymentMethod = Column(String(30))
    PaymentStatus = Column(String(30), default="Pending", nullable=False)
    BookingStatus = Column(String(30), default="Confirmed", nullable=False)
    QRToken = Column(String(255), nullable=False)
    CreatedAt = Column(DateTime, nullable=False)

    Vehicle = relationship("Vehicle")
    Building = relationship("Building")
    Floor = relationship("Floor")
    Slot = relationship("ParkingSlot")
    User = relationship("User")


class MonthlyPass(Base):
    __tablename__ = "MonthlyPasses"

    MonthlyPassID = Column(Integer, primary_key=True, index=True)
    PassCode = Column(String(40), unique=True, nullable=False)
    UserID = Column(Integer, ForeignKey("Users.UserID"), nullable=False, index=True)
    VehicleID = Column(Integer, ForeignKey("Vehicles.VehicleID"), nullable=False)
    BuildingID = Column(Integer, ForeignKey("Buildings.BuildingID"), nullable=False)
    StartDate = Column(DateTime, nullable=False)
    EndDate = Column(DateTime, nullable=False)
    Amount = Column(DECIMAL(10, 2), nullable=False)
    Status = Column(String(30), default="Active", nullable=False)
    CreatedAt = Column(DateTime, nullable=False)

    Vehicle = relationship("Vehicle")
    Building = relationship("Building")


class IncidentReport(Base):
    __tablename__ = "IncidentReports"

    IncidentID = Column(Integer, primary_key=True, index=True)
    UserID = Column(Integer, ForeignKey("Users.UserID"), nullable=False, index=True)
    IncidentType = Column(String(80), nullable=False)
    Description = Column(Text, nullable=False)
    ImageUrl = Column(String(500))
    Status = Column(String(30), default="Submitted", nullable=False)
    ManagerResponse = Column(Text)
    CreatedAt = Column(DateTime, nullable=False)
    UpdatedAt = Column(DateTime, nullable=False)


class Notification(Base):
    __tablename__ = "Notifications"

    NotificationID = Column(Integer, primary_key=True, index=True)
    UserID = Column(Integer, ForeignKey("Users.UserID"), nullable=False, index=True)
    Title = Column(String(150), nullable=False)
    Message = Column(Text, nullable=False)
    NotificationType = Column(String(50), default="General", nullable=False)
    IsRead = Column(Boolean, default=False, nullable=False)
    CreatedAt = Column(DateTime, nullable=False)


class OTPVerification(Base):
    __tablename__ = "OTPVerifications"

    OTPID = Column(Integer, primary_key=True, index=True)
    Phone = Column(String(20), nullable=False, index=True)
    Code = Column(String(6), nullable=False)
    Purpose = Column(String(30), default="register", nullable=False)
    ExpiresAt = Column(DateTime, nullable=False)
    IsUsed = Column(Boolean, default=False, nullable=False)
    CreatedAt = Column(DateTime, nullable=False)
