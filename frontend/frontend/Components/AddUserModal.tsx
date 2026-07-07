"use client";

import { X, Eye } from "lucide-react";

export default function AddUserModal() {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-[720px] p-8 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Thêm người dùng mới</h2>

          <button>
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="font-medium">Họ và tên *</label>

            <input
              className="w-full mt-2 h-12 rounded-xl border border-gray-200 px-4"
              placeholder="Nhập họ và tên"
            />
          </div>

          <div>
            <label className="font-medium">Vai trò *</label>

            <select className="w-full mt-2 h-12 rounded-xl border border-gray-200 px-4">
              <option>Chọn vai trò</option>
              <option>Admin</option>
              <option>Manager</option>
              <option>Staff</option>
              <option>Driver</option>
            </select>
          </div>

          <div>
            <label className="font-medium">Email *</label>

            <input
              className="w-full mt-2 h-12 rounded-xl border border-gray-200 px-4"
              placeholder="Nhập email"
            />
          </div>

          <div>
            <label className="font-medium">Mật khẩu *</label>

            <div className="relative mt-2">
              <input
                type="password"
                className="w-full h-12 rounded-xl border border-gray-200 px-4 pr-12"
                placeholder="Nhập mật khẩu"
              />

              <Eye
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="font-medium">Số điện thoại *</label>

            <input
              className="w-full mt-2 h-12 rounded-xl border border-gray-200 px-4"
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div>
            <label className="font-medium">Trạng thái</label>

            <select className="w-full mt-2 h-12 rounded-xl border border-gray-200 px-4">
              <option>Đang hoạt động</option>
              <option>Đã khóa</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button className="px-6 py-3 border rounded-xl">Hủy bỏ</button>

          <button className="px-6 py-3 rounded-xl bg-[#6246EA] text-white">
            Lưu người dùng
          </button>
        </div>
      </div>
    </div>
  );
}
