from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserResponse, UserCreate, UserUpdate

from fastapi.security import OAuth2PasswordRequestForm

from app.security import (
    verify_password,
    create_access_token,
    get_current_user,
    hash_password,
)

from app.permissions import admin_required

router = APIRouter()


# ==========================================
# Lấy tất cả User (Admin)
# ==========================================
@router.get("/users", response_model=list[UserResponse])
def get_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    print("===== GET USERS =====")
    return db.query(User).all()


# ==========================================
# Lấy User theo ID
# ==========================================
@router.get("/users/{user_id}", response_model=UserResponse)
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    user = db.query(User).filter(
        User.UserID == user_id
    ).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user


# ==========================================
# Thêm User (Admin)
# ==========================================
@router.post("/users", response_model=UserResponse)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    
    # Kiểm tra Username đã tồn tại chưa
    exist = db.query(User).filter(
        User.Username == user.Username
    ).first()

    if exist:
        raise HTTPException(
            status_code=400,
            detail="Username đã tồn tại."
        )

    new_user = User(
        FullName=user.FullName,
        Username=user.Username,
        Email=user.Email,
        PasswordHash=hash_password(user.PasswordHash),
        Phone=user.Phone,
        RoleID=user.RoleID,
        Status=user.Status,
        CreatedAt=datetime.now()
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# ==========================================
# Cập nhật User (Admin)
# ==========================================
@router.put("/users/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int,
    user: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    db_user = db.query(User).filter(
        User.UserID == user_id
    ).first()

    if db_user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    db_user.FullName = user.FullName
    db_user.Username = user.Username
    db_user.Email = user.Email

    # Chỉ mã hóa lại nếu có đổi mật khẩu
    if user.PasswordHash:
        db_user.PasswordHash = hash_password(user.PasswordHash)

    db_user.Phone = user.Phone
    db_user.RoleID = user.RoleID
    db_user.Status = user.Status

    db.commit()
    db.refresh(db_user)

    return db_user

# ==========================================
# Khóa / Mở khóa User
# ==========================================
@router.put("/users/{user_id}/status")
def change_status(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    user = db.query(User).filter(
        User.UserID == user_id
    ).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Đảo trạng thái
    if user.Status == 1:
        user.Status = 0
    else:
        user.Status = 1

    db.commit()
    db.refresh(user)

    return {
        "message": "Success",
        "status": user.Status
    }


# ==========================================
# Xóa User (Admin)
# ==========================================
@router.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    db_user = db.query(User).filter(
        User.UserID == user_id
    ).first()

    if db_user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    db.delete(db_user)
    db.commit()

    return {
        "message": "User deleted successfully"
    }


# ==========================================
# Login JWT
# ==========================================
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.Username == form_data.username
    ).first()

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Username không tồn tại"
        )

    if not verify_password(
        form_data.password,
        user.PasswordHash
    ):
        raise HTTPException(
            status_code=401,
            detail="Sai mật khẩu"
        )

    access_token = create_access_token(
        data={
            "sub": user.Username,
            "role": user.RoleID
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }