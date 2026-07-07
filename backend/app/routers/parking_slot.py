from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from datetime import datetime

from app.database import get_db

from app.models.parking_slot import ParkingSlot
from app.models.floor import Floor
from app.models.vehicle_type import VehicleType
from app.models.user import User

from app.schemas.parking_slot import (
    ParkingSlotResponse,
    ParkingSlotCreate,
    ParkingSlotUpdate,
)

from app.security import get_current_user
from app.permissions import staff_required

router = APIRouter()


# ==========================
# GET ALL
# ==========================
@router.get(
    "/parking-slots",
    response_model=list[ParkingSlotResponse]
)
def get_parking_slots(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    slots = db.query(ParkingSlot).all()

    result = []

    for slot in slots:

        result.append({

            "SlotID": slot.SlotID,

            "FloorID": slot.FloorID,

            "VehicleTypeID": slot.VehicleTypeID,

            "SlotCode": slot.SlotCode,

            "SlotStatus": slot.SlotStatus,

            "IsActive": slot.IsActive,

            "CreatedAt": slot.CreatedAt,

            "FloorName": slot.Floor.FloorName,

            "VehicleTypeName": slot.VehicleType.VehicleTypeName

        })

    return result


# ==========================
# GET BY ID
# ==========================
@router.get(
    "/parking-slots/{slot_id}",
    response_model=ParkingSlotResponse
)
def get_parking_slot(
    slot_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    slot = db.query(ParkingSlot).filter(
        ParkingSlot.SlotID == slot_id
    ).first()

    if slot is None:

        raise HTTPException(
            status_code=404,
            detail="Parking Slot not found"
        )

    return {

        "SlotID": slot.SlotID,

        "FloorID": slot.FloorID,

        "VehicleTypeID": slot.VehicleTypeID,

        "SlotCode": slot.SlotCode,

        "SlotStatus": slot.SlotStatus,

        "IsActive": slot.IsActive,

        "CreatedAt": slot.CreatedAt,

        "FloorName": slot.Floor.FloorName,

        "VehicleTypeName": slot.VehicleType.VehicleTypeName

    }


# ==========================
# CREATE
# ==========================
@router.post(
    "/parking-slots",
    response_model=ParkingSlotResponse
)
def create_parking_slot(
    slot: ParkingSlotCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(staff_required)
):

    new_slot = ParkingSlot(
        FloorID=slot.FloorID,
        VehicleTypeID=slot.VehicleTypeID,
        SlotCode=slot.SlotCode,
        SlotStatus=slot.SlotStatus,
        IsActive=slot.IsActive,
        CreatedAt=datetime.now()
    )

    db.add(new_slot)

    db.commit()

    db.refresh(new_slot)

    return {

        "SlotID": new_slot.SlotID,

        "FloorID": new_slot.FloorID,

        "VehicleTypeID": new_slot.VehicleTypeID,

        "SlotCode": new_slot.SlotCode,

        "SlotStatus": new_slot.SlotStatus,

        "IsActive": new_slot.IsActive,

        "CreatedAt": new_slot.CreatedAt,

        "FloorName": new_slot.Floor.FloorName,

        "VehicleTypeName": new_slot.VehicleType.VehicleTypeName

    }


# ==========================
# UPDATE
# ==========================
@router.put(
    "/parking-slots/{slot_id}",
    response_model=ParkingSlotResponse
)
def update_parking_slot(
    slot_id: int,
    slot: ParkingSlotUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(staff_required)
):

    db_slot = db.query(ParkingSlot).filter(
        ParkingSlot.SlotID == slot_id
    ).first()

    if db_slot is None:

        raise HTTPException(
            status_code=404,
            detail="Parking Slot not found"
        )

    db_slot.FloorID = slot.FloorID
    db_slot.VehicleTypeID = slot.VehicleTypeID
    db_slot.SlotCode = slot.SlotCode
    db_slot.SlotStatus = slot.SlotStatus
    db_slot.IsActive = slot.IsActive

    db.commit()

    db.refresh(db_slot)

    return {

        "SlotID": db_slot.SlotID,

        "FloorID": db_slot.FloorID,

        "VehicleTypeID": db_slot.VehicleTypeID,

        "SlotCode": db_slot.SlotCode,

        "SlotStatus": db_slot.SlotStatus,

        "IsActive": db_slot.IsActive,

        "CreatedAt": db_slot.CreatedAt,

        "FloorName": db_slot.Floor.FloorName,

        "VehicleTypeName": db_slot.VehicleType.VehicleTypeName

    }


# ==========================
# DELETE
# ==========================
@router.delete("/parking-slots/{slot_id}")
def delete_parking_slot(
    slot_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(staff_required)
):

    slot = db.query(ParkingSlot).filter(
        ParkingSlot.SlotID == slot_id
    ).first()

    if slot is None:

        raise HTTPException(
            status_code=404,
            detail="Parking Slot not found"
        )

    try:

        db.delete(slot)

        db.commit()

    except IntegrityError:

        db.rollback()

        raise HTTPException(
            status_code=400,
            detail="Parking Slot is being used and cannot be deleted."
        )

    return {
        "message": "Parking Slot deleted successfully"
    }