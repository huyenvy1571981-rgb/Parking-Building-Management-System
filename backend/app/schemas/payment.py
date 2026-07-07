from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal


class PaymentBase(BaseModel):

    SessionID: int

    Amount: Decimal

    PaymentMethod: str

    PaymentTime: datetime

    TransactionCode: str

    PaymentStatus: str


class PaymentCreate(PaymentBase):
    pass


class PaymentUpdate(PaymentBase):
    pass


class PaymentResponse(PaymentBase):

    PaymentID: int

    PlateNumber: str | None = None

    class Config:
        from_attributes = True