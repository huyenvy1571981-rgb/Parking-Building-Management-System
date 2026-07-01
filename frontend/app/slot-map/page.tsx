"use client";

import { useState } from "react";

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";
import SlotBox from "@/Components/SlotBox";
import SlotInfoPopup from "@/Components/SlotInfoPopup";

export default function SlotMapPage() {
  const [open, setOpen] = useState(false);

  const columns = ["A", "B", "C", "D", "E", "F"];

  const status = [
    "empty",
    "empty",
    "occupied",
    "empty",
    "reserved",
    "empty",
    "empty",
    "maintenance",
  ] as const;

  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Sidebar />

      <main className="flex-1 p-7">
        <Header />

        <div className="mt-8">
          <h1 className="text-4xl font-bold">Sơ đồ Slot trực quan</h1>

          <p className="text-gray-500 mt-2">
            Theo dõi tình trạng sử dụng chỗ đỗ xe theo thời gian thực.
          </p>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm mt-8 p-6">
            <div className="flex gap-4 mb-6">
              <select className="border rounded-xl px-4 py-3 w-52">
                <option>Tầng 1</option>
                <option>Tầng 2</option>
                <option>Hầm B1</option>
              </select>

              <input
                placeholder="Tìm kiếm Slot..."
                className="flex-1 border rounded-xl px-4 py-3"
              />
            </div>

            <div className="flex gap-3 mb-8">
              <span className="px-4 py-2 rounded-lg bg-green-100 text-green-700">
                🟢 Trống
              </span>

              <span className="px-4 py-2 rounded-lg bg-red-100 text-red-600">
                🔴 Có xe
              </span>

              <span className="px-4 py-2 rounded-lg bg-blue-100 text-blue-600">
                🔵 Đặt trước
              </span>

              <span className="px-4 py-2 rounded-lg bg-yellow-100 text-yellow-700">
                🟡 Bảo trì
              </span>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[980px]">
                <div className="grid grid-cols-6 gap-6 mb-4">
                  {columns.map((col) => (
                    <h2
                      key={col}
                      className="text-center text-xl font-bold text-gray-700"
                    >
                      {col}
                    </h2>
                  ))}
                </div>

                <div className="grid grid-cols-6 gap-6">
                  {columns.map((col) => (
                    <div key={col} className="space-y-3">
                      {status.map((s, index) => (
                        <SlotBox
                          key={index}
                          code={`${col}-${String(index + 1).padStart(2, "0")}`}
                          status={s}
                          onClick={() => setOpen(true)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <SlotInfoPopup open={open} onClose={() => setOpen(false)} />
          </div>
        </div>
      </main>
    </div>
  );
}
