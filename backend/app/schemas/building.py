from pydantic import BaseModel
from datetime import datetime


class BuildingCreate(BaseModel):
    BuildingName: str
    Address: str
    TotalFloors: int
    Status: int
    Description: str


class BuildingUpdate(BaseModel):
    BuildingName: str
    Address: str
    TotalFloors: int
    Status: int
    Description: str


class BuildingResponse(BaseModel):
    BuildingID: int
    BuildingName: str
    Address: str
    TotalFloors: int
    Status: int
    Description: str
    CreatedAt: datetime

    class Config:
        from_attributes = True