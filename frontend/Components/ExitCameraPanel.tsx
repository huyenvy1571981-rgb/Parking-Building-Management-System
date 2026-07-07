"use client";

import Image from "next/image";

type Props = {
  plateNumber: string;
  setPlateNumber: React.Dispatch<React.SetStateAction<string>>;
  setVehicle: React.Dispatch<React.SetStateAction<any>>;
  setParkingSession: React.Dispatch<React.SetStateAction<any>>;
};

export default function ExitCameraPanel({
  plateNumber,
  setPlateNumber,
  setVehicle,
  setParkingSession,
}: Props) {

  const handleSearch = async () => {

    try {

      const token = localStorage.getItem("token");

      // =========================
      // Lấy danh sách xe
      // =========================

      const vehicleRes = await fetch(
        "http://127.0.0.1:8000/vehicles",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const vehicles = await vehicleRes.json();

      const vehicle = vehicles.find(
        (v: any) =>
          v.PlateNumber.replace(/\s/g, "").toUpperCase() ===
          plateNumber.replace(/\s/g, "").toUpperCase()
      );

      if (!vehicle) {
        alert("Không tìm thấy xe.");
        return;
      }

      setVehicle(vehicle);

      // =========================
      // Lấy Parking Session
      // =========================

      const sessionRes = await fetch(
        "http://127.0.0.1:8000/parking-sessions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const sessions = await sessionRes.json();

      const session = sessions.find(
        (s: any) =>
          s.VehicleID === vehicle.VehicleID &&
          s.SessionStatus === "Đang gửi"
      );

      if (!session) {

        alert("Xe hiện không ở trong bãi.");

        setParkingSession(null);

        return;

      }

      setParkingSession(session);

      alert("Đã tìm thấy phiên gửi xe.");

    } catch (err) {

      console.error(err);

      alert("Có lỗi xảy ra.");

    }

  };

  return (

    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

      <h2 className="text-3xl font-bold">
        Hình ảnh camera
      </h2>

      {/* Biển số */}

      <div className="mt-6">

        <label className="font-semibold">
          Biển số xe
        </label>

        <input
          value={plateNumber}
          onChange={(e) =>
            setPlateNumber(e.target.value)
          }
          placeholder="Nhập biển số..."
          className="w-full border rounded-xl px-4 py-3 mt-2"
        />

        <button
          onClick={handleSearch}
          className="mt-4 w-full bg-[#6246EA] hover:bg-[#5337d8] text-white rounded-xl py-3"
        >
          Tìm xe
        </button>

      </div>

      {/* Camera */}

      <div className="mt-8">

        <h3 className="font-semibold mb-3">
          Ảnh toàn cảnh
        </h3>

        <Image
          src="/car.png"
          alt="Car"
          width={900}
          height={600}
          className="w-full h-[300px] object-cover rounded-xl border"
        />

      </div>

      <div className="mt-8">

        <h3 className="font-semibold mb-3">
          Ảnh biển số
        </h3>

        <Image
          src="/plate.png"
          alt="Plate"
          width={900}
          height={300}
          className="w-full h-[200px] object-cover rounded-xl border"
        />

      </div>

    </div>

  );

}