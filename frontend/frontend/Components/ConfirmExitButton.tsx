"use client";

import { CheckCircle2 } from "lucide-react";

export default function ConfirmExitButton() {
  return (
    <button
      className="
        w-full
        mt-6
        bg-green-600
        hover:bg-green-700
        rounded-2xl
        py-5
        flex
        items-center
        justify-center
        gap-4
        text-white
        transition
      "
    >
      <CheckCircle2 size={36} />

      <span className="text-2xl font-bold">ĐÃ THANH TOÁN & MỞ BARRIER</span>
    </button>
  );
}
