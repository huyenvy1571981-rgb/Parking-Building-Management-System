"use client";

import { LogOut } from "lucide-react";

type Props = {
  vehicle: any;
  parkingSession: any;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ConfirmExitButton({
  vehicle,
  parkingSession,
  reload,
  setReload,
}: Props) {

  const handleExit = async () => {

    if (!vehicle) {
      alert("Chưa tìm thấy xe.");
      return;
    }

    if (!parkingSession) {
      alert("Không tìm thấy phiên gửi xe.");
      return;
    }

    try {

      const token = localStorage.getItem("token");

      // ==========================
      // Tính tiền (demo)
      // ==========================

      const entry = new Date(parkingSession.EntryTime);

      const exit = new Date();

      const hours = Math.ceil(
        (exit.getTime() - entry.getTime()) /
        (1000 * 60 * 60)
      );

      const amount = hours * 10000;

      // ==========================
      // 1. Tạo Payment
      // ==========================

      const paymentRes = await fetch(
        "http://127.0.0.1:8000/payments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            SessionID: parkingSession.SessionID,
            Amount: amount,
            PaymentMethod: "Tiền mặt",
            PaymentTime: new Date().toISOString(),
            TransactionCode: `PAY${Date.now()}`,
            PaymentStatus: "Paid",
          }),
        }
      );

      if (!paymentRes.ok) {
        throw new Error("Không tạo được Payment");
      }

      // ==========================
      // 2. Update Parking Session
      // ==========================

      const sessionBody = {
        VehicleID: parkingSession.VehicleID,
        SlotID: parkingSession.SlotID,
        EntryTime: parkingSession.EntryTime,
        ExitTime: new Date().toISOString(),
        PaymentStatus: "Paid",
        TotalAmount: amount,
        SessionStatus: "Hoàn thành",
      };

      const sessionRes = await fetch(
        `http://127.0.0.1:8000/parking-sessions/${parkingSession.SessionID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(sessionBody),
        }
      );

      if (!sessionRes.ok) {
        throw new Error("Không cập nhật được Parking Session");
      }

      // ==========================
      // 3. Lấy thông tin Slot
      // ==========================

      const slotRes = await fetch(
        `http://127.0.0.1:8000/parking-slots/${parkingSession.SlotID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const slot = await slotRes.json();

      // ==========================
      // 4. Cập nhật Slot = Empty
      // ==========================

      const slotBody = {
        FloorID: slot.FloorID,
        VehicleTypeID: slot.VehicleTypeID,
        SlotCode: slot.SlotCode,
        SlotStatus: "Empty",
        IsActive: slot.IsActive,
      };

      const updateSlot = await fetch(
        `http://127.0.0.1:8000/parking-slots/${slot.SlotID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(slotBody),
        }
      );

      if (!updateSlot.ok) {
        throw new Error("Không cập nhật được Parking Slot");
      }

      alert("Xe đã ra bãi thành công.");

      setReload(!reload);

    } catch (err) {

      console.error(err);

      alert("Có lỗi xảy ra.");

    }

  };

  return (

    <button
      onClick={handleExit}
      className="
        w-full
        mt-8
        bg-red-600
        hover:bg-red-700
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

      <LogOut size={50} />

      <div className="text-center">

        <h2 className="text-3xl font-bold">
          XÁC NHẬN RA BÃI
        </h2>

        <p className="text-xl mt-1">
          Thanh toán & Hoàn tất
        </p>

      </div>

    </button>

  );

  }