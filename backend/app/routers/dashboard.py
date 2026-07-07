from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta

from app.database import get_db

from app.models.user import User
from app.models.building import Building
from app.models.floor import Floor
from app.models.parking_slot import ParkingSlot
from app.models.vehicle import Vehicle
from app.models.parking_session import ParkingSession
from app.models.payment import Payment

from app.schemas.dashboard import DashboardResponse

from app.permissions import admin_required

router = APIRouter()


@router.get(
    "/dashboard",
    response_model=DashboardResponse
)
def dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):

    # ======================================
    # Tổng dữ liệu
    # ======================================

    total_users = db.query(User).count()

    total_buildings = db.query(Building).count()

    total_floors = db.query(Floor).count()

    total_slots = db.query(ParkingSlot).count()

    total_vehicles = db.query(Vehicle).count()

    total_sessions = db.query(ParkingSession).count()

    total_payments = db.query(Payment).count()

    # ======================================
    # Xe đang gửi
    # ======================================

    vehicles_parking = db.query(ParkingSession).filter(
        ParkingSession.SessionStatus == "Đang gửi"
    ).count()

    # ======================================
    # Xe hoàn thành
    # ======================================

    vehicles_completed = db.query(ParkingSession).filter(
        ParkingSession.SessionStatus == "Hoàn thành"
    ).count()

    # ======================================
    # Slot Available
    # ======================================

    available_slots = db.query(ParkingSlot).filter(
        ParkingSlot.SlotStatus == "Empty"
    ).count()

    # ======================================
    # Slot Occupied
    # ======================================

    occupied_slots = db.query(ParkingSlot).filter(
        ParkingSlot.SlotStatus == "Occupied"
    ).count()

    # ======================================
    # Parking Rate
    # ======================================

    parking_rate = 0

    if total_slots > 0:

        parking_rate = round(
            occupied_slots / total_slots * 100
        )

    # ======================================
    # Doanh thu hôm nay
    # ======================================

    today = datetime.today().date()

    start = datetime.combine(
        today,
        datetime.min.time()
    )

    end = start + timedelta(days=1)

    today_revenue = db.query(
        func.sum(Payment.Amount)
    ).filter(
        Payment.PaymentTime >= start,
        Payment.PaymentTime < end
    ).scalar()

    # ======================================
    # Tổng doanh thu
    # ======================================

    total_revenue = db.query(
        func.sum(Payment.Amount)
    ).scalar()

    # ======================================
    # Doanh thu 7 ngày
    # ======================================

    revenues = []

    for i in range(6, -1, -1):

        day = today - timedelta(days=i)

        start_day = datetime.combine(
            day,
            datetime.min.time()
        )

        end_day = start_day + timedelta(days=1)

        revenue = db.query(
            func.sum(Payment.Amount)
        ).filter(
            Payment.PaymentTime >= start_day,
            Payment.PaymentTime < end_day
        ).scalar()

        revenues.append(float(revenue or 0))

    # ======================================
    # Recent Activities
    # ======================================

    recent_sessions = (
        db.query(
            ParkingSession,
            Vehicle.PlateNumber,
            ParkingSlot.SlotCode
        )
        .join(
            Vehicle,
            ParkingSession.VehicleID == Vehicle.VehicleID
        )
        .join(
            ParkingSlot,
            ParkingSession.SlotID == ParkingSlot.SlotID
        )
        .order_by(
            ParkingSession.SessionID.desc()
        )
        .limit(5)
        .all()
    )

    recent_activities = []

    for session, plate, slot in recent_sessions:

        recent_activities.append({

            "PlateNumber": plate,

            "SlotCode": slot,

            "EntryTime": session.EntryTime.strftime(
                "%d/%m/%Y %H:%M"
            ),

            "SessionStatus": session.SessionStatus

        })

    # ======================================
    # Return
    # ======================================

    return {

        "TotalUsers": total_users,

        "TotalBuildings": total_buildings,

        "TotalFloors": total_floors,

        "TotalParkingSlots": total_slots,

        "TotalVehicles": total_vehicles,

        "TotalParkingSessions": total_sessions,

        "TotalPayments": total_payments,

        "VehiclesParking": vehicles_parking,

        "VehiclesCompleted": vehicles_completed,

        "TodayRevenue": float(today_revenue or 0),

        "TotalRevenue": float(total_revenue or 0),

        "AvailableSlots": available_slots,

        "OccupiedSlots": occupied_slots,

        "ParkingRate": parking_rate,

        "Revenue7Days": revenues,

        "RecentActivities": recent_activities

    }