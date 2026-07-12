from fastapi import Depends, HTTPException
from app.security import get_current_user
from app.models.user import User


def admin_required(
    current_user: User = Depends(get_current_user)
):
    if current_user.RoleID != 1:
        raise HTTPException(
            status_code=403,
            detail="Admin only"
        )

    return current_user


def staff_required(
    current_user: User = Depends(get_current_user)
):
    if current_user.RoleID not in [1, 2]:
        raise HTTPException(
            status_code=403,
            detail="Staff only"
        )

    return current_user


def customer_required(
    current_user: User = Depends(get_current_user)
):
    return current_user