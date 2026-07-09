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

  const MenuItem = (
    href: string,
    label: string,
    Icon: any,
    child = false
  ) => (
    <Link
      href={href}
      className={`
      flex items-center gap-3
      ${child ? "pl-14 pr-5" : "px-5"}
      py-3
      rounded-xl
      transition-all
      duration-200

      ${
        pathname === href
          ? "bg-[#F3F0FF] text-[#6246EA] font-semibold shadow-sm"
          : "text-[#667085] hover:bg-[#F8F8FC]"
      }
      `}
    >
      <Icon
        size={20}
        className={pathname === href ? "text-[#6246EA]" : ""}
      />

      <span className="text-[15px]">{label}</span>
    </Link>
  );

  return (
   <aside
  className="
      w-[290px]
      min-w-[290px]
      h-screen
      bg-white
      border-r
      border-[#ECEEF5]
      flex
      flex-col
      shadow-sm
      shrink-0
    "
>
      {/* Logo */}

      <div className="h-[90px] border-b border-[#ECEEF5] flex items-center px-6">

        <Image
          src="/logo.png"
          alt="logo"
          width={52}
          height={52}
        />

        <div className="ml-4">

          <h1 className="text-[19px] font-black leading-none text-[#151930]">
            PARKING
          </h1>

          <p className="text-[#6246EA] text-[13px] font-bold tracking-wide mt-1">
            MANAGER SYSTEM
          </p>

        </div>

      </div>

      {/* Menu */}

      <div
        className="
        flex-1
        overflow-y-auto
        px-3
        py-5
        space-y-1
      "
      >
        {MenuItem("/dashboard", "Tổng quan", Home)}

        {MenuItem("/user", "Quản lý người dùng", Users)}

        {MenuItem("/role", "Phân quyền", ShieldCheck)}

        {/* Parking */}

        <button
          onClick={() => setParkingOpen(!parkingOpen)}
          className="
          w-full
          flex
          items-center
          justify-between
          px-5
          py-3
          rounded-xl
          text-[#667085]
          hover:bg-[#F8F8FC]
          transition
        "
        >
          <div className="flex items-center gap-3">

            <Car size={20} />

            <span className="text-[15px]">
              Quản lý bãi đỗ xe
            </span>

          </div>

          {parkingOpen ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </button>

        {parkingOpen && (

          <div className="space-y-1">

            {MenuItem(
              "/building",
              "Tổng quan tòa nhà",
              Building2,
              true
            )}

            {MenuItem(
              "/parking-slot",
              "Parking Slot",
              Grid2x2,
              true
            )}

            {MenuItem(
              "/slot-map",
              "Sơ đồ Slot",
              Grid2x2,
              true
            )}

            {MenuItem(
              "/pricing",
              "Bảng giá",
              Tags,
              true
            )}

          </div>

        )}

        {/* Operation */}

        <button
          onClick={() => setOperationOpen(!operationOpen)}
          className="
          w-full
          flex
          items-center
          justify-between
          px-5
          py-3
          rounded-xl
          text-[#667085]
          hover:bg-[#F8F8FC]
          transition
        "
        >
          <div className="flex items-center gap-3">

            <LogIn size={20} />

            <span className="text-[15px]">
              Quầy vận hành
            </span>

          </div>

          {operationOpen ? (
            <ChevronDown size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </button>

        {operationOpen && (

          <div className="space-y-1">

            {MenuItem(
              "/entry",
              "Quầy vào bãi",
              LogIn,
              true
            )}

            {MenuItem(
              "/exit",
              "Quầy ra bãi",
              LogOut,
              true
            )}

          </div>

        )}

        {MenuItem(
          "/incident",
          "Xử lý sự cố",
          TriangleAlert
        )}

        {MenuItem(
          "/report",
          "Báo cáo",
          BarChart3
        )}

        {MenuItem(
          "/settings",
          "Cài đặt hệ thống",
          Settings
        )}

      </div>

      {/* Footer */}

      <div className="border-t border-[#ECEEF5] p-4">

        <Link
          href="/login"
          className="
          flex
          items-center
          gap-3
          px-5
          py-3
          rounded-xl
          text-red-500
          hover:bg-red-50
          transition
        "
        >
          <LogOut size={20} />

          <span className="font-medium">
            Đăng xuất
          </span>

        </Link>

      </div>

    </aside>
  );
}