from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.role import router as role_router
from app.routers.user import router as user_router
from app.routers.building import router as building_router
from app.routers.floor import router as floor_router
from app.routers.parking_slot import router as parking_slot_router
from app.routers.vehicle_type import router as vehicle_type_router
from app.routers.vehicle import router as vehicle_router
from app.routers.parking_session import router as parking_session_router
from app.routers.payment import router as payment_router
from app.routers.dashboard import router as dashboard_router

app = FastAPI()

# ==========================
# CORS
# ==========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(role_router)
app.include_router(user_router)
app.include_router(building_router)
app.include_router(floor_router)
app.include_router(parking_slot_router)
app.include_router(vehicle_type_router)
app.include_router(vehicle_router)
app.include_router(parking_session_router)
app.include_router(payment_router)
app.include_router(dashboard_router)


@app.get("/")
def root():
    return {
        "message": "Parking Building Management System API"
    }