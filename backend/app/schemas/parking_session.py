from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal


class ParkingSessionBase(BaseModel):

    VehicleID: int

    SlotID: int

    EntryTime: datetime

    ExitTime: datetime | None = None

    PaymentStatus: str

    TotalAmount: Decimal

    SessionStatus: str


class ParkingSessionCreate(ParkingSessionBase):
    pass


class ParkingSessionUpdate(ParkingSessionBase):
    pass


class ParkingSessionResponse(ParkingSessionBase):

    SessionID: int

    PlateNumber: str | None = None

    SlotCode: str | None = None

    CreatedAt: datetime

    class Config:
        from_attributes = True