"use client";

import { LogIn } from "lucide-react";

export default function ConfirmEntryButton() {
  return (
    <button
      className="
      w-full
      mt-8
      bg-green-600
      hover:bg-green-700
      text-white
      rounded-2xl
      py-5
      flex
      items-center
      justify-center
      gap-6
      transition
      "
    >
      <LogIn size={52} />

      <div className="text-center">
        <h2 className="text-3xl font-bold">XÁC NHẬN VÀO BÃI</h2>

        <p className="text-2xl mt-1">(Enter)</p>
      </div>
    </button>
  );
}
