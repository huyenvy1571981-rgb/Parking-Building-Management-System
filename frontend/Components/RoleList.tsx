"use client";

import {
  Crown,
  Briefcase,
  Shield,
  User,
  MoreVertical,
  Plus,
} from "lucide-react";

const roles = [
  {
    name: "System Admin",
    desc: "Quản trị hệ thống",
    icon: Crown,
    color: "bg-purple-100 text-[#6246EA]",
    active: true,
  },
  {
    name: "Parking Manager",
    desc: "Quản lý bãi đỗ xe",
    icon: Briefcase,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Guard",
    desc: "Nhân viên bảo vệ",
    icon: Shield,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "User",
    desc: "Người dùng",
    icon: User,
    color: "bg-orange-100 text-orange-500",
  },
];

export default function RoleList() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Danh sách vai trò</h2>

        <button
          className="
            flex
            items-center
            gap-2
            bg-[#6246EA]
            hover:bg-[#5337d8]
            text-white
            px-4
            py-2
            rounded-xl
            transition
          "
        >
          <Plus size={18} />
          Tạo vai trò
        </button>
      </div>

      <div className="space-y-4">
        {roles.map((role, index) => {
          const Icon = role.icon;

          return (
            <div
              key={index}
              className={`
                flex
                items-center
                justify-between
                rounded-2xl
                border
                p-4
                cursor-pointer
                transition
                ${
                  role.active
                    ? "bg-[#F2EEFF] border-[#6246EA]"
                    : "hover:bg-gray-50 border-gray-200"
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`
                    w-14
                    h-14
                    rounded-full
                    flex
                    items-center
                    justify-center
                    ${role.color}
                  `}
                >
                  <Icon size={28} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">{role.name}</h3>

                  <p className="text-gray-500 text-sm">{role.desc}</p>
                </div>
              </div>

              <button>
                <MoreVertical size={20} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-gray-500 text-sm">Tổng số: 4 vai trò</div>
    </div>
  );
}
