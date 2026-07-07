from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db

from app.models.floor import Floor
from app.models.user import User

from app.schemas.floor import (
    FloorResponse,
    FloorCreate,
    FloorUpdate,
)

from app.security import get_current_user
from app.permissions import admin_required

router = APIRouter()


# ==========================================
# Lấy tất cả Floor
# ==========================================
@router.get("/floors", response_model=list[FloorResponse])
def get_floors(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Floor).all()


# ==========================================
# Lấy Floor theo ID
# ==========================================
@router.get("/floors/{floor_id}", response_model=FloorResponse)
def get_floor(
    floor_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    floor = db.query(Floor).filter(
        Floor.FloorID == floor_id
    ).first()

    if floor is None:
        raise HTTPException(
            status_code=404,
            detail="Floor not found"
        )

    return floor


# ==========================================
# Thêm Floor
# ==========================================
@router.post("/floors", response_model=FloorResponse)
def create_floor(
    floor: FloorCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):

    # Kiểm tra tên tầng đã tồn tại
    exist = db.query(Floor).filter(
        Floor.FloorName == floor.FloorName
    ).first()

    if exist:
        raise HTTPException(
            status_code=400,
            detail="Tên tầng đã tồn tại."
        )

    new_floor = Floor(
        BuildingID=floor.BuildingID,
        FloorName=floor.FloorName,
        FloorType=floor.FloorType,
        TotalSlots=floor.TotalSlots,
        Status=floor.Status,
        Description=floor.Description,
        VehicleTypeID=floor.VehicleTypeID,
        CreatedAt=datetime.now()
    )

    db.add(new_floor)
    db.commit()
    db.refresh(new_floor)

    return new_floor


# ==========================================
# Cập nhật Floor
# ==========================================
@router.put("/floors/{floor_id}", response_model=FloorResponse)
def update_floor(
    floor_id: int,
    floor: FloorUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):

    db_floor = db.query(Floor).filter(
        Floor.FloorID == floor_id
    ).first()

    if db_floor is None:
        raise HTTPException(
            status_code=404,
            detail="Floor not found"
        )

    # Kiểm tra tên tầng đã tồn tại (trừ chính nó)
    exist = db.query(Floor).filter(
        Floor.FloorName == floor.FloorName,
        Floor.FloorID != floor_id
    ).first()

    if exist:
        raise HTTPException(
            status_code=400,
            detail="Tên tầng đã tồn tại."
        )

    db_floor.BuildingID = floor.BuildingID
    db_floor.FloorName = floor.FloorName
    db_floor.FloorType = floor.FloorType
    db_floor.TotalSlots = floor.TotalSlots
    db_floor.Status = floor.Status
    db_floor.Description = floor.Description
    db_floor.VehicleTypeID = floor.VehicleTypeID

    db.commit()
    db.refresh(db_floor)

    return db_floor


# ==========================================
# Xóa Floor
# ==========================================
@router.delete("/floors/{floor_id}")
def delete_floor(
    floor_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):

    floor = db.query(Floor).filter(
        Floor.FloorID == floor_id
    ).first()

    if floor is None:
        raise HTTPException(
            status_code=404,
            detail="Floor not found"
        )

    db.delete(floor)
    db.commit()

    return {
        "message": "Floor deleted successfully"
    }