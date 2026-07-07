"use client";

import { CreditCard, BadgeAlert, WifiOff, ChevronDown } from "lucide-react";

export default function IncidentType() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-3xl font-bold mb-6">1. Chọn loại sự cố</h2>

      <label className="block text-lg font-medium mb-3">Loại sự cố</label>

      <div className="relative">
        <select
          className="
            w-full
            h-14
            rounded-2xl
            border
            border-[#6246EA]
            px-5
            appearance-none
            outline-none
          "
        >
          <option>Chọn loại sự cố</option>
          <option>Mất thẻ</option>
          <option>Sai biển số</option>
          <option>Mất mạng</option>
        </select>

        <ChevronDown
          size={22}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>

      <div className="mt-5 rounded-2xl border border-gray-200 divide-y">
        <div className="flex items-center gap-4 p-5">
          <CreditCard className="text-[#6246EA]" size={28} />
          <span className="text-lg">Mất thẻ</span>
        </div>

        <div className="flex items-center gap-4 p-5">
          <BadgeAlert className="text-orange-500" size={28} />
          <span className="text-lg">Sai biển số</span>
        </div>

        <div className="flex items-center gap-4 p-5">
          <WifiOff className="text-red-500" size={28} />
          <span className="text-lg">Mất mạng</span>
        </div>
      </div>
    </div>
  );
}
