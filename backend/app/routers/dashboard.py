from datetime import datetime, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy import func, or_
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.building import Building
from app.models.floor import Floor
from app.models.parking_session import ParkingSession
from app.models.parking_slot import ParkingSlot
from app.models.payment import Payment
from app.models.user import User
from app.models.vehicle import Vehicle
from app.permissions import admin_required
from app.schemas.dashboard import DashboardResponse

router = APIRouter()


@router.get("/dashboard", response_model=DashboardResponse)
def dashboard(db: Session = Depends(get_db), current_user: User = Depends(admin_required)):
    total_users = db.query(User).count()
    total_buildings = db.query(Building).count()
    total_floors = db.query(Floor).count()
    total_slots = db.query(ParkingSlot).count()
    total_vehicles = db.query(Vehicle).count()
    total_sessions = db.query(ParkingSession).count()
    total_payments = db.query(Payment).count()

    vehicles_parking = db.query(ParkingSession).filter(
        ParkingSession.SessionStatus.in_(["Đang gửi", "Active"])
    ).count()
    vehicles_completed = db.query(ParkingSession).filter(
        ParkingSession.SessionStatus.in_(["Hoàn thành", "Completed"])
    ).count()
    available_slots = db.query(ParkingSlot).filter(ParkingSlot.SlotStatus == "Empty").count()
    occupied_slots = db.query(ParkingSlot).filter(ParkingSlot.SlotStatus == "Occupied").count()
    reserved_slots = db.query(ParkingSlot).filter(ParkingSlot.SlotStatus == "Reserved").count()
    parking_rate = round(occupied_slots / total_slots * 100) if total_slots else 0

    today = datetime.today().date()
    today_start = datetime.combine(today, datetime.min.time())
    today_end = today_start + timedelta(days=1)
    today_revenue = db.query(func.sum(Payment.Amount)).filter(
        Payment.PaymentTime >= today_start, Payment.PaymentTime < today_end
    ).scalar() or 0
    total_revenue = db.query(func.sum(Payment.Amount)).scalar() or 0

    revenues, occupancies, entries, exits = [], [], [], []
    for offset in range(6, -1, -1):
        day = today - timedelta(days=offset)
        start = datetime.combine(day, datetime.min.time())
        end = start + timedelta(days=1)
        revenue = db.query(func.sum(Payment.Amount)).filter(
            Payment.PaymentTime >= start, Payment.PaymentTime < end
        ).scalar() or 0
        entry_count = db.query(ParkingSession).filter(
            ParkingSession.EntryTime >= start, ParkingSession.EntryTime < end
        ).count()
        exit_count = db.query(ParkingSession).filter(
            ParkingSession.ExitTime >= start, ParkingSession.ExitTime < end
        ).count()
        active_count = db.query(ParkingSession).filter(
            ParkingSession.EntryTime < end,
            or_(ParkingSession.ExitTime.is_(None), ParkingSession.ExitTime >= start)
        ).count()
        revenues.append(float(revenue))
        entries.append(entry_count)
        exits.append(exit_count)
        occupancies.append(round(active_count / total_slots * 100) if total_slots else 0)

    rows = (db.query(ParkingSession, Vehicle.PlateNumber, ParkingSlot.SlotCode)
        .join(Vehicle, ParkingSession.VehicleID == Vehicle.VehicleID)
        .join(ParkingSlot, ParkingSession.SlotID == ParkingSlot.SlotID)
        .order_by(ParkingSession.SessionID.desc()).limit(5).all())
    recent = [{"PlateNumber": plate, "SlotCode": slot,
        "EntryTime": session.EntryTime.strftime("%d/%m/%Y %H:%M"),
        "SessionStatus": session.SessionStatus} for session, plate, slot in rows]

    return {"TotalUsers": total_users, "TotalBuildings": total_buildings,
        "TotalFloors": total_floors, "TotalParkingSlots": total_slots,
        "TotalVehicles": total_vehicles, "TotalParkingSessions": total_sessions,
        "TotalPayments": total_payments, "VehiclesParking": vehicles_parking,
        "VehiclesCompleted": vehicles_completed, "TodayRevenue": float(today_revenue),
        "TotalRevenue": float(total_revenue), "AvailableSlots": available_slots,
        "OccupiedSlots": occupied_slots, "ReservedSlots": reserved_slots,
        "ParkingRate": parking_rate, "Revenue7Days": revenues,
        "Occupancy7Days": occupancies, "Entries7Days": entries,
        "Exits7Days": exits, "RecentActivities": recent}
