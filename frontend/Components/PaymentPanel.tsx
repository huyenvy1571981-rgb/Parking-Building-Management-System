"use client";

import { CreditCard, Wallet } from "lucide-react";
import { useMemo, useState } from "react";

type Props = {
  parkingSession: any;
};

export default function PaymentPanel({
  parkingSession,
}: Props) {

  const [paymentMethod, setPaymentMethod] =
    useState("Tiền mặt");

  const amount = useMemo(() => {

    if (!parkingSession) return 0;

    const entry = new Date(parkingSession.EntryTime);

    const exit = new Date();

    const hours = Math.ceil(
      (exit.getTime() - entry.getTime()) /
      (1000 * 60 * 60)
    );

    // Demo:
    // Ô tô: 10.000đ/giờ
    // Xe máy: 5.000đ/giờ
    // Hiện chưa có Pricing API nên tạm tính 10.000đ

    return hours * 10000;

  }, [parkingSession]);

  return (

    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Thanh toán
      </h2>

      {/* Thành tiền */}

      <div className="border rounded-2xl p-6 bg-[#F7F7FF]">

        <p className="text-gray-500">
          Tổng tiền
        </p>

        <h1 className="text-4xl font-bold text-[#6246EA] mt-2">

          {amount.toLocaleString()} VNĐ

        </h1>

      </div>

      {/* Phương thức */}

      <div className="mt-8">

        <label className="font-semibold">
          Phương thức thanh toán
        </label>

        <div className="space-y-4 mt-4">

          <label className="flex items-center gap-4 border rounded-2xl px-6 py-5 cursor-pointer">

            <input
              type="radio"
              checked={paymentMethod === "Tiền mặt"}
              onChange={() =>
                setPaymentMethod("Tiền mặt")
              }
            />

            <Wallet />

            <span>Tiền mặt</span>

          </label>

          <label className="flex items-center gap-4 border rounded-2xl px-6 py-5 cursor-pointer">

            <input
              type="radio"
              checked={paymentMethod === "Chuyển khoản"}
              onChange={() =>
                setPaymentMethod("Chuyển khoản")
              }
            />

            <CreditCard />

            <span>Chuyển khoản</span>

          </label>

        </div>

      </div>

    </div>

  );

}