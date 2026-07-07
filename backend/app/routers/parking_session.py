from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from datetime import datetime

from app.database import get_db

from app.models.parking_session import ParkingSession
from app.models.vehicle import Vehicle
from app.models.parking_slot import ParkingSlot
from app.models.user import User

from app.schemas.parking_session import (
    ParkingSessionCreate,
    ParkingSessionUpdate,
    ParkingSessionResponse,
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
    "/parking-sessions",
    response_model=list[ParkingSessionResponse]
)
def get_parking_sessions(
    db: Session = Depends(get_db),
    current_user: User = Depends(staff_required)
):

    sessions = db.query(ParkingSession).all()

    result = []

    for item in sessions:

        result.append({

            "SessionID": item.SessionID,

            "VehicleID": item.VehicleID,

            "PlateNumber": item.Vehicle.PlateNumber,

            "SlotID": item.SlotID,

            "SlotCode": item.Slot.SlotCode,

            "EntryTime": item.EntryTime,

            "ExitTime": item.ExitTime,

            "PaymentStatus": item.PaymentStatus,

            "TotalAmount": item.TotalAmount,

            "SessionStatus": item.SessionStatus,

            "CreatedAt": item.CreatedAt

        })

    return result


# ======================================
# GET BY ID
# ======================================
@router.get(
    "/parking-sessions/{session_id}",
    response_model=ParkingSessionResponse
)
def get_parking_session(
    session_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(staff_required)
):

    item = db.query(ParkingSession).filter(
        ParkingSession.SessionID == session_id
    ).first()

    if item is None:
        raise HTTPException(
            status_code=404,
            detail="Parking Session not found"
        )

    return {

        "SessionID": item.SessionID,

        "VehicleID": item.VehicleID,

        "PlateNumber": item.Vehicle.PlateNumber,

        "SlotID": item.SlotID,

        "SlotCode": item.Slot.SlotCode,

        "EntryTime": item.EntryTime,

        "ExitTime": item.ExitTime,

        "PaymentStatus": item.PaymentStatus,

        "TotalAmount": item.TotalAmount,

        "SessionStatus": item.SessionStatus,

        "CreatedAt": item.CreatedAt

    }


# ======================================
# CREATE
# ======================================
@router.post(
    "/parking-sessions",
    response_model=ParkingSessionResponse
)
def create_parking_session(
    session: ParkingSessionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(staff_required)
):

    new_session = ParkingSession(

        VehicleID=session.VehicleID,

        SlotID=session.SlotID,

        EntryTime=session.EntryTime,

        ExitTime=session.ExitTime,

        PaymentStatus=session.PaymentStatus,

        TotalAmount=session.TotalAmount,

        SessionStatus=session.SessionStatus,

        CreatedAt=datetime.now()

    )

    db.add(new_session)

    db.commit()

    db.refresh(new_session)

    return {

        "SessionID": new_session.SessionID,

        "VehicleID": new_session.VehicleID,

        "PlateNumber": new_session.Vehicle.PlateNumber,

        "SlotID": new_session.SlotID,

        "SlotCode": new_session.Slot.SlotCode,

        "EntryTime": new_session.EntryTime,

        "ExitTime": new_session.ExitTime,

        "PaymentStatus": new_session.PaymentStatus,

        "TotalAmount": new_session.TotalAmount,

        "SessionStatus": new_session.SessionStatus,

        "CreatedAt": new_session.CreatedAt

    }


# ======================================
# UPDATE
# ======================================
@router.put(
    "/parking-sessions/{session_id}",
    response_model=ParkingSessionResponse
)
def update_parking_session(
    session_id: int,
    session: ParkingSessionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(staff_required)
):

    db_session = db.query(ParkingSession).filter(
        ParkingSession.SessionID == session_id
    ).first()

    if db_session is None:

        raise HTTPException(
            status_code=404,
            detail="Parking Session not found"
        )

    db_session.VehicleID = session.VehicleID
    db_session.SlotID = session.SlotID
    db_session.EntryTime = session.EntryTime
    db_session.ExitTime = session.ExitTime
    db_session.PaymentStatus = session.PaymentStatus
    db_session.TotalAmount = session.TotalAmount
    db_session.SessionStatus = session.SessionStatus

    db.commit()

    db.refresh(db_session)

    return {

        "SessionID": db_session.SessionID,

        "VehicleID": db_session.VehicleID,

        "PlateNumber": db_session.Vehicle.PlateNumber,

        "SlotID": db_session.SlotID,

        "SlotCode": db_session.Slot.SlotCode,

        "EntryTime": db_session.EntryTime,

        "ExitTime": db_session.ExitTime,

        "PaymentStatus": db_session.PaymentStatus,

        "TotalAmount": db_session.TotalAmount,

        "SessionStatus": db_session.SessionStatus,

        "CreatedAt": db_session.CreatedAt

    }


# ======================================
# DELETE
# ======================================
@router.delete("/parking-sessions/{session_id}")
def delete_parking_session(
    session_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):

    session = db.query(ParkingSession).filter(
        ParkingSession.SessionID == session_id
    ).first()

    if session is None:
        raise HTTPException(
            status_code=404,
            detail="Parking Session not found"
        )

    try:

        db.delete(session)

        db.commit()

    except IntegrityError:

        db.rollback()

        raise HTTPException(
            status_code=400,
            detail="Parking Session cannot be deleted."
        )

    return {
        "message": "Parking Session deleted successfully"
    }