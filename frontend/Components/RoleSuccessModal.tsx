"use client";

import { Check } from "lucide-react";

export default function RoleSuccessModal() {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-[420px] p-10 text-center shadow-xl">
        <div
          className="
            w-24
            h-24
            rounded-full
            bg-green-100
            mx-auto
            flex
            items-center
            justify-center
            mb-6
          "
        >
          <Check size={52} className="text-green-600" />
        </div>

        <h2 className="text-3xl font-bold mb-3">Tạo vai trò thành công!</h2>

        <p className="text-gray-500 mb-8">
          Vai trò "Thu ngân" đã được tạo thành công.
        </p>

        <button
          className="
            bg-[#6246EA]
            text-white
            px-8
            py-3
            rounded-xl
          "
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
