"use client";

import { useState } from "react";

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";
import PricingCard from "@/Components/PricingCard";

export default function PricingPage() {
  const [tab, setTab] = useState("hour");

  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Sidebar />

      <main className="flex-1 p-7">
        <Header />

        <div className="mt-8">
          <h1 className="text-4xl font-bold">Quản lý bảng giá</h1>

          <p className="text-gray-500 mt-2">
            Thiết lập và quản lý chính sách giá dịch vụ gửi xe.
          </p>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm mt-8">
            <div className="flex border-b">
              <button
                onClick={() => setTab("hour")}
                className={`px-8 py-5 font-semibold border-b-2 ${
                  tab === "hour"
                    ? "border-[#6246EA] text-[#6246EA]"
                    : "border-transparent text-gray-500"
                }`}
              >
                Giá theo lượt/giờ
              </button>

              <button
                onClick={() => setTab("month")}
                className={`px-8 py-5 font-semibold border-b-2 ${
                  tab === "month"
                    ? "border-[#6246EA] text-[#6246EA]"
                    : "border-transparent text-gray-500"
                }`}
              >
                Giá vé tháng
              </button>
            </div>

            <div className="p-6">
              <PricingCard vehicle="Ô tô" />

              <PricingCard vehicle="Xe máy" />

              <div className="flex justify-end mt-8">
                <button className="bg-[#6246EA] hover:bg-[#5236d8] text-white px-8 py-3 rounded-xl">
                  Lưu bảng giá
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
