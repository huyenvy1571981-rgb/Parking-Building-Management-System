from pydantic import BaseModel
from datetime import datetime


# ==========================
# Tạo Role
# ==========================
class RoleCreate(BaseModel):
    RoleName: str
    Description: str


# ==========================
# Cập nhật Role
# ==========================
class RoleUpdate(BaseModel):
    RoleName: str
    Description: str


# ==========================
# Trả dữ liệu Role
# ==========================
class RoleResponse(BaseModel):
    RoleID: int
    RoleName: str
    Description: str
    CreatedAt: datetime

    class Config:
        from_attributes = True