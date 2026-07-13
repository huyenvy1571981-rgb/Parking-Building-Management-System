"use client";

import { useEffect, useState } from "react";
import { Pencil, Lock, Unlock } from "lucide-react";

import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";

interface Props {
  reload: boolean;
  onEdit: (user: any) => void;
}

export default function UserTable({
  reload,
  onEdit,
}: Props) {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, [reload]);

  // ============================
  // Lấy danh sách User
  // ============================
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Không lấy được danh sách User");
      }

      const data = await response.json();
      setUsers(data);

    } catch (error) {
      console.error(error);
    }
  };

  // ============================
  // Khóa / Mở khóa User
  // ============================
  const handleLock = async (userID: number) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/users/${userID}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Không thể cập nhật trạng thái.");
        return;
      }

      fetchUsers();

    } catch (error) {
      console.error(error);
      alert("Không thể kết nối Backend.");
    }
  };

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

          {users.map((user) => (

            <tr
              key={user.UserID}
              className="border-t hover:bg-gray-50"
            >

              {/* Avatar */}

              <td className="p-5">

                <div className="w-12 h-12 rounded-full bg-[#F2EEFF] flex items-center justify-center font-bold text-[#6246EA]">

                  {user.FullName?.split(" ")
                    .slice(-2)
                    .map((x: string) => x[0])
                    .join("")}

                </div>

              </td>

              {/* Họ tên */}

              <td className="font-semibold">
                {user.FullName}
              </td>

              {/* Vai trò */}

              <td>
                <UserRoleBadge role={user.RoleID} />
              </td>

              {/* Liên hệ */}

              <td>

                <p>{user.Email}</p>

                <p className="text-gray-500 text-sm">
                  {user.Phone}
                </p>

              </td>

              {/* Ngày tạo */}

              <td>

                {user.CreatedAt
                  ? new Date(user.CreatedAt).toLocaleString()
                  : ""}

              </td>

              {/* Trạng thái */}

              <td>

                <UserStatusBadge status={user.Status} />

              </td>

              {/* Thao tác */}

              <td>

                <div className="flex justify-center gap-4">

                  {/* Sửa */}

                  <button
                    onClick={() => onEdit(user)}
                    className="text-[#6246EA] hover:text-[#4F37D8]"
                  >
                    <Pencil size={20} />
                  </button>

                  {/* Khóa */}

                  {user.Status === 1 ? (

                    <button
                      onClick={() => handleLock(user.UserID)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Lock size={20} />
                    </button>

                  ) : (

                    <button
                      onClick={() => handleLock(user.UserID)}
                      className="text-green-500 hover:text-green-700"
                    >
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
          Hiển thị {users.length} người dùng
        </span>

        <div className="flex gap-2">

          <button className="w-10 h-10 border rounded-lg">
            &lt;
          </button>

          <button className="w-10 h-10 rounded-lg bg-[#6246EA] text-white">
            1
          </button>

          <button className="w-10 h-10 border rounded-lg">
            &gt;
          </button>

        </div>

      </div>

    </div>
  );
}