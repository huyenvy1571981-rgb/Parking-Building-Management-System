"use client";

import Image from "next/image";
import { CarFront } from "lucide-react";

export default function PaymentInfo() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-3xl font-bold mb-8">Thông tin thanh toán</h2>

      {/* Thông tin xe */}

      <div className="space-y-6">
        <div className="flex justify-between items-center border-b pb-5">
          <div>
            <p className="text-gray-500">Biển số xe</p>

            <h2 className="text-4xl font-bold mt-2">30A-123.45</h2>
          </div>

          <div>
            <p className="text-gray-500 mb-2">Loại xe</p>

            <div className="flex items-center gap-2">
              <CarFront size={24} className="text-[#6246EA]" />

              <span className="text-lg">Ô tô</span>
            </div>
          </div>
        </div>

        {/* Thời gian */}

        <div>
          <p className="text-gray-500">Thời gian gửi xe</p>

          <h2 className="text-4xl font-bold mt-3">3 giờ 15 phút</h2>

          <div className="flex items-center justify-between mt-5 text-gray-600">
            <div>
              <h3 className="font-semibold">09:42</h3>

              <p className="text-sm">20/05/2024</p>
            </div>

            <span className="text-3xl">→</span>

            <div>
              <h3 className="font-semibold">12:57</h3>

              <p className="text-sm">20/05/2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card thanh toán */}

      <div className="mt-8 rounded-3xl bg-[#F7F5FF] p-8 text-center">
        <p className="text-[#6246EA] font-bold text-xl">TỔNG TIỀN THANH TOÁN</p>

        <h1 className="text-[64px] font-extrabold text-[#6246EA] mt-3">
          35.000
          <span className="text-3xl ml-2">VND</span>
        </h1>

        <p className="mt-4 text-gray-600">Quét mã để thanh toán</p>

        <div className="mt-5 flex justify-center">
          <Image src="/qr.png" alt="QR" width={180} height={180} />
        </div>
      </div>
    </div>
  );
}
