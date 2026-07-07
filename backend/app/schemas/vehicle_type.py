from datetime import datetime
from decimal import Decimal
from pydantic import BaseModel, ConfigDict


class VehicleTypeBase(BaseModel):
    VehicleTypeName: str
    Width: Decimal
    Height: Decimal
    HourlyPrice: Decimal
    DailyPrice: Decimal
    Description: str


class VehicleTypeCreate(VehicleTypeBase):
    pass


class VehicleTypeUpdate(VehicleTypeBase):
    pass


class VehicleTypeResponse(VehicleTypeBase):
    VehicleTypeID: int
    CreatedAt: datetime

    model_config = ConfigDict(from_attributes=True)