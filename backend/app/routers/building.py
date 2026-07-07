from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db

from app.models.building import Building
from app.models.user import User

from app.schemas.building import (
    BuildingResponse,
    BuildingCreate,
    BuildingUpdate,
)

from app.security import get_current_user
from app.permissions import admin_required

router = APIRouter()


# ==========================
# Lấy tất cả Building
# (Đã đăng nhập)
# ==========================
@router.get("/buildings", response_model=list[BuildingResponse])
def get_buildings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Building).all()


# ==========================
# Lấy Building theo ID
# (Đã đăng nhập)
# ==========================
@router.get("/buildings/{building_id}", response_model=BuildingResponse)
def get_building(
    building_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    building = db.query(Building).filter(
        Building.BuildingID == building_id
    ).first()

    if building is None:
        raise HTTPException(
            status_code=404,
            detail="Building not found"
        )

    return building


# ==========================
# Thêm Building
# (Admin)
# ==========================
@router.post("/buildings", response_model=BuildingResponse)
def create_building(
    building: BuildingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    new_building = Building(
        BuildingName=building.BuildingName,
        Address=building.Address,
        TotalFloors=building.TotalFloors,
        Status=building.Status,
        Description=building.Description,
        CreatedAt=datetime.now()
    )

    db.add(new_building)
    db.commit()
    db.refresh(new_building)

    return new_building


# ==========================
# Cập nhật Building
# (Admin)
# ==========================
@router.put("/buildings/{building_id}", response_model=BuildingResponse)
def update_building(
    building_id: int,
    building: BuildingUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    db_building = db.query(Building).filter(
        Building.BuildingID == building_id
    ).first()

    if db_building is None:
        raise HTTPException(
            status_code=404,
            detail="Building not found"
        )

    db_building.BuildingName = building.BuildingName
    db_building.Address = building.Address
    db_building.TotalFloors = building.TotalFloors
    db_building.Status = building.Status
    db_building.Description = building.Description

    db.commit()
    db.refresh(db_building)

    return db_building


# ==========================
# Xóa Building
# (Admin)
# ==========================
@router.delete("/buildings/{building_id}")
def delete_building(
    building_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    building = db.query(Building).filter(
        Building.BuildingID == building_id
    ).first()

    if building is None:
        raise HTTPException(
            status_code=404,
            detail="Building not found"
        )

    db.delete(building)
    db.commit()

    return {
        "message": "Building deleted successfully"
    }