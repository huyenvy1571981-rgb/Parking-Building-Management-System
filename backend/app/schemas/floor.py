from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class FloorCreate(BaseModel):
    BuildingID: int
    FloorName: str
    FloorType: str
    TotalSlots: int
    Status: int
    Description: str
    VehicleTypeID: int


class FloorUpdate(BaseModel):
    BuildingID: int
    FloorName: str
    FloorType: str
    TotalSlots: int
    Status: int
    Description: str
    VehicleTypeID: int


class FloorResponse(BaseModel):
    FloorID: int
    BuildingID: int
    FloorName: str
    FloorType: str
    TotalSlots: int
    Status: int
    Description: str
    VehicleTypeID: int
    CreatedAt: Optional[datetime] = None

    class Config:
        from_attributes = True