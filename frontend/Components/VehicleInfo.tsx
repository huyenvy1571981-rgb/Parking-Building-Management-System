"use client";

import { CarFront, Bike, CheckCircle2 } from "lucide-react";
import { useState } from "react";

type Props = {
  plateNumber: string;
};

export default function VehicleInfo({
  plateNumber,
}: Props) {

  const [vehicleType, setVehicleType] =
    useState("Ô tô");

  return (

    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7">

      <h2 className="text-3xl font-bold mb-8">
        Thông tin xử lý
      </h2>

      {/* Biển số */}

      <div>

        <label className="font-semibold text-gray-700">
          Biển số xe
        </label>

        <div className="mt-3 border rounded-2xl px-8 py-6 flex items-center justify-between">

          <h1 className="text-[58px] font-extrabold tracking-wider text-[#111827]">
            {plateNumber || "Chưa nhập"}
          </h1>

          <CheckCircle2
            size={46}
            className="text-green-500"
          />

        </div>

      </div>

      {/* Loại xe */}

      <div className="mt-8">

        <label className="font-semibold text-gray-700">
          Loại xe
        </label>

        <div className="space-y-5 mt-4">

          <label className="flex items-center gap-4 border rounded-2xl px-6 py-6 cursor-pointer">

            <input
              type="radio"
              name="vehicleType"
              checked={vehicleType === "Ô tô"}
              onChange={() => setVehicleType("Ô tô")}
              className="w-6 h-6 accent-[#6246EA]"
            />

            <CarFront size={30} />

            <span className="text-xl">
              Ô tô
            </span>

          </label>

          <label className="flex items-center gap-4 border rounded-2xl px-6 py-6 cursor-pointer">

            <input
              type="radio"
              name="vehicleType"
              checked={vehicleType === "Xe máy"}
              onChange={() => setVehicleType("Xe máy")}
              className="w-6 h-6 accent-[#6246EA]"
            />

            <Bike size={30} />

            <span className="text-xl">
              Xe máy
            </span>

          </label>

        </div>

      </div>

      {/* Thông báo */}

      <div className="mt-8 rounded-2xl bg-blue-50 border border-blue-200 p-5">

        <p className="text-blue-700">
          Sau khi nhấn <b>"XÁC NHẬN VÀO BÃI"</b>, hệ thống sẽ tự tạo phiên gửi xe và cập nhật trạng thái Parking Slot.
        </p>

      </div>

    </div>

  );

}