"use client";

import { Pencil, Lock, Unlock } from "lucide-react";
import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";

const users = [
  {
    avatar: "/avatar1.png",
    name: "Nguyễn Văn An",
    role: "Admin",
    email: "an.nguyen@parking.com",
    phone: "0901 234 567",
    created: "20/05/2024 10:30",
    status: "active",
  },
  {
    avatar: "/avatar2.png",
    name: "Trần Thị Bình",
    role: "Manager",
    email: "binh.tran@parking.com",
    phone: "0902 345 678",
    created: "18/05/2024 08:15",
    status: "active",
  },
  {
    avatar: "/avatar3.png",
    name: "Lê Minh Cường",
    role: "Staff",
    email: "cuong.le@parking.com",
    phone: "0903 456 789",
    created: "15/05/2024 14:20",
    status: "active",
  },
  {
    avatar: "",
    name: "Phạm Hoàng Tùng",
    role: "Staff",
    email: "tung.pham@parking.com",
    phone: "0904 567 890",
    created: "12/05/2024 09:45",
    status: "locked",
  },
  {
    avatar: "/avatar4.png",
    name: "Vũ Thị Duyên",
    role: "Driver",
    email: "duyen.vu@gmail.com",
    phone: "0905 678 901",
    created: "10/05/2024 16:30",
    status: "active",
  },
  {
    avatar: "",
    name: "Ngô Đức Huy",
    role: "Driver",
    email: "huy.ngo@gmail.com",
    phone: "0906 789 012",
    created: "08/05/2024 11:05",
    status: "locked",
  },
] as const;

export default function UserTable() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr className="text-left">
            <th className="p-5">Avatar</th>
            <th>Họ & Tên</th>
            <th>Vai trò</th>
            <th>Liên hệ</th>
            <th>Ngày tạo</th>
            <th>Trạng thái</th>
            <th className="text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="p-5">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#F2EEFF] flex items-center justify-center font-bold text-[#6246EA]">
                    {user.name
                      .split(" ")
                      .slice(-2)
                      .map((x) => x[0])
                      .join("")}
                  </div>
                )}
              </td>

              <td className="font-semibold">{user.name}</td>

              <td>
                <UserRoleBadge role={user.role} />
              </td>

              <td>
                <p>{user.email}</p>

                <p className="text-gray-500 text-sm">{user.phone}</p>
              </td>

              <td>{user.created}</td>

              <td>
                <UserStatusBadge status={user.status} />
              </td>

              <td>
                <div className="flex justify-center gap-4">
                  <button className="text-[#6246EA]">
                    <Pencil size={20} />
                  </button>

                  {user.status === "active" ? (
                    <button className="text-red-500">
                      <Lock size={20} />
                    </button>
                  ) : (
                    <button className="text-green-500">
                      <Unlock size={20} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center p-5 border-t">
        <span className="text-gray-500 text-sm">
          Hiển thị 1 - 6 trong tổng số 6 người dùng
        </span>

        <div className="flex gap-2">
          <button className="w-10 h-10 border rounded-lg">&lt;</button>

          <button className="w-10 h-10 rounded-lg bg-[#6246EA] text-white">
            1
          </button>

          <button className="w-10 h-10 border rounded-lg">&gt;</button>
        </div>
      </div>
    </div>
  );
}
