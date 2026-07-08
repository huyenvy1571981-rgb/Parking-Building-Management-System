"use client";

import { Search, ScanLine } from "lucide-react";

export default function ExitSearch() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
      <label className="block text-lg font-semibold mb-4">
        Tìm kiếm vé / biển số
      </label>

      <div className="flex gap-5">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Quét mã vạch vé hoặc nhập biển số xe"
            className="w-full h-14 rounded-2xl border border-gray-200 px-5 pr-14 outline-none focus:border-[#6246EA]"
          />

          <ScanLine
            size={24}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>

        <button
          className="
            h-14
            px-10
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
          <Search size={22} />
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}
