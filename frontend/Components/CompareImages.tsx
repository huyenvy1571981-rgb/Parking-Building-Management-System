"use client";

import Image from "next/image";

export default function CompareImages() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-3xl font-bold mb-8">Đối chiếu hình ảnh</h2>

      <div className="grid grid-cols-2 gap-10 relative">
        {/* Check In */}

        <div>
          <h3 className="text-green-600 font-bold text-lg">
            Ảnh lúc vào (Check-in)
          </h3>

          <p className="text-gray-500 text-sm mt-1">20/05/2024 - 09:42:18</p>

          <div className="mt-4 overflow-hidden rounded-2xl border border-green-200">
            <Image
              src="/car.png"
              alt="checkin"
              width={800}
              height={600}
              className="w-full h-[260px] object-cover"
            />
          </div>

          <h4 className="font-semibold mt-5 mb-3">Biển số (Zoom)</h4>

          <div className="overflow-hidden rounded-2xl border border-green-200">
            <Image
              src="/plate.png"
              alt="plate1"
              width={800}
              height={400}
              className="w-full h-[180px] object-cover"
            />
          </div>
        </div>

        {/* Check Out */}

        <div>
          <h3 className="text-[#6246EA] font-bold text-lg">
            Ảnh lúc ra (Check-out)
          </h3>

          <p className="text-gray-500 text-sm mt-1">20/05/2024 - 12:57:33</p>

          <div className="mt-4 overflow-hidden rounded-2xl border border-blue-200">
            <Image
              src="/car.png"
              alt="checkout"
              width={800}
              height={600}
              className="w-full h-[260px] object-cover"
            />
          </div>

          <h4 className="font-semibold mt-5 mb-3">Biển số (Zoom)</h4>

          <div className="overflow-hidden rounded-2xl border border-blue-200">
            <Image
              src="/plate.png"
              alt="plate2"
              width={800}
              height={400}
              className="w-full h-[180px] object-cover"
            />
          </div>
        </div>

        {/* VS */}

        <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-16 rounded-full bg-white border shadow-lg flex items-center justify-center">
            <span className="text-[#6246EA] text-3xl font-bold">VS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
