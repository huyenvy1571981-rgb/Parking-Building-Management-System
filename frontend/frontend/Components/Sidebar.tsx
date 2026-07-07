"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  Users,
  ShieldCheck,
  Car,
  Building2,
  Grid2x2,
  Tags,
  ChevronDown,
  ChevronRight,
  LogIn,
  LogOut,
  TriangleAlert,
  BarChart3,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const [parkingOpen, setParkingOpen] = useState(true);
  const [operationOpen, setOperationOpen] = useState(true);

  const item = (href: string, label: string, Icon: any) => (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
        pathname === href
          ? "bg-[#F2EEFF] text-[#6246EA] font-semibold"
          : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );

  return (
    <aside className="w-[250px] min-h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="logo" width={54} height={54} />
          <div>
            <h1 className="font-extrabold text-2xl leading-none">PARKING</h1>
            <p className="text-[#6246EA] font-semibold text-sm">
              MANAGER SYSTEM
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
        {item("/dashboard", "Tổng quan", Home)}
        {item("/user", "Quản lý người dùng", Users)}
        {item("/role", "Phân quyền", ShieldCheck)}

        <button
          onClick={() => setParkingOpen(!parkingOpen)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-100"
        >
          <div className="flex items-center gap-3">
            <Car size={20} />
            <span>Quản lý bãi đỗ xe</span>
          </div>
          {parkingOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>

        {parkingOpen && (
          <div className="ml-8 space-y-1">
            {item("/building", "Tổng quan tòa nhà & phân tầng", Building2)}
            {item("/slot-map", "Sơ đồ Slot", Grid2x2)}
            {item("/pricing", "Quản lý bảng giá", Tags)}
          </div>
        )}

        <button
          onClick={() => setOperationOpen(!operationOpen)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-100"
        >
          <div className="flex items-center gap-3">
            <LogIn size={20} />
            <span>Quầy vận hành</span>
          </div>
          {operationOpen ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </button>

        {operationOpen && (
          <div className="ml-8 space-y-1">
            {item("/entry", "Quầy vào bãi", LogIn)}
            {item("/exit", "Quầy ra bãi & Thanh toán", LogOut)}
          </div>
        )}

        {item("/incident", "Xử lý sự cố", TriangleAlert)}
        {item("/report", "Báo cáo", BarChart3)}
        {item("/settings", "Cài đặt hệ thống", Settings)}
      </div>

      <div className="border-t p-4">{item("/login", "Đăng xuất", LogOut)}</div>
    </aside>
  );
}
