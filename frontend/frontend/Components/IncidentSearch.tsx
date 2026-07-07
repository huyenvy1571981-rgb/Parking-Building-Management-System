"use client";

import { Search, Eye, CarFront } from "lucide-react";

export default function IncidentSearch() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-3xl font-bold mb-6">2. Tìm kiếm xe trong hệ thống</h2>

      <label className="block text-lg font-medium mb-3">
        Nhập biển số xe để tìm lại thông tin
      </label>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Nhập biển số xe (VD: 30A-123.45)"
          className="flex-1 h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:border-[#6246EA]"
        />

        <button
          className="
            h-14
            px-8
            rounded-2xl
            bg-[#6246EA]
            hover:bg-[#5337d8]
            text-white
            flex
            items-center
            gap-3
            transition
          "
        >
          <Search size={20} />
          Tìm kiếm
        </button>
      </div>

      {/* Kết quả */}

      <div className="mt-8 rounded-2xl border border-gray-200 p-6">
        <div className="grid grid-cols-5 gap-6 items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#F2EEFF] flex items-center justify-center">
              <CarFront size={28} className="text-[#6246EA]" />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Biển số xe</p>

              <h3 className="text-3xl font-bold">30A-123.45</h3>
            </div>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Loại xe</p>

            <div className="flex items-center gap-2 mt-1">
              <CarFront size={18} />Ô tô
            </div>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Giờ vào</p>

            <p className="font-semibold mt-1">20/05/2024 - 09:42:18</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Vị trí vào</p>

            <p className="font-semibold mt-1">Tầng 2 - B02</p>
          </div>

          <button className="flex items-center gap-2 text-[#6246EA] font-semibold justify-end">
            <Eye size={18} />
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}
