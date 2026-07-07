"use client";

import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  slot: any;
};

export default function SlotInfoPopup({
  open,
  onClose,
  slot,
}: Props) {
  if (!open || !slot) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[450px] bg-white rounded-3xl shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold mb-6">
          Thông tin Parking Slot
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span className="text-gray-500">Mã Slot</span>
            <span className="font-semibold">
              {slot.SlotCode}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Tầng</span>
            <span className="font-semibold">
              {slot.FloorName}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Loại xe</span>
            <span className="font-semibold">
              {slot.VehicleTypeName}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Trạng thái</span>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                slot.SlotStatus === "Empty"
                  ? "bg-green-100 text-green-700"
                  : slot.SlotStatus === "Occupied"
                  ? "bg-red-100 text-red-700"
                  : slot.SlotStatus === "Reserved"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {slot.SlotStatus}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Hoạt động</span>

            <span
              className={
                slot.IsActive
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {slot.IsActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Ngày tạo</span>

            <span className="font-semibold">
              {new Date(slot.CreatedAt).toLocaleString()}
            </span>
          </div>

        </div>

        <div className="mt-6 flex justify-center">
          <Image
            src="/car.png"
            alt="car"
            width={220}
            height={140}
            className="rounded-xl border"
          />
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl bg-[#6246EA] text-white hover:bg-[#5236d8]"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}