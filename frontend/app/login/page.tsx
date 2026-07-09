"use client";

import Image from "next/image";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi"; 
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
        localStorage.setItem("token", data.access_token);
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
    <main className="min-h-screen bg-[#F8FAFF] flex items-center justify-center px-8">

      <div className="w-full max-w-[1450px] flex items-center justify-center gap-24">

        {/* LEFT */}

        <div className="w-[40%] flex flex-col items-center justify-center">

          <Image
            src="/logo.png"
            alt="logo"
            width={200}
            height={200}
            priority
          />

          <h1 className="mt-8 text-[72px] font-black leading-none tracking-tight text-[#161A36]">
            PARKING
          </h1>

          <h2 className="mt-3 text-[30px] font-bold tracking-[0.18em] text-[#5B43EA]">
            MANAGER SYSTEM
          </h2>

          <div className="w-16 h-1 rounded-full bg-[#5B43EA] mt-7 mb-8"></div>

          <p className="text-center text-[#6B7280] text-[20px] leading-10">
            Hệ thống quản lý bãi đỗ xe thông minh
            <br />
            Hiệu quả – An toàn – Tiện lợi
          </p>

        </div>

        {/* RIGHT */}

        <div className="w-[60%] flex justify-start">

          <div
          className="
          w-[720px]
          bg-white
          rounded-[28px]
          border border-[#F2F3F7]
          shadow-[0_25px_70px_rgba(67,71,85,.08)]
          px-16
          py-12
          "
          >

            <h1 className="text-center text-[50px] font-extrabold text-[#161A36] leading-none">
              Đăng nhập
            </h1>

            <p className="text-center text-[#7A8194] text-[18px] mt-4 mb-8">
              Vui lòng đăng nhập để tiếp tục sử dụng hệ thống
            </p>

            <div className="space-y-7">

              {/* USERNAME */}

              <div>

                <label className="block text-[16px] font-semibold text-[#161A36] mb-3">
                  Tên đăng nhập hoặc Email
                </label>

                <div className="h-[60px] rounded-2xl border border-[#D9DDE8] flex items-center px-5">

                  <FiUser
                    className="text-[#9AA2B1] text-[22px] shrink-0"
                  />

                  <input
                    type="text"
                    placeholder="Nhập tên đăng nhập hoặc email"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    className="ml-4 flex-1 bg-transparent outline-none text-[16px] placeholder:text-[#9AA2B1]"
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div>

                <label className="block text-[16px] font-semibold text-[#161A36] mb-3">
                  Mật khẩu
                </label>

                <div className="h-[60px] rounded-2xl border border-[#D9DDE8] flex items-center px-5">

                  <FiLock
                    className="text-[#9AA2B1] text-[22px] shrink-0"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    onKeyDown={(e)=>{
                      if(e.key==="Enter") handleLogin();
                    }}
                    className="ml-4 flex-1 bg-transparent outline-none text-[16px] placeholder:text-[#9AA2B1]"
                  />

                  {showPassword ? (

                    <FiEyeOff
                      onClick={()=>setShowPassword(false)}
                      className="text-[#9AA2B1] text-[22px] cursor-pointer hover:text-[#5B43EA]"
                    />

                  ) : (

                    <FiEye
                      onClick={()=>setShowPassword(true)}
                      className="text-[#9AA2B1] text-[22px] cursor-pointer hover:text-[#5B43EA]"
                    />

                  )}

                </div>

              </div>
       {/* Remember + Forgot */}

              <div className="flex items-center justify-between pt-1">

                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-[#5B43EA]"
                  />

                  <span className="text-[16px] text-[#5F6578]">
                    Ghi nhớ đăng nhập
                  </span>

                </label>

                <a
                  href="#"
                  className="text-[16px] font-semibold text-[#5B43EA] hover:underline"
                >
                  Quên mật khẩu?
                </a>

              </div>

              {/* LOGIN BUTTON */}

              <button
                onClick={handleLogin}
                className="
                  w-full
                  h-[56px]
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#4E2AE8]
                  to-[#6949FF]
                  text-white
                  text-[20px]
                  font-bold
                  shadow-lg
                  hover:scale-[1.01]
                  transition-all
                "
              >
                Đăng nhập
              </button>

            </div>

            {/* Divider */}

            <div className="flex items-center gap-5 mt-9 mb-8">

              <div className="flex-1 h-px bg-[#E5E7EB]"></div>

              <span className="text-[#9CA3AF] text-[15px]">
                hoặc
              </span>

              <div className="flex-1 h-px bg-[#E5E7EB]"></div>

            </div>

            {/* Footer */}

            <p className="text-center text-[16px] text-[#6B7280]">

              Bạn cần hỗ trợ?

              <span className="ml-2 text-[#5B43EA] font-semibold cursor-pointer hover:underline">
                Liên hệ quản trị hệ thống
              </span>

            </p>

          </div>

        </div>

      </div>

    </main>
  );
}

