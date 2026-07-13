"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Role {
  name: string;
  desc: string;
}

interface CreateRoleModalProps {
  onClose: () => void;
  onCreate: (role: Role) => void;
}

export default function CreateRoleModal({
  onClose,
  onCreate,
}: CreateRoleModalProps) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [note, setNote] = useState("");

  const handleCreate = () => {
    if (!name.trim()) {
      alert("Vui lòng nhập tên vai trò.");
      return;
    }

    onCreate({
      name,
      desc: desc || "Vai trò mới",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-[560px] rounded-3xl bg-white p-8 shadow-2xl">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-[#151930]">
            Tạo vai trò mới
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 transition"
          >
            <X size={24} />
          </button>

        </div>

        {/* Form */}

        <div className="space-y-6">

          <div>

            <label className="block mb-2 font-semibold">
              Tên vai trò *
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: Thu ngân"
              className="
                w-full
                h-12
                rounded-xl
                border
                border-gray-300
                px-4
                outline-none
                focus:border-[#6246EA]
              "
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Mô tả
            </label>

            <textarea
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Nhập mô tả..."
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                p-4
                resize-none
                outline-none
                focus:border-[#6246EA]
              "
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Ghi chú
            </label>

            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nhập ghi chú..."
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                p-4
                resize-none
                outline-none
                focus:border-[#6246EA]
              "
            />

          </div>

        </div>

        {/* Footer */}

        <div className="mt-8 flex justify-end gap-4">

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
            Hủy bỏ
          </button>

          <button
            onClick={handleCreate}
            className="
              rounded-xl
              bg-[#6246EA]
              px-6
              py-3
              text-white
              hover:bg-[#5337d8]
            "
          >
            Tạo vai trò
          </button>

        </div>

      </div>

    </div>
  );
  }