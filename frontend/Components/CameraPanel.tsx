"use client";

import Image from "next/image";

type Props = {
  plateNumber: string;
  setPlateNumber: React.Dispatch<React.SetStateAction<string>>;
};

export default function CameraPanel({
  plateNumber,
  setPlateNumber,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-3xl font-bold text-gray-900">
        Hình ảnh camera
      </h2>

      {/* Nhập biển số */}

      <div className="mt-6">
        <label className="block mb-2 font-semibold">
          Biển số xe
        </label>

        <input
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
          placeholder="Nhập biển số xe..."
          className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-[#6246EA]"
        />
      </div>

      {/* Ảnh toàn cảnh */}

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">
          Ảnh toàn cảnh
        </h3>

        <div className="overflow-hidden rounded-2xl border border-gray-200">
          <Image
            src="/car.png"
            alt="Car"
            width={900}
            height={600}
            className="w-full h-[300px] object-cover"
          />
        </div>
      </div>

      {/* Ảnh biển số */}

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">
          Ảnh biển số (Zoom)
        </h3>

        <div className="overflow-hidden rounded-2xl border border-gray-200">
          <Image
            src="/plate.png"
            alt="Plate"
            width={900}
            height={400}
            className="w-full h-[220px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}