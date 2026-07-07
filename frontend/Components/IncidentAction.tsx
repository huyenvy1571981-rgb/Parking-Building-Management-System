"use client";

import { FileText, DoorOpen } from "lucide-react";

export default function IncidentAction() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-3xl font-bold mb-8">4. Hành động</h2>

      <div className="grid grid-cols-2 gap-8">
        {/* Lập biên bản */}

        <button
          className="
            border-2
            border-orange-400
            rounded-3xl
            py-10
            hover:bg-orange-50
            transition
          "
        >
          <FileText size={52} className="mx-auto text-orange-500" />

          <h3 className="text-2xl font-bold text-orange-500 mt-5">
            LẬP BIÊN BẢN
          </h3>

          <p className="text-gray-500 mt-2">Tạo biên bản sự cố để lưu hồ sơ</p>
        </button>

        {/* Mở barrier */}

        <button
          className="
            rounded-3xl
            py-10
            bg-[#6246EA]
            hover:bg-[#5337d8]
            text-white
            transition
          "
        >
          <DoorOpen size={52} className="mx-auto" />

          <h3 className="text-2xl font-bold mt-5">MỞ CỔNG THỦ CÔNG</h3>

          <p className="mt-2 opacity-90">Mở barrier cho xe ra khỏi bãi</p>
        </button>
      </div>
    </div>
  );
}
