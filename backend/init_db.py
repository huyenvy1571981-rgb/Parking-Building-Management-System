"""Create tables that do not exist yet without deleting or altering existing data."""

from app.database import Base, engine
from app.models import mobile  # noqa: F401
from app.models.building import Building  # noqa: F401
from app.models.floor import Floor  # noqa: F401
from app.models.parking_session import ParkingSession  # noqa: F401
from app.models.parking_slot import ParkingSlot  # noqa: F401
from app.models.payment import Payment  # noqa: F401
from app.models.role import Role  # noqa: F401
from app.models.user import User  # noqa: F401
from app.models.vehicle import Vehicle  # noqa: F401
from app.models.vehicle_type import VehicleType  # noqa: F401


if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    print("Database tables are ready.")
