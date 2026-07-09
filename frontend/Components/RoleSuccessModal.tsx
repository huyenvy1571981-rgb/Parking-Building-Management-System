"use client";

import { CheckCircle2 } from "lucide-react";

interface Props {
  onClose: () => void;
}

export default function RoleSuccessModal({
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-[430px] rounded-3xl bg-white p-10 shadow-2xl text-center">

        {/* Icon */}

        <div
          className="
            mx-auto
            mb-6
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            bg-green-100
          "
        >
          <CheckCircle2
            size={56}
            className="text-green-600"
          />
        </div>

        {/* Title */}

        <h2 className="text-3xl font-bold text-[#151930]">
          Tạo vai trò thành công!
        </h2>

        <p className="mt-4 text-gray-500 leading-7">
          Vai trò mới đã được thêm vào hệ thống.
        </p>

        {/* Button */}

        <button
          onClick={onClose}
          className="
            mt-8
            w-full
            rounded-xl
            bg-[#6246EA]
            py-3
            text-white
            font-semibold
            hover:bg-[#5337d8]
            transition
          "
        >
          Đóng
        </button>

      </div>

    </div>
  );
  }