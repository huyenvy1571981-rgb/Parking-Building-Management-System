"use client";

import { CarFront, Bike } from "lucide-react";

type Props = {
  vehicle: "Ô tô" | "Xe máy";
};

export default function PricingCard({ vehicle }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#EFEAFF] flex items-center justify-center">
            {vehicle === "Ô tô" ? (
              <CarFront className="text-[#6246EA]" />
            ) : (
              <Bike className="text-[#6246EA]" />
            )}
          </div>

          <h2 className="text-2xl font-semibold">Loại xe: {vehicle}</h2>
        </div>

        <label className="flex items-center gap-3">
          <span>Kích hoạt</span>

          <input
            type="checkbox"
            defaultChecked
            className="w-5 h-5 accent-[#6246EA]"
          />
        </label>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-5">
          <input
            type="number"
            placeholder="Giá block đầu tiên"
            className="border rounded-xl px-4 py-3"
          />

          <input
            type="number"
            placeholder="Số giờ"
            className="border rounded-xl px-4 py-3"
          />

          <input
            type="number"
            placeholder="Đơn giá"
            className="border rounded-xl px-4 py-3"
          />
        </div>

        <div className="grid grid-cols-3 gap-5">
          <input
            type="number"
            placeholder="Block tiếp theo"
            className="border rounded-xl px-4 py-3"
          />

          <input
            type="number"
            placeholder="Mỗi ... giờ"
            className="border rounded-xl px-4 py-3"
          />

          <input
            type="number"
            placeholder="Đơn giá"
            className="border rounded-xl px-4 py-3"
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium">Kích hoạt phụ thu gửi qua đêm</span>

          <input
            type="checkbox"
            defaultChecked
            className="w-5 h-5 accent-[#6246EA]"
          />
        </div>

        <input
          type="number"
          placeholder="Phụ thu qua đêm"
          className="w-full border rounded-xl px-4 py-3"
        />
      </div>
    </div>
  );
}
