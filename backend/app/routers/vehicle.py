from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from datetime import datetime

from app.database import get_db

from app.models.vehicle import Vehicle
from app.models.vehicle_type import VehicleType
from app.models.user import User

from app.schemas.vehicle import (
    VehicleCreate,
    VehicleUpdate,
    VehicleResponse,
)

from app.permissions import (
    staff_required,
    admin_required,
)

router = APIRouter()


# ==========================
# Get all Vehicles
# ==========================
@router.get("/vehicles", response_model=list[VehicleResponse])
def get_vehicles(
    db: Session = Depends(get_db),
    current_user: User = Depends(staff_required)
):

    vehicles = (
        db.query(Vehicle)
        .join(
            VehicleType,
            Vehicle.VehicleTypeID == VehicleType.VehicleTypeID
        )
        .all()
    )

    result = []

    for vehicle in vehicles:

        result.append({

            "VehicleID": vehicle.VehicleID,

            "PlateNumber": vehicle.PlateNumber,

            "VehicleTypeID": vehicle.VehicleTypeID,

            "VehicleTypeName": vehicle.VehicleType.VehicleTypeName,

            "OwnerName": vehicle.OwnerName,

            "Phone": vehicle.Phone,

            "CreatedAt": vehicle.CreatedAt

        })

    return result


# ==========================
# Get Vehicle by ID
# ==========================
@router.get("/vehicles/{vehicle_id}", response_model=VehicleResponse)
def get_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(staff_required)
):

    vehicle = db.query(Vehicle).filter(
        Vehicle.VehicleID == vehicle_id
    ).first()

    if vehicle is None:

        raise HTTPException(
            status_code=404,
            detail="Vehicle not found"
        )

    return {

        "VehicleID": vehicle.VehicleID,

        "PlateNumber": vehicle.PlateNumber,

        "VehicleTypeID": vehicle.VehicleTypeID,

        "VehicleTypeName": vehicle.VehicleType.VehicleTypeName,

        "OwnerName": vehicle.OwnerName,

        "Phone": vehicle.Phone,

        "CreatedAt": vehicle.CreatedAt

    }


# ==========================
# Create Vehicle
# ==========================
@router.post("/vehicles", response_model=VehicleResponse)
def create_vehicle(
    vehicle: VehicleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(staff_required)
):

    new_vehicle = Vehicle(

        PlateNumber=vehicle.PlateNumber,

        VehicleTypeID=vehicle.VehicleTypeID,

        OwnerName=vehicle.OwnerName,

        Phone=vehicle.Phone,

        CreatedAt=datetime.now()

    )

    db.add(new_vehicle)

    db.commit()

    db.refresh(new_vehicle)

    return {

        "VehicleID": new_vehicle.VehicleID,

        "PlateNumber": new_vehicle.PlateNumber,

        "VehicleTypeID": new_vehicle.VehicleTypeID,

        "VehicleTypeName": new_vehicle.VehicleType.VehicleTypeName,

        "OwnerName": new_vehicle.OwnerName,

        "Phone": new_vehicle.Phone,

        "CreatedAt": new_vehicle.CreatedAt

    }


# ==========================
# Update Vehicle
# ==========================
@router.put("/vehicles/{vehicle_id}", response_model=VehicleResponse)
def update_vehicle(
    vehicle_id: int,
    vehicle: VehicleUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(staff_required)
):

    db_vehicle = db.query(Vehicle).filter(
        Vehicle.VehicleID == vehicle_id
    ).first()

    if db_vehicle is None:

        raise HTTPException(
            status_code=404,
            detail="Vehicle not found"
        )

    db_vehicle.PlateNumber = vehicle.PlateNumber

    db_vehicle.VehicleTypeID = vehicle.VehicleTypeID

    db_vehicle.OwnerName = vehicle.OwnerName

    db_vehicle.Phone = vehicle.Phone

    db.commit()

    db.refresh(db_vehicle)

    return {

        "VehicleID": db_vehicle.VehicleID,

        "PlateNumber": db_vehicle.PlateNumber,

        "VehicleTypeID": db_vehicle.VehicleTypeID,

        "VehicleTypeName": db_vehicle.VehicleType.VehicleTypeName,

        "OwnerName": db_vehicle.OwnerName,

        "Phone": db_vehicle.Phone,

        "CreatedAt": db_vehicle.CreatedAt

    }


# ==========================
# Delete Vehicle
# ==========================
@router.delete("/vehicles/{vehicle_id}")
def delete_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):

    vehicle = db.query(Vehicle).filter(
        Vehicle.VehicleID == vehicle_id
    ).first()

    if vehicle is None:

        raise HTTPException(
            status_code=404,
            detail="Vehicle not found"
        )

    try:

        db.delete(vehicle)

        db.commit()

    except IntegrityError:

        db.rollback()

        raise HTTPException(
            status_code=400,
            detail="Vehicle đang được Parking Session sử dụng nên không thể xóa."
        )

    return {
        "message": "Vehicle deleted successfully"
    }