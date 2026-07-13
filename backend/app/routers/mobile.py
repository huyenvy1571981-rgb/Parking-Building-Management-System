import hashlib
import os
import secrets
from datetime import datetime, timedelta
from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.building import Building
from app.models.floor import Floor
from app.models.mobile import Booking, DriverVehicle, IncidentReport, MonthlyPass, Notification, OTPVerification
from app.models.parking_session import ParkingSession
from app.models.parking_slot import ParkingSlot
from app.models.payment import Payment
from app.models.user import User
from app.models.vehicle import Vehicle
from app.models.vehicle_type import VehicleType
from app.schemas.mobile import (
    BookingCreate,
    DriverVehicleCreate,
    IncidentCreate,
    MobileLoginRequest,
    MobileProfileUpdate,
    MobileRegisterRequest,
    MonthlyPassCreate,
    OTPVerifyRequest,
    PaymentRequest,
)
from app.security import create_access_token, get_current_user, hash_password, verify_password

router = APIRouter(prefix="/mobile", tags=["Mobile App"])
DEMO_OTP = os.getenv("MOBILE_DEMO_OTP", "123456")


def _now():
    return datetime.now()


def _vehicle_owned(db: Session, user_id: int, vehicle_id: int):
    link = db.query(DriverVehicle).filter(
        DriverVehicle.UserID == user_id,
        DriverVehicle.VehicleID == vehicle_id,
    ).first()
    if not link:
        raise HTTPException(status_code=403, detail="Phương tiện không thuộc tài khoản này")
    return link


def _booking_payload(item: Booking):
    return {
        "booking_id": item.BookingID,
        "booking_code": item.BookingCode,
        "vehicle_id": item.VehicleID,
        "plate_number": item.Vehicle.PlateNumber,
        "building_id": item.BuildingID,
        "building_name": item.Building.BuildingName,
        "address": item.Building.Address,
        "floor_id": item.FloorID,
        "floor_name": item.Floor.FloorName,
        "slot_id": item.SlotID,
        "slot_code": item.Slot.SlotCode,
        "arrival_time": item.ArrivalTime,
        "expires_at": item.ExpiresAt,
        "booking_fee": float(item.BookingFee or 0),
        "payment_method": item.PaymentMethod,
        "payment_status": item.PaymentStatus,
        "booking_status": item.BookingStatus,
        "qr_token": item.QRToken,
        "created_at": item.CreatedAt,
    }


@router.post("/auth/register", status_code=status.HTTP_201_CREATED)
def register(payload: MobileRegisterRequest, db: Session = Depends(get_db)):
    phone = payload.phone.strip()
    existing = db.query(User).filter(or_(User.Phone == phone, User.Username == phone)).first()
    if existing and existing.Status == 1:
        raise HTTPException(status_code=409, detail="Số điện thoại đã được đăng ký")

    user = existing or User(
        FullName=payload.full_name.strip(), Username=phone, Email=f"{phone}@driver.local",
        Phone=phone, RoleID=3, CreatedAt=_now(),
    )
    user.FullName = payload.full_name.strip()
    user.PasswordHash = hash_password(payload.password)
    user.Status = 0
    if not existing:
        db.add(user)
    db.flush()

    if payload.plate_number and payload.vehicle_type_id:
        plate = payload.plate_number.upper().replace(" ", "")
        vehicle = db.query(Vehicle).filter(Vehicle.PlateNumber == plate).first()
        if not vehicle:
            vehicle = Vehicle(PlateNumber=plate, VehicleTypeID=payload.vehicle_type_id,
                              OwnerName=user.FullName, Phone=phone, CreatedAt=_now())
            db.add(vehicle)
            db.flush()
        if not db.query(DriverVehicle).filter_by(UserID=user.UserID, VehicleID=vehicle.VehicleID).first():
            db.add(DriverVehicle(UserID=user.UserID, VehicleID=vehicle.VehicleID,
                                 IsDefault=True, CreatedAt=_now()))

    db.query(OTPVerification).filter(OTPVerification.Phone == phone,
                                     OTPVerification.IsUsed == False).update({"IsUsed": True})
    db.add(OTPVerification(Phone=phone, Code=DEMO_OTP, Purpose="register",
                           ExpiresAt=_now() + timedelta(minutes=5), IsUsed=False, CreatedAt=_now()))
    db.commit()
    return {"message": "Đã gửi OTP", "phone": phone,
            "demo_otp": DEMO_OTP, "expires_in_seconds": 300}


