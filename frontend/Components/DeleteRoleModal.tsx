"use client";

import { TriangleAlert } from "lucide-react";

interface Props {
  roleName: string;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteRoleModal({
  roleName,
  onClose,
  onDelete,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-[430px] rounded-3xl bg-white p-8 shadow-2xl">

        {/* Icon */}

        <div className="flex justify-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

            <TriangleAlert
              size={42}
              className="text-red-500"
            />

          </div>

        </div>

        {/* Title */}

        <h2 className="mt-6 text-center text-3xl font-bold text-[#151930]">
          Xóa vai trò
        </h2>

        <p className="mt-4 text-center text-gray-500 leading-7">
          Bạn có chắc chắn muốn xóa vai trò
          <br />

          <span className="font-semibold text-[#6246EA]">
            {roleName}
          </span>

          ?
        </p>

        {/* Button */}

        <div className="mt-8 flex justify-center gap-4">

          <button
            onClick={onClose}
            className="
              rounded-xl
              border
              border-gray-300
              px-6
              py-3
              hover:bg-gray-50
            "
          >
            Hủy
          </button>

          <button
            onClick={onDelete}
            className="
              rounded-xl
              bg-red-500
              px-6
              py-3
              text-white
              hover:bg-red-600
            "
          >
            Xóa
          </button>

        </div>

      </div>

    </div>
  );
}