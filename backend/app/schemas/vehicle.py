from __future__ import annotations

from pydantic import BaseModel
from datetime import datetime


# ==========================
# Base
# ==========================
class VehicleBase(BaseModel):
    PlateNumber: str
    VehicleTypeID: int
    OwnerName: str
    Phone: str


# ==========================
# Create
# ==========================
class VehicleCreate(VehicleBase):
    pass


# ==========================
# Update
# ==========================
class VehicleUpdate(VehicleBase):
    pass


# ==========================
# Response
# ==========================
class VehicleResponse(VehicleBase):

    VehicleID: int

    CreatedAt: datetime

    VehicleTypeName: str | None = None

    class Config:
        from_attributes = True