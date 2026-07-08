from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.database import get_db

from app.models.payment import Payment
from app.models.parking_session import ParkingSession
from app.models.user import User

from app.schemas.payment import (
    PaymentCreate,
    PaymentUpdate,
    PaymentResponse,
)

from app.permissions import (
    staff_required,
    admin_required
)

router = APIRouter()


# ======================================
# GET ALL
# ======================================
@router.get(
    "/payments",
    response_model=list[PaymentResponse]
)
def get_payments(
    db: Session = Depends(get_db),
    current_user: User = Depends(staff_required)
):

    payments = db.query(Payment).all()

    result = []

    for item in payments:

        result.append({

            "PaymentID": item.PaymentID,

            "SessionID": item.SessionID,

            "PlateNumber": item.Session.Vehicle.PlateNumber,

            "Amount": item.Amount,

            "PaymentMethod": item.PaymentMethod,

            "PaymentTime": item.PaymentTime,

            "TransactionCode": item.TransactionCode,

            "PaymentStatus": item.PaymentStatus

        })

    return result


# ======================================
# GET BY ID
# ======================================
@router.get(
    "/payments/{payment_id}",
    response_model=PaymentResponse
)
def get_payment(
    payment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(staff_required)
):

    item = db.query(Payment).filter(
        Payment.PaymentID == payment_id
    ).first()

    if item is None:

        raise HTTPException(
            status_code=404,
            detail="Payment not found"
        )

    return {

        "PaymentID": item.PaymentID,

        "SessionID": item.SessionID,

        "PlateNumber": item.Session.Vehicle.PlateNumber,

        "Amount": item.Amount,

        "PaymentMethod": item.PaymentMethod,

        "PaymentTime": item.PaymentTime,

        "TransactionCode": item.TransactionCode,

        "PaymentStatus": item.PaymentStatus

    }


# ======================================
# CREATE
# ======================================
@router.post(
    "/payments",
    response_model=PaymentResponse
)
def create_payment(
    payment: PaymentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(staff_required)
):

    new_payment = Payment(

        SessionID=payment.SessionID,

        Amount=payment.Amount,

        PaymentMethod=payment.PaymentMethod,

        PaymentTime=payment.PaymentTime,

        TransactionCode=payment.TransactionCode,

        PaymentStatus=payment.PaymentStatus

    )

    db.add(new_payment)

    db.commit()

    db.refresh(new_payment)

    return {

        "PaymentID": new_payment.PaymentID,

        "SessionID": new_payment.SessionID,

        "PlateNumber": new_payment.Session.Vehicle.PlateNumber,

        "Amount": new_payment.Amount,

        "PaymentMethod": new_payment.PaymentMethod,

        "PaymentTime": new_payment.PaymentTime,

        "TransactionCode": new_payment.TransactionCode,

        "PaymentStatus": new_payment.PaymentStatus

    }


# ======================================
# UPDATE
# ======================================
@router.put(
    "/payments/{payment_id}",
    response_model=PaymentResponse
)
def update_payment(
    payment_id: int,
    payment: PaymentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(staff_required)
):

    db_payment = db.query(Payment).filter(
        Payment.PaymentID == payment_id
    ).first()

    if db_payment is None:

        raise HTTPException(
            status_code=404,
            detail="Payment not found"
        )

    db_payment.SessionID = payment.SessionID
    db_payment.Amount = payment.Amount
    db_payment.PaymentMethod = payment.PaymentMethod
    db_payment.PaymentTime = payment.PaymentTime
    db_payment.TransactionCode = payment.TransactionCode
    db_payment.PaymentStatus = payment.PaymentStatus

    db.commit()

    db.refresh(db_payment)

    return {

        "PaymentID": db_payment.PaymentID,

        "SessionID": db_payment.SessionID,

        "PlateNumber": db_payment.Session.Vehicle.PlateNumber,

        "Amount": db_payment.Amount,

        "PaymentMethod": db_payment.PaymentMethod,

        "PaymentTime": db_payment.PaymentTime,

        "TransactionCode": db_payment.TransactionCode,

        "PaymentStatus": db_payment.PaymentStatus

    }


# ======================================
# DELETE
# ======================================
@router.delete("/payments/{payment_id}")
def delete_payment(
    payment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):

    payment = db.query(Payment).filter(
        Payment.PaymentID == payment_id
    ).first()

    if payment is None:

        raise HTTPException(
            status_code=404,
            detail="Payment not found"
        )

    try:

        db.delete(payment)

        db.commit()

    except IntegrityError:

        db.rollback()

        raise HTTPException(
            status_code=400,
            detail="Payment cannot be deleted."
        )

    return {

        "message": "Payment deleted successfully"

    }