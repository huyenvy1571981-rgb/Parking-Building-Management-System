"use client";

import { X, CarFront } from "lucide-react";

export default function SlotInfoPopup({
  open,
  onClose,
  slot,
}: {
  open: boolean;
  onClose: () => void;
  slot: any;
}) {
  if (!open || !slot) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-5"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[460px] bg-white rounded-3xl shadow-xl p-7"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Thông tin Parking Slot</h2>
          <button onClick={onClose}>
            <X size={21} />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <Row label="Mã Slot" value={slot.SlotCode} />
          <Row label="Tầng" value={slot.FloorName} />
          <Row label="Loại xe" value={slot.VehicleTypeName} />
          <Row label="Trạng thái" value={slot.SlotStatus} />
          <Row
            label="Hoạt động"
            value={slot.IsActive ? "Active" : "Inactive"}
          />

          <div className="rounded-2xl bg-violet-50 p-4 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-white text-[#6D5DF6] grid place-items-center">
              <CarFront size={21} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Biển số đang đỗ</p>
              <p className="mt-1 text-lg font-bold text-[#6D5DF6]">
                {slot.CurrentPlateNumber || "Không có xe"}
              </p>
              {slot.CurrentEntryTime && (
                <p className="mt-1 text-xs text-gray-500">
                  Vào lúc {new Date(slot.CurrentEntryTime).toLocaleString("vi-VN")}
                </p>
              )}
            </div>
          </div>

          <Row
            label="Ngày tạo"
            value={new Date(slot.CreatedAt).toLocaleString("vi-VN")}
          />
        </div>

        <button
          onClick={onClose}
          className="mt-7 w-full py-3 rounded-xl bg-[#6D5DF6] text-white hover:bg-[#5B4BE5]"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between gap-5">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-right">{value || "—"}</span>
    </div>
  );
}