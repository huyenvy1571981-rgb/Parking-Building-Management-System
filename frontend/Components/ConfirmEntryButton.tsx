"use client";

import { LogIn } from "lucide-react";

type Props = {
  plateNumber: string;
  selectedSlot: any;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ConfirmEntryButton({
  plateNumber,
  selectedSlot,
  reload,
  setReload,
}: Props) {
  const handleEntry = async () => {
    if (!plateNumber.trim()) {
      alert("Vui lòng nhập biển số xe.");
      return;
    }

    if (!selectedSlot) {
      alert("Vui lòng chọn Parking Slot.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // ==========================
      // 1. Tìm Vehicle
      // ==========================

      const vehicleRes = await fetch(
        "http://127.0.0.1:8000/vehicles",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!vehicleRes.ok) {
        throw new Error("Không lấy được danh sách xe.");
      }

      const vehicles = await vehicleRes.json();

      const normalize = (text: string) =>
        text.replace(/[\s.-]/g, "").toUpperCase();

      let vehicle = vehicles.find(
        (v: any) =>
          normalize(v.PlateNumber) === normalize(plateNumber)
      );

      // ==========================
      // 2. Nếu chưa có -> tạo Vehicle
      // ==========================

      if (!vehicle) {
        const createVehicle = await fetch(
          "http://127.0.0.1:8000/vehicles",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              PlateNumber: plateNumber,
              OwnerName: "Khách vãng lai",
              PhoneNumber: "",
              VehicleTypeID: selectedSlot.VehicleTypeID,
            }),
          }
        );

        if (!createVehicle.ok) {
          throw new Error("Không tạo được Vehicle.");
        }

        vehicle = await createVehicle.json();
      }

      // ==========================
      // 3. Tạo Parking Session
      // ==========================
      console.log(vehicle);
      console.log(selectedSlot);
      const sessionRes = await fetch(
        "http://127.0.0.1:8000/parking-sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            VehicleID: vehicle.VehicleID,
            SlotID: selectedSlot.SlotID,
            EntryTime: new Date().toISOString(),
            ExitTime: null,
            PaymentStatus: "Unpaid",
            TotalAmount: 0,
            SessionStatus: "Đang gửi",
          }),
        }
      );

      if (!sessionRes.ok) {
        const error = await sessionRes.text();
        console.log("Create Session Error:", error);
        alert(error);
        return;
      }
      // ==========================
      // 4. Update Slot
      // ==========================

      const slotRes = await fetch(
        `http://127.0.0.1:8000/parking-slots/${selectedSlot.SlotID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            FloorID: selectedSlot.FloorID,
            VehicleTypeID: selectedSlot.VehicleTypeID,
            SlotCode: selectedSlot.SlotCode,
            SlotStatus: "Occupied",
            IsActive: selectedSlot.IsActive,
          }),
        }
      );

      if (!slotRes.ok) {
        const error = await slotRes.text();
        console.log("Update Slot Error:", error);
        alert(error);
        return;
      }
      alert("Xe đã vào bãi thành công.");

      setReload(!reload);

    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra.");
    }
  };

  return (
    <button
      onClick={handleEntry}
      className="
        w-full
        mt-8
        bg-green-600
        hover:bg-green-700
        text-white
        rounded-2xl
        py-5
        flex
        items-center
        justify-center
        gap-6
        transition
      "
    >
      <LogIn size={52} />

      <div className="text-center">
        <h2 className="text-3xl font-bold">
          XÁC NHẬN VÀO BÃI
        </h2>

        <p className="text-2xl mt-1">
          (Enter)
        </p>
      </div>
    </button>
  );
  }