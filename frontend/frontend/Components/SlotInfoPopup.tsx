"use client";

import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SlotInfoPopup({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[420px] bg-white rounded-3xl shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Thông tin Slot</h2>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Mã Slot</span>
            <span className="font-semibold">D-02</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Biển số</span>
            <span className="font-semibold">30A-123.45</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Giờ vào</span>
            <span className="font-semibold">08:15 - 12/05/2024</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Loại xe</span>
            <span className="font-semibold">Ô tô</span>
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
