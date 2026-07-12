from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.mobile import Booking, IncidentReport, MonthlyPass, Notification
from app.models.parking_session import ParkingSession
from app.models.parking_slot import ParkingSlot
from app.models.payment import Payment
from app.models.user import User
from app.permissions import staff_required

router = APIRouter(prefix="/web-ops", tags=["Web Operations"])


class CheckInRequest(BaseModel):
    qr_token: str


class IncidentUpdate(BaseModel):
    status: str
    manager_response: str = ""


def booking_row(x: Booking):
    return {"booking_id": x.BookingID, "booking_code": x.BookingCode,
        "customer_name": x.User.FullName if hasattr(x, "User") and x.User else "Tài xế",
        "phone": x.User.Phone if hasattr(x, "User") and x.User else "",
        "plate_number": x.Vehicle.PlateNumber, "building_name": x.Building.BuildingName,
        "floor_name": x.Floor.FloorName, "slot_code": x.Slot.SlotCode,
        "arrival_time": x.ArrivalTime, "booking_fee": float(x.BookingFee or 0),
        "payment_status": x.PaymentStatus, "booking_status": x.BookingStatus,
        "qr_token": x.QRToken, "created_at": x.CreatedAt}


@router.get("/bookings")
def list_bookings(db: Session = Depends(get_db), current_user: User = Depends(staff_required)):
    items = db.query(Booking).order_by(Booking.CreatedAt.desc()).all()
    return [booking_row(x) for x in items]


@router.post("/bookings/check-in")
def check_in(payload: CheckInRequest, db: Session = Depends(get_db),
             current_user: User = Depends(staff_required)):
    booking = db.query(Booking).filter(
        (Booking.QRToken == payload.qr_token) | (Booking.BookingCode == payload.qr_token),
        Booking.BookingStatus == "Confirmed").first()
    if not booking:
        raise HTTPException(status_code=404, detail="QR không hợp lệ hoặc booking đã được sử dụng")
    active = db.query(ParkingSession).filter(ParkingSession.VehicleID == booking.VehicleID,
        ParkingSession.SessionStatus.in_(["Active", "Đang gửi"])).first()
    if active:
        raise HTTPException(status_code=409, detail="Xe đã có phiên gửi đang hoạt động")
    session = ParkingSession(VehicleID=booking.VehicleID, SlotID=booking.SlotID,
        EntryTime=datetime.now(), ExitTime=None, PaymentStatus="Unpaid", TotalAmount=0,
        SessionStatus="Active", CreatedAt=datetime.now())
    booking.BookingStatus = "CheckedIn"
    booking.Slot.SlotStatus = "Occupied"
    db.add(session); db.flush()
    db.add(Notification(UserID=booking.UserID, Title="Check-in thành công",
        Message=f"Xe {booking.Vehicle.PlateNumber} đã vào vị trí {booking.Slot.SlotCode}.",
        NotificationType="Parking", CreatedAt=datetime.now()))
    db.commit(); db.refresh(session)
    return {"message": "Check-in thành công", "session_id": session.SessionID,
            "plate_number": booking.Vehicle.PlateNumber, "slot_code": booking.Slot.SlotCode}


@router.get("/monthly-passes")
def list_passes(db: Session = Depends(get_db), current_user: User = Depends(staff_required)):
    items = db.query(MonthlyPass).order_by(MonthlyPass.CreatedAt.desc()).all()
    return [{"monthly_pass_id": x.MonthlyPassID, "pass_code": x.PassCode,
        "customer_name": db.query(User).filter(User.UserID == x.UserID).first().FullName,
        "plate_number": x.Vehicle.PlateNumber, "building_name": x.Building.BuildingName,
        "start_date": x.StartDate, "end_date": x.EndDate, "amount": float(x.Amount or 0),
        "status": "Expired" if x.EndDate < datetime.now() else x.Status} for x in items]


@router.get("/incidents")
def list_incidents(db: Session = Depends(get_db), current_user: User = Depends(staff_required)):
    items = db.query(IncidentReport).order_by(IncidentReport.CreatedAt.desc()).all()
    return [{"incident_id": x.IncidentID,
        "customer_name": db.query(User).filter(User.UserID == x.UserID).first().FullName,
        "incident_type": x.IncidentType, "description": x.Description, "image_url": x.ImageUrl,
        "status": x.Status, "manager_response": x.ManagerResponse, "created_at": x.CreatedAt} for x in items]


@router.put("/incidents/{incident_id}")
def update_incident(incident_id: int, payload: IncidentUpdate, db: Session = Depends(get_db),
                    current_user: User = Depends(staff_required)):
    item = db.query(IncidentReport).filter(IncidentReport.IncidentID == incident_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Không tìm thấy báo cáo")
    item.Status = payload.status; item.ManagerResponse = payload.manager_response; item.UpdatedAt = datetime.now()
    db.add(Notification(UserID=item.UserID, Title="Cập nhật báo cáo sự cố",
        Message=payload.manager_response or f"Báo cáo #{item.IncidentID}: {payload.status}",
        NotificationType="Incident", CreatedAt=datetime.now()))
    db.commit()
    return {"message": "Đã cập nhật sự cố"}


@router.get("/reports/operations")
def operation_report(db: Session = Depends(get_db), current_user: User = Depends(staff_required)):
    now = datetime.now(); start = datetime.combine(now.date(), datetime.min.time())
    total_slots = db.query(ParkingSlot).filter(ParkingSlot.IsActive == True).count()
    occupied = db.query(ParkingSlot).filter(ParkingSlot.SlotStatus == "Occupied").count()
    reserved = db.query(ParkingSlot).filter(ParkingSlot.SlotStatus == "Reserved").count()
    today_entries = db.query(ParkingSession).filter(ParkingSession.EntryTime >= start).count()
    today_exits = db.query(ParkingSession).filter(ParkingSession.ExitTime >= start).count()
    revenue = db.query(func.sum(Payment.Amount)).filter(Payment.PaymentTime >= start,
        Payment.PaymentStatus.in_(["Paid", "Success"])).scalar() or 0
    bookings = db.query(Booking).filter(Booking.CreatedAt >= start).count()
    open_incidents = db.query(IncidentReport).filter(IncidentReport.Status != "Resolved").count()
    return {"total_slots": total_slots, "occupied_slots": occupied, "reserved_slots": reserved,
        "available_slots": max(0, total_slots - occupied - reserved),
        "occupancy_rate": round(occupied / total_slots * 100) if total_slots else 0,
        "today_entries": today_entries, "today_exits": today_exits,
        "today_revenue": float(revenue), "today_bookings": bookings,
        "open_incidents": open_incidents}