@router.post("/auth/verify-otp")
def verify_otp(payload: OTPVerifyRequest, db: Session = Depends(get_db)):
    otp = db.query(OTPVerification).filter(
        OTPVerification.Phone == payload.phone, OTPVerification.Code == payload.code,
        OTPVerification.IsUsed == False, OTPVerification.ExpiresAt >= _now(),
    ).order_by(OTPVerification.OTPID.desc()).first()
    if not otp:
        raise HTTPException(status_code=400, detail="OTP không đúng hoặc đã hết hạn")
    user = db.query(User).filter(User.Phone == payload.phone).first()
    if not user:
        raise HTTPException(status_code=404, detail="Không tìm thấy tài khoản")
    otp.IsUsed = True
    user.Status = 1
    db.add(Notification(UserID=user.UserID, Title="Chào mừng bạn!",
                        Message="Tài khoản Parking Manager đã được kích hoạt.",
                        NotificationType="Account", CreatedAt=_now()))
    db.commit()
    return {"message": "Xác thực thành công", "access_token": create_access_token(
        {"sub": user.Username, "role": user.RoleID}), "token_type": "bearer"}


@router.post("/auth/login")
def mobile_login(payload: MobileLoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(or_(User.Phone == payload.phone, User.Username == payload.phone)).first()
    if not user or not verify_password(payload.password, user.PasswordHash):
        raise HTTPException(status_code=401, detail="Số điện thoại hoặc mật khẩu không đúng")
    if user.Status != 1:
        raise HTTPException(status_code=403, detail="Tài khoản chưa được xác thực hoặc đã bị khóa")
    return {"access_token": create_access_token({"sub": user.Username, "role": user.RoleID}),
            "token_type": "bearer"}


@router.get("/profile")
def profile(current_user: User = Depends(get_current_user)):
    return {"user_id": current_user.UserID, "full_name": current_user.FullName,
            "phone": current_user.Phone, "email": current_user.Email,
            "role_id": current_user.RoleID}


@router.put("/profile")
def update_profile(payload: MobileProfileUpdate, db: Session = Depends(get_db),
                   current_user: User = Depends(get_current_user)):
    current_user.FullName = payload.full_name
    if payload.email:
        current_user.Email = payload.email
    db.commit()
    return profile(current_user)


@router.get("/home")
def home(search: str = Query(default="", max_length=100), db: Session = Depends(get_db),
         current_user: User = Depends(get_current_user)):
    query = db.query(Building).filter(Building.Status == 1)
    if search:
        query = query.filter(or_(Building.BuildingName.contains(search), Building.Address.contains(search)))
    result = []
    for building in query.all():
        available = db.query(ParkingSlot).join(Floor).filter(
            Floor.BuildingID == building.BuildingID, ParkingSlot.IsActive == True,
            ParkingSlot.SlotStatus == "Empty").count()
        total = db.query(ParkingSlot).join(Floor).filter(Floor.BuildingID == building.BuildingID,
                                                        ParkingSlot.IsActive == True).count()
        result.append({"building_id": building.BuildingID, "name": building.BuildingName,
                       "address": building.Address, "description": building.Description,
                       "is_open": True, "available_slots": available, "total_slots": total})
    unread = db.query(Notification).filter(Notification.UserID == current_user.UserID,
                                           Notification.IsRead == False).count()
    return {"greeting": f"Xin chào, {current_user.FullName}", "unread_notifications": unread,
            "buildings": result}


@router.get("/buildings/{building_id}")
def building_detail(building_id: int, db: Session = Depends(get_db),
                    current_user: User = Depends(get_current_user)):
    building = db.query(Building).filter(Building.BuildingID == building_id).first()
    if not building:
        raise HTTPException(status_code=404, detail="Không tìm thấy bãi xe")
    types = db.query(VehicleType).all()
    floors = []
    for floor in db.query(Floor).filter(Floor.BuildingID == building_id, Floor.Status == 1).all():
        slots = db.query(ParkingSlot).filter(ParkingSlot.FloorID == floor.FloorID,
                                            ParkingSlot.IsActive == True).all()
        floors.append({"floor_id": floor.FloorID, "name": floor.FloorName,
                       "vehicle_type_id": floor.VehicleTypeID,
                       "available_slots": sum(1 for s in slots if s.SlotStatus == "Empty"),
                       "total_slots": len(slots)})
    return {"building_id": building.BuildingID, "name": building.BuildingName,
            "address": building.Address, "description": building.Description,
            "vehicle_types": [{"vehicle_type_id": t.VehicleTypeID, "name": t.VehicleTypeName,
                               "hourly_price": float(t.HourlyPrice or 0),
                               "daily_price": float(t.DailyPrice or 0)} for t in types], "floors": floors}


@router.get("/floors/{floor_id}/available-slots")
def available_slots(floor_id: int, vehicle_type_id: int, db: Session = Depends(get_db),
                    current_user: User = Depends(get_current_user)):
    slots = db.query(ParkingSlot).filter(ParkingSlot.FloorID == floor_id,
        ParkingSlot.VehicleTypeID == vehicle_type_id, ParkingSlot.IsActive == True,
        ParkingSlot.SlotStatus == "Empty").all()
    return [{"slot_id": s.SlotID, "slot_code": s.SlotCode, "status": s.SlotStatus} for s in slots]


@router.get("/vehicles")
def my_vehicles(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    links = db.query(DriverVehicle).filter(DriverVehicle.UserID == current_user.UserID).all()
    return [{"vehicle_id": x.VehicleID, "plate_number": x.Vehicle.PlateNumber,
             "vehicle_type_id": x.Vehicle.VehicleTypeID,
             "vehicle_type_name": (
                 x.Vehicle.VehicleType.VehicleTypeName
                 if x.Vehicle.VehicleType else f"Loại xe #{x.Vehicle.VehicleTypeID}"
             ),
             "color": x.Color, "is_default": x.IsDefault} for x in links]


@router.post("/vehicles", status_code=201)
def add_vehicle(payload: DriverVehicleCreate, db: Session = Depends(get_db),
                current_user: User = Depends(get_current_user)):
    plate = payload.plate_number.upper().replace(" ", "")
    vehicle = db.query(Vehicle).filter(Vehicle.PlateNumber == plate).first()
    if vehicle and db.query(DriverVehicle).filter(DriverVehicle.VehicleID == vehicle.VehicleID).first():
        raise HTTPException(status_code=409, detail="Biển số đã được đăng ký")
    if not db.query(VehicleType).filter(VehicleType.VehicleTypeID == payload.vehicle_type_id).first():
        raise HTTPException(status_code=404, detail="Loại xe không tồn tại")
    if not vehicle:
        vehicle = Vehicle(PlateNumber=plate, VehicleTypeID=payload.vehicle_type_id,
                          OwnerName=current_user.FullName, Phone=current_user.Phone, CreatedAt=_now())
        db.add(vehicle); db.flush()
    if payload.is_default:
        db.query(DriverVehicle).filter(DriverVehicle.UserID == current_user.UserID).update({"IsDefault": False})
    link = DriverVehicle(UserID=current_user.UserID, VehicleID=vehicle.VehicleID,
                         Color=payload.color, IsDefault=payload.is_default, CreatedAt=_now())
    db.add(link); db.commit()
    return {"message": "Đã thêm phương tiện", "vehicle_id": vehicle.VehicleID}


@router.post("/bookings", status_code=201)
def create_booking(payload: BookingCreate, db: Session = Depends(get_db),
                   current_user: User = Depends(get_current_user)):
    _vehicle_owned(db, current_user.UserID, payload.vehicle_id)
    # Mobile clients commonly send an ISO timestamp with a timezone (UTC `Z`).
    # SQL Server/SQLite models currently store naive local datetimes, so normalize it.
    arrival_time = payload.arrival_time
    if arrival_time.tzinfo is not None:
        arrival_time = arrival_time.astimezone().replace(tzinfo=None)
    if arrival_time < _now() - timedelta(minutes=1):
        raise HTTPException(status_code=400, detail="Thời gian đến phải ở tương lai")
    slot = db.query(ParkingSlot).filter(ParkingSlot.SlotID == payload.slot_id,
        ParkingSlot.FloorID == payload.floor_id, ParkingSlot.SlotStatus == "Empty",
        ParkingSlot.IsActive == True).first()
    if not slot:
        raise HTTPException(status_code=409, detail="Vị trí vừa được đặt hoặc không khả dụng")
    vehicle = db.query(Vehicle).filter(Vehicle.VehicleID == payload.vehicle_id).first()
    if slot.VehicleTypeID != vehicle.VehicleTypeID:
        raise HTTPException(status_code=400, detail="Vị trí không phù hợp loại phương tiện")
    vehicle_type = vehicle.VehicleType
    fee = max(Decimal("5000"), Decimal(str(vehicle_type.HourlyPrice or 0)) / Decimal("2"))
    code = f"BK{_now():%y%m%d}{secrets.token_hex(3).upper()}"
    qr = hashlib.sha256(f"{code}:{current_user.UserID}:{secrets.token_urlsafe(16)}".encode()).hexdigest()
    booking = Booking(BookingCode=code, UserID=current_user.UserID, VehicleID=payload.vehicle_id,
        BuildingID=payload.building_id, FloorID=payload.floor_id, SlotID=payload.slot_id,
        ArrivalTime=arrival_time, ExpiresAt=arrival_time + timedelta(minutes=30),
        BookingFee=fee, PaymentMethod=payload.payment_method, PaymentStatus="Paid",
        BookingStatus="Confirmed", QRToken=qr, CreatedAt=_now())
    slot.SlotStatus = "Reserved"
    db.add(booking); db.flush()
    db.add(Notification(UserID=current_user.UserID, Title="Đặt chỗ thành công",
        Message=f"Mã {code} - vị trí {slot.SlotCode}", NotificationType="Booking", CreatedAt=_now()))
    db.commit(); db.refresh(booking)
    return _booking_payload(booking)


@router.get("/bookings")
def bookings(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    items = db.query(Booking).filter(Booking.UserID == current_user.UserID).order_by(Booking.CreatedAt.desc()).all()
    return [_booking_payload(x) for x in items]


@router.get("/bookings/{booking_id}")
def booking_detail(booking_id: int, db: Session = Depends(get_db),
                   current_user: User = Depends(get_current_user)):
    item = db.query(Booking).filter(Booking.BookingID == booking_id,
                                    Booking.UserID == current_user.UserID).first()
    if not item:
        raise HTTPException(status_code=404, detail="Không tìm thấy đặt chỗ")
    return _booking_payload(item)


@router.post("/bookings/{booking_id}/cancel")
def cancel_booking(booking_id: int, db: Session = Depends(get_db),
                   current_user: User = Depends(get_current_user)):
    item = db.query(Booking).filter(Booking.BookingID == booking_id,
        Booking.UserID == current_user.UserID, Booking.BookingStatus == "Confirmed").first()
    if not item:
        raise HTTPException(status_code=404, detail="Không tìm thấy đặt chỗ đang hoạt động")
    item.BookingStatus = "Cancelled"; item.Slot.SlotStatus = "Empty"
    db.commit()
    return {"message": "Đã hủy đặt chỗ"}


@router.get("/active-session")
def active_session(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    vehicle_ids = [x.VehicleID for x in db.query(DriverVehicle).filter(
        DriverVehicle.UserID == current_user.UserID).all()]
    session = db.query(ParkingSession).filter(ParkingSession.VehicleID.in_(vehicle_ids),
        ParkingSession.SessionStatus.in_(["Đang gửi", "Active"])).order_by(ParkingSession.EntryTime.desc()).first()
    if not session:
        return None
    elapsed = max(0, (_now() - session.EntryTime).total_seconds())
    hours = max(1, int((elapsed + 3599) // 3600))
    estimate = Decimal(str(session.Vehicle.VehicleType.HourlyPrice or 0)) * hours
    return {"session_id": session.SessionID, "plate_number": session.Vehicle.PlateNumber,
            "slot_code": session.Slot.SlotCode, "floor_name": session.Slot.Floor.FloorName,
            "entry_time": session.EntryTime, "duration_seconds": int(elapsed),
            "estimated_amount": float(estimate), "payment_status": session.PaymentStatus,
            "session_status": session.SessionStatus,
            "qr_token": hashlib.sha256(f"SESSION:{session.SessionID}:{current_user.UserID}".encode()).hexdigest()}


@router.post("/active-session/{session_id}/pay")
def pay_session(session_id: int, payload: PaymentRequest, db: Session = Depends(get_db),
                current_user: User = Depends(get_current_user)):
    _vehicle_ids = [x.VehicleID for x in db.query(DriverVehicle).filter_by(UserID=current_user.UserID).all()]
    session = db.query(ParkingSession).filter(ParkingSession.SessionID == session_id,
                                               ParkingSession.VehicleID.in_(_vehicle_ids)).first()
    if not session:
        raise HTTPException(status_code=404, detail="Không tìm thấy lượt gửi xe")
    amount = Decimal(str(active_session(db, current_user)["estimated_amount"]))
    payment = Payment(SessionID=session.SessionID, Amount=amount, PaymentMethod=payload.payment_method,
                      PaymentTime=_now(), TransactionCode=f"TX{secrets.token_hex(5).upper()}",
                      PaymentStatus="Paid")
    session.TotalAmount = amount; session.PaymentStatus = "Paid"
    db.add(payment); db.commit()
    return {"message": "Thanh toán thành công", "amount": float(amount),
            "grace_period_minutes": 15, "transaction_code": payment.TransactionCode}


@router.get("/history")
def history(history_status: str = "completed", db: Session = Depends(get_db),
            current_user: User = Depends(get_current_user)):
    vehicle_ids = [x.VehicleID for x in db.query(DriverVehicle).filter_by(UserID=current_user.UserID).all()]
    sessions = db.query(ParkingSession).filter(ParkingSession.VehicleID.in_(vehicle_ids)).order_by(
        ParkingSession.EntryTime.desc()).all()
    session_items = [{"type": "parking", "id": x.SessionID, "plate_number": x.Vehicle.PlateNumber,
                      "building_name": x.Slot.Floor.Building.BuildingName if hasattr(x.Slot.Floor, "Building") else "Bãi xe",
                      "started_at": x.EntryTime, "ended_at": x.ExitTime,
                      "amount": float(x.TotalAmount or 0), "status": x.SessionStatus} for x in sessions]
    booking_items = [_booking_payload(x) for x in db.query(Booking).filter(
        Booking.UserID == current_user.UserID,
        Booking.BookingStatus == ("Cancelled" if history_status == "cancelled" else "Completed")).all()]
    return {"parking_sessions": session_items, "bookings": booking_items}


@router.get("/monthly-passes")
def monthly_passes(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    items = db.query(MonthlyPass).filter(MonthlyPass.UserID == current_user.UserID).all()
    return [{"monthly_pass_id": x.MonthlyPassID, "pass_code": x.PassCode,
             "vehicle_id": x.VehicleID, "building_id": x.BuildingID,
             "plate_number": x.Vehicle.PlateNumber, "building_name": x.Building.BuildingName,
             "start_date": x.StartDate, "end_date": x.EndDate, "amount": float(x.Amount),
             "status": "Expired" if x.EndDate < _now() else x.Status} for x in items]


@router.post("/monthly-passes", status_code=201)
def buy_monthly_pass(payload: MonthlyPassCreate, db: Session = Depends(get_db),
                     current_user: User = Depends(get_current_user)):
    _vehicle_owned(db, current_user.UserID, payload.vehicle_id)
    vehicle = db.query(Vehicle).filter_by(VehicleID=payload.vehicle_id).first()
    amount = Decimal(str(vehicle.VehicleType.DailyPrice or 0)) * Decimal("20") * payload.months
    start = _now(); end = start + timedelta(days=30 * payload.months)
    item = MonthlyPass(PassCode=f"MP{secrets.token_hex(5).upper()}", UserID=current_user.UserID,
        VehicleID=payload.vehicle_id, BuildingID=payload.building_id, StartDate=start, EndDate=end,
        Amount=amount, Status="Active", CreatedAt=start)
    db.add(item); db.commit(); db.refresh(item)
    return {"message": "Mua vé tháng thành công", "monthly_pass_id": item.MonthlyPassID,
            "pass_code": item.PassCode, "amount": float(amount), "end_date": end}


@router.post("/monthly-passes/{monthly_pass_id}/renew")
def renew_monthly_pass(monthly_pass_id: int, payload: MonthlyPassCreate,
                       db: Session = Depends(get_db),
                       current_user: User = Depends(get_current_user)):
    item = db.query(MonthlyPass).filter(
        MonthlyPass.MonthlyPassID == monthly_pass_id,
        MonthlyPass.UserID == current_user.UserID,
    ).first()
    if not item:
        raise HTTPException(status_code=404, detail="Không tìm thấy vé tháng")
    months = payload.months
    base_date = item.EndDate if item.EndDate > _now() else _now()
    vehicle = db.query(Vehicle).filter(Vehicle.VehicleID == item.VehicleID).first()
    added_amount = Decimal(str(vehicle.VehicleType.DailyPrice or 0)) * Decimal("20") * months
    item.EndDate = base_date + timedelta(days=30 * months)
    item.Amount = Decimal(str(item.Amount or 0)) + added_amount
    item.Status = "Active"
    db.add(Notification(UserID=current_user.UserID, Title="Gia hạn vé tháng thành công",
        Message=f"Vé {item.PassCode} có hạn đến {item.EndDate:%d/%m/%Y}.",
        NotificationType="MonthlyPass", CreatedAt=_now()))
    db.commit()
    return {"message": "Gia hạn vé tháng thành công", "monthly_pass_id": item.MonthlyPassID,
            "amount": float(added_amount), "end_date": item.EndDate}


@router.post("/incidents", status_code=201)
def report_incident(payload: IncidentCreate, db: Session = Depends(get_db),
                    current_user: User = Depends(get_current_user)):
    item = IncidentReport(UserID=current_user.UserID, IncidentType=payload.incident_type,
        Description=payload.description, ImageUrl=payload.image_url, Status="Submitted",
        CreatedAt=_now(), UpdatedAt=_now())
    db.add(item); db.flush()
    db.add(Notification(UserID=current_user.UserID, Title="Đã tiếp nhận báo cáo",
        Message=f"Báo cáo #{item.IncidentID} đang chờ xử lý.", NotificationType="Incident", CreatedAt=_now()))
    db.commit()
    return {"message": "Gửi báo cáo thành công", "incident_id": item.IncidentID, "status": item.Status}


@router.get("/incidents")
def incidents(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    items = db.query(IncidentReport).filter_by(UserID=current_user.UserID).order_by(
        IncidentReport.CreatedAt.desc()).all()
    return [{"incident_id": x.IncidentID, "incident_type": x.IncidentType,
             "description": x.Description, "image_url": x.ImageUrl, "status": x.Status,
             "manager_response": x.ManagerResponse, "created_at": x.CreatedAt} for x in items]


@router.get("/notifications")
def notifications(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    items = db.query(Notification).filter_by(UserID=current_user.UserID).order_by(
        Notification.CreatedAt.desc()).all()
    return [{"notification_id": x.NotificationID, "title": x.Title, "message": x.Message,
             "type": x.NotificationType, "is_read": x.IsRead, "created_at": x.CreatedAt} for x in items]


@router.put("/notifications/{notification_id}/read")
def read_notification(notification_id: int, db: Session = Depends(get_db),
                      current_user: User = Depends(get_current_user)):
    item = db.query(Notification).filter_by(NotificationID=notification_id,
                                             UserID=current_user.UserID).first()
    if not item:
        raise HTTPException(status_code=404, detail="Không tìm thấy thông báo")
    item.IsRead = True; db.commit()
    return {"message": "Đã đọc"}
