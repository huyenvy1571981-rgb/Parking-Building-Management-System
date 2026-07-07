"use client";

import { useState } from "react";

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";
import FloorStatCard from "@/Components/FloorStatCard";
import AddFloorModal from "@/Components/AddFloorModal";

export default function BuildingPage() {
  const [openModal, setOpenModal] = useState(false);

  const floors = [
    {
      id: 1,
      name: "Hầm B2",
      type: "Tầng hầm",
      slot: 250,
      vehicle: "Ô tô, Xe máy",
      status: "Đang hoạt động",
      note: "Khu vực gửi xe dài hạn",
    },
    {
      id: 2,
      name: "Hầm B1",
      type: "Tầng hầm",
      slot: 300,
      vehicle: "Ô tô, Xe máy",
      status: "Đang hoạt động",
      note: "Khu vực gửi xe ngắn hạn",
    },
    {
      id: 3,
      name: "Tầng 1",
      type: "Tầng nổi",
      slot: 250,
      vehicle: "Ô tô",
      status: "Đang hoạt động",
      note: "Khu vực trung tâm thương mại",
    },
    {
      id: 4,
      name: "Tầng 2",
      type: "Tầng nổi",
      slot: 200,
      vehicle: "Ô tô",
      status: "Bảo trì",
      note: "Bảo trì hệ thống PCCC",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Sidebar />

      <main className="flex-1 p-7">
        <Header />

        <div className="mt-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Quản lý tòa nhà & tầng</h1>

              <p className="text-gray-500 mt-2">
                Quản lý cấu trúc các tầng trong bãi giữ xe.
              </p>
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="bg-[#6246EA] hover:bg-[#5236d8] text-white px-6 py-3 rounded-xl"
            >
              + Thêm tầng
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6 mt-8">
            <FloorStatCard
              title="Tổng số tầng"
              value="4"
              unit="Tầng"
              color="text-black"
            />

            <FloorStatCard
              title="Tổng Slot"
              value="1000"
              unit="Slot"
              color="text-black"
            />

            <FloorStatCard
              title="Đang hoạt động"
              value="3"
              unit="Tầng"
              color="text-green-600"
            />

            <FloorStatCard
              title="Bảo trì"
              value="1"
              unit="Tầng"
              color="text-red-500"
            />
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 mt-8 p-6">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <input
                type="text"
                placeholder="🔍 Tìm kiếm tầng..."
                className="col-span-2 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#6246EA]"
              />

              <select className="border border-gray-300 rounded-xl px-4 py-3">
                <option>Tất cả loại xe</option>
                <option>Ô tô</option>
                <option>Xe máy</option>
              </select>

              <select className="border border-gray-300 rounded-xl px-4 py-3">
                <option>Tất cả trạng thái</option>
                <option>Đang hoạt động</option>
                <option>Bảo trì</option>
              </select>
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="py-4">Tên tầng</th>

                  <th>Tổng Slot</th>

                  <th>Loại xe</th>

                  <th>Trạng thái</th>

                  <th>Ghi chú</th>

                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {floors.map((floor) => (
                  <tr key={floor.id} className="border-b hover:bg-gray-50">
                    <td className="py-5">
                      <p className="font-semibold">{floor.name}</p>

                      <p className="text-sm text-gray-500">{floor.type}</p>
                    </td>

                    <td>{floor.slot}</td>

                    <td>
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm">
                        {floor.vehicle}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          floor.status === "Đang hoạt động"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {floor.status}
                      </span>
                    </td>

                    <td className="text-gray-600">{floor.note}</td>

                    <td>
                      <div className="flex justify-center gap-3">
                        <button className="w-9 h-9 rounded-lg bg-blue-100 hover:bg-blue-200 transition">
                          ✏️
                        </button>

                        <button className="w-9 h-9 rounded-lg bg-red-100 hover:bg-red-200 transition">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between mt-6">
              <p className="text-gray-500 text-sm">Hiển thị 1 - 4 / 4 tầng</p>

              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-xl border border-gray-300">
                  ‹
                </button>

                <button className="w-10 h-10 rounded-xl bg-[#6246EA] text-white">
                  1
                </button>

                <button className="w-10 h-10 rounded-xl border border-gray-300">
                  ›
                </button>
              </div>
            </div>
          </div>

          <AddFloorModal open={openModal} onClose={() => setOpenModal(false)} />
        </div>
      </main>
    </div>
  );
}
