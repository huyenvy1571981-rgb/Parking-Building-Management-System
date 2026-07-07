"use client";

import { useEffect, useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

interface Props {
  user: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditUserModal({
  user,
  onClose,
  onSuccess,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [roleID, setRoleID] = useState(3);
  const [status, setStatus] = useState(1);

  useEffect(() => {
    if (user) {
      setFullName(user.FullName);
      setUsername(user.Username);
      setEmail(user.Email);
      setPhone(user.Phone);
      setRoleID(user.RoleID);
      setStatus(user.Status);
    }
  }, [user]);

  const handleUpdate = async () => {
    if (
      !fullName ||
      !username ||
      !email ||
      !phone
    ) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/users/${user.UserID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            FullName: fullName,
            Username: username,
            Email: email,
            PasswordHash: password,
            Phone: phone,
            RoleID: roleID,
            Status: status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Cập nhật thất bại.");
        return;
      }

      alert("Cập nhật thành công.");

      onSuccess();

      onClose();

    } catch (error) {

      console.error(error);

      alert("Không thể kết nối Backend.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl w-[720px] p-8 shadow-xl">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">
            Cập nhật người dùng
          </h2>

          <button onClick={onClose}>
            <X size={24}/>
          </button>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <label className="font-medium">
              Họ và tên *
            </label>

            <input
              value={fullName}
              onChange={(e)=>setFullName(e.target.value)}
              className="w-full mt-2 h-12 rounded-xl border border-gray-200 px-4"
            />

          </div>

          <div>

            <label className="font-medium">
              Vai trò *
            </label>

            <select
              value={roleID}
              onChange={(e)=>setRoleID(Number(e.target.value))}
              className="w-full mt-2 h-12 rounded-xl border border-gray-200 px-4"
            >
              <option value={1}>Admin</option>
              <option value={2}>Manager</option>
              <option value={3}>Staff</option>
              <option value={4}>Driver</option>
            </select>

          </div>

          <div>

            <label className="font-medium">
              Username *
            </label>

            <input
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className="w-full mt-2 h-12 rounded-xl border border-gray-200 px-4"
            />

          </div>

          <div>

            <label className="font-medium">
              Email *
            </label>

            <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full mt-2 h-12 rounded-xl border border-gray-200 px-4"
            />

          </div>

          <div>

            <label className="font-medium">
              Mật khẩu mới
            </label>

            <div className="relative mt-2">

              <input
                type={showPassword ? "text":"password"}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full h-12 rounded-xl border border-gray-200 px-4 pr-12"
                placeholder="Để trống nếu không đổi"
              />

              <button
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>

            </div>

          </div>

          <div>

            <label className="font-medium">
              Số điện thoại
            </label>

            <input
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              className="w-full mt-2 h-12 rounded-xl border border-gray-200 px-4"
            />

          </div>

          <div>

            <label className="font-medium">
              Trạng thái
            </label>

            <select
              value={status}
              onChange={(e)=>setStatus(Number(e.target.value))}
              className="w-full mt-2 h-12 rounded-xl border border-gray-200 px-4"
            >
              <option value={1}>Đang hoạt động</option>
              <option value={0}>Đã khóa</option>
            </select>

          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-6 py-3 border rounded-xl"
          >
            Hủy
          </button>

          <button
            disabled={loading}
            onClick={handleUpdate}
            className="px-6 py-3 rounded-xl bg-[#6246EA] text-white"
          >
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </button>

        </div>

      </div>

    </div>
  );
}