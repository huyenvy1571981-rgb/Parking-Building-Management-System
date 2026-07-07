from pydantic import BaseModel


class RecentActivity(BaseModel):
    PlateNumber: str
    SlotCode: str
    EntryTime: str
    SessionStatus: str


class DashboardResponse(BaseModel):

    # Tổng quan
    TotalUsers: int
    TotalBuildings: int
    TotalFloors: int
    TotalParkingSlots: int
    TotalVehicles: int
    TotalParkingSessions: int
    TotalPayments: int

    # Phiên gửi xe
    VehiclesParking: int
    VehiclesCompleted: int

    # Doanh thu
    TodayRevenue: float
    TotalRevenue: float

    # Mới
    AvailableSlots: int
    OccupiedSlots: int
    ParkingRate: int

    Revenue7Days: list[float]

    RecentActivities: list[RecentActivity]