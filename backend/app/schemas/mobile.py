from datetime import datetime
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class MobileRegisterRequest(BaseModel):
    full_name: str = Field(min_length=2, max_length=100)
    phone: str = Field(min_length=9, max_length=20)
    password: str = Field(min_length=6, max_length=72)
    plate_number: Optional[str] = None
    vehicle_type_id: Optional[int] = None


class OTPVerifyRequest(BaseModel):
    phone: str
    code: str = Field(min_length=4, max_length=6)


class MobileLoginRequest(BaseModel):
    phone: str
    password: str


class DriverVehicleCreate(BaseModel):
    plate_number: str = Field(min_length=4, max_length=20)
    vehicle_type_id: int
    color: Optional[str] = None
    is_default: bool = False


class BookingCreate(BaseModel):
    vehicle_id: int
    building_id: int
    floor_id: int
    slot_id: int
    arrival_time: datetime
    payment_method: str = "Demo"


class PaymentRequest(BaseModel):
    payment_method: str = "Demo"


class IncidentCreate(BaseModel):
    incident_type: str = Field(min_length=2, max_length=80)
    description: str = Field(min_length=10, max_length=2000)
    image_url: Optional[str] = None


class MonthlyPassCreate(BaseModel):
    vehicle_id: int
    building_id: int
    months: int = Field(default=1, ge=1, le=12)
    payment_method: str = "Demo"


class MobileProfileUpdate(BaseModel):
    full_name: str = Field(min_length=2, max_length=100)
    email: Optional[str] = None


class ORMModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)
