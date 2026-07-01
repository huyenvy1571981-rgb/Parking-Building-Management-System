"use client";

import Image from "next/image";

export default function CameraPanel() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-3xl font-bold text-gray-900">Hình ảnh camera</h2>

      {/* Ảnh toàn cảnh */}

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Ảnh toàn cảnh</h3>

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
        <h3 className="text-lg font-semibold mb-4">Ảnh biển số (Zoom)</h3>

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
