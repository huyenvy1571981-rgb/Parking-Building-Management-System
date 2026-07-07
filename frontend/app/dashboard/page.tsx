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

        const response = await fetch(
          "http://127.0.0.1:8000/dashboard",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Không lấy được dữ liệu Dashboard");
        }

        const data = await response.json();

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

      <main className="flex-1 p-7">
        <Header />

        <div className="mt-7 space-y-7">

          {/* Cards */}

          <div className="grid grid-cols-4 gap-6">

            <StatCard
              title="Tổng Slots"
              value={dashboard.TotalParkingSlots}
              percent={`${dashboard.TotalFloors} Floors`}
              color="text-green-600"
              icon={
                <ParkingCircle
                  className="text-[#6246EA]"
                  size={34}
                />
              }
            />

            <StatCard
              title="Xe trong bãi"
              value={dashboard.VehiclesParking}
              percent={`${dashboard.TotalVehicles} Vehicles`}
              color="text-blue-600"
              icon={
                <CarFront
                  className="text-[#6246EA]"
                  size={34}
                />
              }
            />

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

          {/* Charts */}

          <div className="grid grid-cols-3 gap-6">

            <div className="col-span-2 bg-white rounded-3xl border border-gray-200 shadow-sm p-7">

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold">
                  Doanh thu 7 ngày
                </h2>

                <button className="px-4 py-2 rounded-xl bg-[#6246EA] text-white">
                  7 ngày
                </button>

              </div>

              <div className="mt-8">
                <RevenueChart  data={dashboard.Revenue7Days} />
              </div>

            </div>

            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7">

              <h2 className="text-2xl font-bold mb-6">
                Tỷ lệ sử dụng
              </h2>

              <OccupancyChart
              occupied={dashboard.OccupiedSlots}
              available={dashboard.AvailableSlots} 
              />

            </div>

          </div>

          <RecentActivity data={dashboard.RecentActivities} />

        </div>

      </main>
    </div>
  );
}