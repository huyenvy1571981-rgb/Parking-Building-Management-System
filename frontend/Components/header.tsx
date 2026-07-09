"use client";

import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header
      className="
        h-[88px]
        bg-white
        border-b
        border-[#ECEEF5]
        px-8
        flex
        items-center
        justify-between
        sticky
        top-0
        z-30
      "
    >
      {/* Search */}

      <div className="relative w-[420px]">

        <Search
          size={20}
          className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-gray-400
            pointer-events-none
          "
        />

        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="
            w-full
            h-[50px]
            pl-14
            pr-5
            rounded-2xl
            border
            border-[#E5E7EB]
            bg-white
            text-[15px]
            outline-none
            focus:border-[#6246EA]
            focus:ring-4
            focus:ring-[#6246EA]/10
          "
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-8">

        {/* Notification */}

        <button
          className="
            relative
            w-12
            h-12
            rounded-full
            bg-[#F8F8FC]
            flex
            items-center
            justify-center
            hover:bg-[#F1EEFF]
            transition
          "
        >
          <Bell
            size={21}
            className="text-[#4B5563]"
          />

          <span
            className="
              absolute
              top-3
              right-3
              w-2.5
              h-2.5
              rounded-full
              bg-red-500
            "
          />
        </button>

        {/* User */}

        <div className="flex items-center gap-4">

          <div
            className="
              w-12
              h-12
              rounded-full
              bg-[#6246EA]
              text-white
              flex
              items-center
              justify-center
              text-lg
              font-bold
              shadow-lg
            "
          >
            A
          </div>

          <div>

            <h3 className="font-bold text-[18px] text-[#151930]">
              Administrator
            </h3>

            <p className="text-sm text-gray-500">
              Quản trị viên
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}