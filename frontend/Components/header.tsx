"use client";

import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="h-24 bg-white border-b px-8 flex items-center justify-between">
      <div className="relative w-[360px]">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          placeholder="Tìm kiếm..."
          className="w-full rounded-xl border border-gray-200 pl-11 pr-4 py-3 outline-none focus:border-[#6246EA]"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#6246EA] text-white flex items-center justify-center font-bold">
            A
          </div>

          <div>
            <p className="font-semibold">Administrator</p>
            <p className="text-xs text-gray-500">Quản trị viên</p>
          </div>
        </div>
      </div>
    </header>
  );
}
