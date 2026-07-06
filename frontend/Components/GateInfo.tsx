"use client";

import { Clock3, DoorOpen } from "lucide-react";

export default function GateInfo() {
  return (
    <div className="grid grid-cols-2 gap-6 mt-8">
      {/* Cổng */}

      <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-[#F2EEFF] flex items-center justify-center">
          <DoorOpen className="text-[#6246EA]" size={30} />
        </div>

        <div>
          <p className="text-gray-500 font-medium">Cổng số</p>

          <h2 className="text-5xl font-bold">#1</h2>
        </div>
      </div>

      {/* Giờ */}

      <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <Clock3 className="text-green-600" size={30} />
        </div>

        <div>
          <p className="text-gray-500 font-medium">Giờ vào</p>

          <h2 className="text-4xl font-bold">09:42:18</h2>

          <p className="text-gray-500 mt-1">20/05/2024</p>
        </div>
      </div>
    </div>
  );
}
