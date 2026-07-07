from pydantic import BaseModel
from datetime import datetime


# ==========================
# Base
# ==========================
class ParkingSlotBase(BaseModel):
    FloorID: int
    VehicleTypeID: int
    SlotCode: str
    SlotStatus: str
    IsActive: bool


# ==========================
# Create
# ==========================
class ParkingSlotCreate(ParkingSlotBase):
    pass


# ==========================
# Update
# ==========================
class ParkingSlotUpdate(ParkingSlotBase):
    pass


# ==========================
# Response
# ==========================
class ParkingSlotResponse(ParkingSlotBase):

    SlotID: int

    CreatedAt: datetime

    # mới thêm
    FloorName: str | None = None
    VehicleTypeName: str | None = None

    class Config:
        from_attributes = True