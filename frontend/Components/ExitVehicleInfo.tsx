"use client";

import { CarFront, Bike, CheckCircle2 } from "lucide-react";

type Props = {
  plateNumber: string;
  vehicle: any;
};

export default function ExitVehicleInfo({
  plateNumber,
  vehicle,
}: Props) {

  return (

    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7">

      <h2 className="text-3xl font-bold mb-8">
        Thông tin xe
      </h2>

      {/* Biển số */}

      <div>

        <label className="font-semibold text-gray-700">
          Biển số xe
        </label>

        <div className="mt-3 border rounded-2xl px-8 py-6 flex items-center justify-between">

          <h1 className="text-[52px] font-extrabold tracking-wider text-[#111827]">

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

          <label className="flex items-center gap-4 border rounded-2xl px-6 py-5">

            <input
              type="radio"
              checked={
                vehicle?.VehicleTypeName === "Ô tô"
              }
              readOnly
              className="w-6 h-6 accent-[#6246EA]"
            />

            <CarFront size={30} />

            <span className="text-xl">
              Ô tô
            </span>

          </label>

          <label className="flex items-center gap-4 border rounded-2xl px-6 py-5">

            <input
              type="radio"
              checked={
                vehicle?.VehicleTypeName === "Xe máy"
              }
              readOnly
              className="w-6 h-6 accent-[#6246EA]"
            />

            <Bike size={30} />

            <span className="text-xl">
              Xe máy
            </span>

          </label>

        </div>

      </div>

      {/* Chủ xe */}

      <div className="mt-8 border rounded-2xl p-5">

        <h3 className="font-bold text-xl mb-4">
          Thông tin chủ xe
        </h3>

        <div className="flex justify-between py-2">

          <span className="text-gray-500">
            Chủ xe
          </span>

          <span className="font-semibold">

            {vehicle?.OwnerName || "--"}

          </span>

        </div>

        <div className="flex justify-between py-2">

          <span className="text-gray-500">
            Số điện thoại
          </span>

          <span className="font-semibold">

            {vehicle?.PhoneNumber || "--"}

          </span>

        </div>

      </div>

    </div>

  );

}