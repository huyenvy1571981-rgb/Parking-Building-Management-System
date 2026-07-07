"use client";

import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AddFloorModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-[700px] p-8 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-500 hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-3xl font-bold">Thêm tầng mới</h2>

        <div className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Tên tầng *</label>

            <input
              type="text"
              placeholder="Ví dụ: Tầng 4"
              className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6246EA]"
            />
          </div>

          <div>
            <label className="font-medium">Tổng số Slot *</label>

            <input
              type="number"
              placeholder="250"
              className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6246EA]"
            />
          </div>
          <div>
            <label className="font-medium">Loại xe cho phép *</label>

            <select className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6246EA]">
              <option>Ô tô & Xe máy</option>
              <option>Ô tô</option>
              <option>Xe máy</option>
            </select>
          </div>

          <div>
            <label className="font-medium">Trạng thái *</label>

            <select className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6246EA]">
              <option>Đang hoạt động</option>
              <option>Bảo trì</option>
            </select>
          </div>

          <div>
            <label className="font-medium">Ghi chú</label>

            <textarea
              rows={4}
              placeholder="Nhập ghi chú..."
              className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:border-[#6246EA] resize-none"
            />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
          >
            Hủy
          </button>

          <button
            onClick={() => {
              alert("Thêm tầng thành công!");
              onClose();
            }}
            className="px-6 py-3 rounded-xl bg-[#6246EA] text-white hover:bg-[#5337d8]"
          >
            Thêm tầng
          </button>
        </div>
      </div>
    </div>
  );
}
