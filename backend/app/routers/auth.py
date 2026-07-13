from fastapi.security import OAuth2PasswordRequestForm
from app.security import create_access_token, verify_password

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
        {
            "sub": user.Username,
            "role": user.RoleID
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }