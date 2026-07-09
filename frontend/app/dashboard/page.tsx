"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";
import StatCard from "@/Components/StatCard";
import RevenueChart from "@/Components/RevenueChart";
import OccupancyChart from "@/Components/OccupancyChart";
import RecentActivity from "@/Components/RecentActivity";

import {
  ParkingCircle,
  CarFront,
  DollarSign,
  ChartColumn,
} from "lucide-react";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<any>(null);

  useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      const response = await fetch("http://127.0.0.1:8000/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("STATUS:", response.status);

      const text = await response.text();

      console.log("RESPONSE:", text);

      if (!response.ok) {
        throw new Error(`Dashboard Error ${response.status}`);
      }

      const data = JSON.parse(text);

      console.log("DATA:", data);

      setDashboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchDashboard();
}, []);

  if (!dashboard) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  // Tính tỷ lệ lấp đầy
  const occupancy =
    dashboard.TotalParkingSlots > 0
      ? Math.round(
          (dashboard.VehiclesParking /
            dashboard.TotalParkingSlots) *
            100
        )
      : 0;

  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Sidebar />

     <main className="flex-1 min-w-0 bg-[#F6F8FC] overflow-y-auto">

  <div className="mb-8">
    <Header />
</div>

  <div className="max-w-[1450px] mx-auto px-8 pt-8 pb-10 space-y-8">

    {/* KPI */}

    <div className="flex gap-4 mb-8">

    <div className="flex-1">
   
    <StatCard
      title="Tổng Parking Slot"
      value={dashboard.TotalParkingSlots}
      percent={`${dashboard.TotalFloors} tầng`}
      color="text-green-600"
      icon={
        <ParkingCircle
          className="text-[#6246EA]"
          size={34}
        />
      }
    />
  </div>

  <div className="flex-1">
    <StatCard
      title="Xe đang gửi"
      value={dashboard.VehiclesParking}
      percent={`${dashboard.TotalVehicles} phương tiện`}
      color="text-blue-600"
      icon={
        <CarFront
          className="text-[#6246EA]"
          size={34}
        />
      }
    />
  </div>

  <div className="flex-1">
    <StatCard
      title="Doanh thu hôm nay"
      value={`${dashboard.TodayRevenue.toLocaleString()} VNĐ`}
      percent={`Tổng ${dashboard.TotalRevenue.toLocaleString()} VNĐ`}
      color="text-green-600"
      icon={
        <DollarSign
          className="text-[#6246EA]"
          size={34}
        />
      }
    />
  </div>

  <div className="flex-1">
    <StatCard
      title="Tỷ lệ lấp đầy"
      value={`${occupancy}%`}
      percent={`${dashboard.VehiclesCompleted} xe hoàn thành`}
      color="text-red-500"
      icon={
        <ChartColumn
          className="text-[#6246EA]"
          size={34}
        />
      }
    />
  </div>

</div>

    {/* CHART */}

    <div className="grid grid-cols-12 gap-6">
      
      {/* Revenue */}

      <div className="col-span-8 bg-white rounded-[28px] border border-[#ECEEF5] shadow-sm px-8 pb-8">
      <div className="pb-8 text-center">
        <div className="h-6"></div>

        <h2 className="text-[30px] font-bold text-[#151930]">
            Doanh thu 7 ngày
        </h2>

        <p className="text-gray-500 mt-2">
            Thống kê doanh thu trong tuần
        </p>
    </div>

            <RevenueChart
              data={dashboard.Revenue7Days}
            />

      </div>

      {/* Occupancy */}

      <div
        className="
          col-span-4
          bg-white
          rounded-[28px]
          border
          border-[#ECEEF5]
          shadow-sm
          px-10
          pb-8
          flex
          flex-col
        "
      >

        <div className="text-center pb-8">
          <div className="h-7"></div>

          <h2 className="text-[26px] font-bold text-[#151930]">
            Tỷ lệ sử dụng
          </h2>

          <p className="text-gray-500 mt-2">
            Trạng thái bãi xe hiện tại
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <OccupancyChart
            occupied={dashboard.OccupiedSlots}
            available={dashboard.AvailableSlots}
          />
        </div>

      </div>

          </div>

    {/* Recent */}

    <RecentActivity
      data={dashboard.RecentActivities}
    />

  </div>

</main>
    </div>
  );
}