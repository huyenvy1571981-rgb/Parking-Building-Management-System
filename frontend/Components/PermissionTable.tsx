"use client";

import {
  Home,
  Users,
  ShieldCheck,
  Car,
  Building2,
  Grid2x2,
  Tags,
  LogIn,
  LogOut,
  TriangleAlert,
  BarChart3,
  Settings,
} from "lucide-react";

import PermissionCheckbox from "./PermissionCheckbox";

const modules = [
  { icon: Home, name: "Tổng quan" },
  { icon: Users, name: "Quản lý người dùng" },
  { icon: ShieldCheck, name: "Phân quyền" },
  { icon: Car, name: "Quản lý bãi đỗ xe" },
  { icon: Building2, name: "Tổng quan tòa nhà & phân tầng" },
  { icon: Grid2x2, name: "Sơ đồ Slot" },
  { icon: Tags, name: "Quản lý bảng giá" },
  { icon: LogIn, name: "Quầy vào bãi" },
  { icon: LogOut, name: "Quầy ra bãi & Thanh toán" },
  { icon: TriangleAlert, name: "Xử lý sự cố" },
  { icon: BarChart3, name: "Báo cáo" },
  { icon: Settings, name: "Cài đặt hệ thống" },
];

export default function PermissionTable() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">Ma trận phân quyền</h2>

          <p className="text-gray-500 mt-1">
            Vai trò đang chọn:
            <span className="text-[#6246EA] font-semibold ml-2">
              System Admin
            </span>
          </p>
        </div>

        <input
          placeholder="Tìm kiếm module..."
          className="
            w-72
            h-12
            rounded-xl
            border
            border-gray-200
            px-4
            outline-none
            focus:border-[#6246EA]
          "
        />
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="text-left p-4">Tên Module</th>
            <th>Xem</th>
            <th>Thêm</th>
            <th>Sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>

        <tbody>
          {modules.map((item, index) => {
            const Icon = item.icon;

            return (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="
                        w-11
                        h-11
                        rounded-xl
                        bg-[#F2EEFF]
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Icon size={22} className="text-[#6246EA]" />
                    </div>

                    <span>{item.name}</span>
                  </div>
                </td>

                <td className="text-center">
                  <PermissionCheckbox checked />
                </td>

                <td className="text-center">
                  <PermissionCheckbox checked />
                </td>

                <td className="text-center">
                  <PermissionCheckbox checked />
                </td>

                <td className="text-center">
                  <PermissionCheckbox checked={index < 9} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-end gap-4 mt-8">
        <button
          className="
            px-6
            py-3
            rounded-xl
            border
            border-[#6246EA]
            text-[#6246EA]
          "
        >
          Hủy bỏ
        </button>

        <button
          className="
            px-6
            py-3
            rounded-xl
            bg-[#6246EA]
            text-white
          "
        >
          Lưu phân quyền
        </button>
      </div>
    </div>
  );
}
