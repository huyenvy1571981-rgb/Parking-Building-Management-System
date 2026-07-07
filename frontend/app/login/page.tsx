"use client";

import Image from "next/image";
import { FaUserAlt, FaLock, FaEye } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      const body = new URLSearchParams();
      body.append("username", username);
      body.append("password", password);

      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      const data = await response.json();

      if (response.ok) {
        // Lưu JWT
        localStorage.setItem("token", data.access_token);

        // Chuyển Dashboard
        router.push("/dashboard");
      } else {
        alert(data.detail || "Đăng nhập thất bại");
      }
    } catch (error) {
      console.error(error);
      alert("Không thể kết nối tới Backend.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F6FC] flex items-center justify-center px-10">
      <div className="w-[1180px] h-[680px] bg-white rounded-[30px] shadow-[0_15px_50px_rgba(0,0,0,0.08)] flex overflow-hidden">

        {/* LEFT */}
        <div className="w-[520px] flex flex-col justify-center items-center px-14">

          <Image
            src="/logo.png"
            alt="Logo"
            width={220}
            height={220}
            priority
          />

          <h1 className="mt-5 text-[48px] font-extrabold tracking-tight text-[#161A36]">
            PARKING
          </h1>

          <h2 className="text-[30px] font-bold tracking-[3px] text-[#6246EA]">
            MANAGER SYSTEM
          </h2>

          <div className="w-20 h-[4px] bg-[#6246EA] rounded-full my-8"></div>

          <p className="text-center text-gray-500 text-[22px] leading-10">
            Hệ thống quản lý bãi đỗ xe thông minh
            <br />
            Hiệu quả - An toàn - Tiện lợi
          </p>

        </div>

        {/* RIGHT */}
        <div className="flex-1 flex flex-col justify-center px-20">

          <h1 className="text-[42px] font-extrabold text-center text-[#161A36]">
            Đăng nhập
          </h1>

          <p className="text-center text-gray-500 text-lg mt-3 mb-12">
            Vui lòng đăng nhập để tiếp tục sử dụng hệ thống
          </p>

          {/* Username */}

          <label className="font-semibold text-[17px] mb-3">
            Tên đăng nhập hoặc Email
          </label>

          <div className="h-[52px] rounded-2xl border border-gray-300 flex items-center px-5">

            <FaUserAlt className="text-gray-400 text-lg" />

            <input
              type="text"
              placeholder="Nhập tên đăng nhập hoặc email"
              className="flex-1 ml-4 outline-none text-[16px]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

          </div>

          {/* Password */}

          <label className="font-semibold text-[17px] mt-8 mb-3">
            Mật khẩu
          </label>

          <div className="h-[52px] rounded-2xl border border-gray-300 flex items-center px-5">

            <FaLock className="text-gray-400 text-lg" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              className="flex-1 ml-4 outline-none text-[16px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin();
              }}
            />

            <FaEye
              className="text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />

          </div>

          {/* Remember */}

          <div className="flex justify-between items-center mt-8 text-[15px]">

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" />
              Ghi nhớ đăng nhập
            </label>

            <a
              href="#"
              className="text-[#6246EA] font-semibold hover:underline"
            >
              Quên mật khẩu?
            </a>

          </div>

          {/* Button */}

          <button
            onClick={handleLogin}
            className="mt-8 h-14 rounded-2xl bg-[#6246EA] text-white text-xl font-bold hover:bg-[#5237d5] transition"
          >
            Đăng nhập
          </button>

          <p className="text-center text-gray-500 mt-10">

            Bạn cần hỗ trợ?

            <span className="text-[#6246EA] font-semibold ml-2 cursor-pointer hover:underline">
              Liên hệ quản trị hệ thống
            </span>

          </p>

        </div>

      </div>
    </main>
  );
}