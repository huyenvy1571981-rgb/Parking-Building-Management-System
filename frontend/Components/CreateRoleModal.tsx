"use client";

import { X } from "lucide-react";

export default function CreateRoleModal() {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[560px] rounded-3xl p-8 shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Tạo vai trò mới</h2>

          <button>
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="font-medium">Tên vai trò *</label>

            <input
              className="w-full mt-2 h-12 rounded-xl border border-gray-200 px-4"
              defaultValue="Thu ngân"
            />
          </div>

          <div>
            <label className="font-medium">Mô tả</label>

            <textarea
              rows={4}
              className="w-full mt-2 rounded-xl border border-gray-200 p-4 resize-none"
              defaultValue="Vai trò dành cho nhân viên thu ngân tại quầy."
            />
          </div>

          <div>
            <label className="font-medium">Ghi chú</label>

            <textarea
              rows={3}
              className="w-full mt-2 rounded-xl border border-gray-200 p-4 resize-none"
              defaultValue="Vai trò chỉ xử lý thanh toán và xem thông tin xe."
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button className="px-6 py-3 border rounded-xl">Hủy bỏ</button>

          <button className="px-6 py-3 rounded-xl bg-[#6246EA] text-white">
            Tạo vai trò
          </button>
        </div>
      </div>
    </div>
  );
}
