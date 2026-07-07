from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db

from app.models.role import Role
from app.models.user import User

from app.schemas.role import (
    RoleResponse,
    RoleCreate,
    RoleUpdate
)

from app.permissions import admin_required

router = APIRouter()


# ==========================
# Lấy tất cả Role (Admin)
# ==========================
@router.get("/roles", response_model=list[RoleResponse])
def get_roles(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    return db.query(Role).all()


# ==========================
# Lấy Role theo ID (Admin)
# ==========================
@router.get("/roles/{role_id}", response_model=RoleResponse)
def get_role(
    role_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    role = db.query(Role).filter(
        Role.RoleID == role_id
    ).first()

    if role is None:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    return role


# ==========================
# Thêm Role (Admin)
# ==========================
@router.post("/roles", response_model=RoleResponse)
def create_role(
    role: RoleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    new_role = Role(
        RoleName=role.RoleName,
        Description=role.Description,
        CreatedAt=datetime.now()
    )

    db.add(new_role)
    db.commit()
    db.refresh(new_role)

    return new_role


# ==========================
# Cập nhật Role (Admin)
# ==========================
@router.put("/roles/{role_id}", response_model=RoleResponse)
def update_role(
    role_id: int,
    role: RoleUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    db_role = db.query(Role).filter(
        Role.RoleID == role_id
    ).first()

    if db_role is None:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    db_role.RoleName = role.RoleName
    db_role.Description = role.Description

    db.commit()
    db.refresh(db_role)

    return db_role


# ==========================
# Xóa Role (Admin)
# ==========================
@router.delete("/roles/{role_id}")
def delete_role(
    role_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    db_role = db.query(Role).filter(
        Role.RoleID == role_id
    ).first()

    if db_role is None:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    db.delete(db_role)
    db.commit()

    return {
        "message": "Role deleted successfully"
    }