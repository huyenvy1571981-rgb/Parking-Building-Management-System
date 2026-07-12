from datetime import datetime
from decimal import Decimal

from app.database import Base, SessionLocal, engine
from app.models import mobile  # noqa: F401
from app.models.building import Building
from app.models.floor import Floor
from app.models.parking_slot import ParkingSlot
from app.models.vehicle_type import VehicleType
from app.models.parking_session import ParkingSession  # noqa: F401
from app.models.payment import Payment  # noqa: F401
from app.models.role import Role  # noqa: F401
from app.models.user import User  # noqa: F401
from app.models.vehicle import Vehicle  # noqa: F401
from app.security import hash_password


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        admin = db.query(User).filter_by(Username="admin").first()
        if not admin:
            admin = User(FullName="Quản trị viên", Username="admin", Email="admin@parking.local",
                PasswordHash=hash_password("123456"), Phone="0900000001", RoleID=1,
                Status=1, CreatedAt=datetime.now())
            db.add(admin)
        types = []
        for name, hourly, daily in [("Xe máy", 5000, 30000), ("Ô tô", 20000, 150000)]:
            item = db.query(VehicleType).filter_by(VehicleTypeName=name).first()
            if not item:
                item = VehicleType(VehicleTypeName=name, Width=Decimal("1"), Height=Decimal("2"),
                    HourlyPrice=hourly, DailyPrice=daily, Description=name, CreatedAt=datetime.now())
                db.add(item); db.flush()
            types.append(item)
        building = db.query(Building).filter_by(BuildingName="FPT Parking Center").first()
        if not building:
            building = Building(BuildingName="FPT Parking Center", Address="Khu Công nghệ cao, TP. Thủ Đức",
                TotalFloors=3, Status=1, Description="Bãi xe thông minh hoạt động 24/7", CreatedAt=datetime.now())
            db.add(building); db.flush()
        specs = [("Tầng 1 - Xe máy", types[0], 12), ("Tầng 2 - Xe máy", types[0], 8),
                 ("Tầng 3 - Ô tô", types[1], 8)]
        for name, vehicle_type, count in specs:
            floor = db.query(Floor).filter_by(BuildingID=building.BuildingID, FloorName=name).first()
            if not floor:
                floor = Floor(BuildingID=building.BuildingID, FloorName=name, FloorType="Parking",
                    TotalSlots=count, Status=1, Description=name, CreatedAt=datetime.now(),
                    VehicleTypeID=vehicle_type.VehicleTypeID)
                db.add(floor); db.flush()
            prefix = "M" if vehicle_type.VehicleTypeName == "Xe máy" else "C"
            for index in range(1, count + 1):
                code = f"{prefix}{floor.FloorID}-{index:02d}"
                if not db.query(ParkingSlot).filter_by(SlotCode=code).first():
                    db.add(ParkingSlot(FloorID=floor.FloorID, VehicleTypeID=vehicle_type.VehicleTypeID,
                        SlotCode=code, SlotStatus="Empty", IsActive=True, CreatedAt=datetime.now()))
        db.commit()
        print("Demo data is ready: 1 building, 3 floors, 28 slots.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
