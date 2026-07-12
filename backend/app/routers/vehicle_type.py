from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from sqlalchemy.exc import IntegrityError

from app.database import get_db

from app.models.vehicle_type import VehicleType
from app.models.user import User

from app.schemas.vehicle_type import (
    VehicleTypeCreate,
    VehicleTypeUpdate,
    VehicleTypeResponse,
)

from app.security import get_current_user
from app.permissions import admin_required

router = APIRouter()


# ==========================
# Get all Vehicle Types
# (Đã đăng nhập)
# ==========================
@router.get("/vehicle-types", response_model=list[VehicleTypeResponse])
def get_vehicle_types(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(VehicleType).all()


# ==========================
# Get Vehicle Type by ID
# (Đã đăng nhập)
# ==========================
@router.get("/vehicle-types/{vehicle_type_id}", response_model=VehicleTypeResponse)
def get_vehicle_type(
    vehicle_type_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    vehicle_type = (
        db.query(VehicleType)
        .filter(VehicleType.VehicleTypeID == vehicle_type_id)
        .first()
    )

    if vehicle_type is None:
        raise HTTPException(
            status_code=404,
            detail="Vehicle Type not found"
        )

    return vehicle_type


# ==========================
# Create Vehicle Type
# (Admin)
# ==========================
@router.post("/vehicle-types", response_model=VehicleTypeResponse)
def create_vehicle_type(
    vehicle_type: VehicleTypeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    new_vehicle_type = VehicleType(
        VehicleTypeName=vehicle_type.VehicleTypeName,
        Width=vehicle_type.Width,
        Height=vehicle_type.Height,
        HourlyPrice=vehicle_type.HourlyPrice,
        DailyPrice=vehicle_type.DailyPrice,
        Description=vehicle_type.Description,
        CreatedAt=datetime.now(),
    )

    db.add(new_vehicle_type)
    db.commit()
    db.refresh(new_vehicle_type)

    return new_vehicle_type


# ==========================
# Update Vehicle Type
# (Admin)
# ==========================
@router.put("/vehicle-types/{vehicle_type_id}", response_model=VehicleTypeResponse)
def update_vehicle_type(
    vehicle_type_id: int,
    vehicle_type: VehicleTypeUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    db_vehicle_type = (
        db.query(VehicleType)
        .filter(VehicleType.VehicleTypeID == vehicle_type_id)
        .first()
    )

    if db_vehicle_type is None:
        raise HTTPException(
            status_code=404,
            detail="Vehicle Type not found"
        )

    db_vehicle_type.VehicleTypeName = vehicle_type.VehicleTypeName
    db_vehicle_type.Width = vehicle_type.Width
    db_vehicle_type.Height = vehicle_type.Height
    db_vehicle_type.HourlyPrice = vehicle_type.HourlyPrice
    db_vehicle_type.DailyPrice = vehicle_type.DailyPrice
    db_vehicle_type.Description = vehicle_type.Description

    db.commit()
    db.refresh(db_vehicle_type)

    return db_vehicle_type


# ==========================
# Delete Vehicle Type
# (Admin)
# ==========================
@router.delete("/vehicle-types/{vehicle_type_id}")
def delete_vehicle_type(
    vehicle_type_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    vehicle_type = db.query(VehicleType).filter(
        VehicleType.VehicleTypeID == vehicle_type_id
    ).first()

    if vehicle_type is None:
        raise HTTPException(
            status_code=404,
            detail="Vehicle Type not found"
        )

    try:
        db.delete(vehicle_type)
        db.commit()

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="Vehicle Type đang được Floor hoặc Parking Slot sử dụng nên không thể xóa."
        )

    return {
        "message": "Vehicle Type deleted successfully"
    }