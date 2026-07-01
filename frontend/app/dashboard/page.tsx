import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";
import StatCard from "@/Components/StatCard";
import RevenueChart from "@/Components/RevenueChart";
import OccupancyChart from "@/Components/OccupancyChart";
import RecentActivity from "@/Components/RecentActivity";

import { ParkingCircle, CarFront, DollarSign, ChartColumn } from "lucide-react";

export default function Dashboard() {
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
              value="250"
              percent="+5 Today"
              color="text-green-600"
              icon={<ParkingCircle className="text-[#6246EA]" size={34} />}
            />

            <StatCard
              title="Xe trong bãi"
              value="118"
              percent="+12%"
              color="text-blue-600"
              icon={<CarFront className="text-[#6246EA]" size={34} />}
            />

            <StatCard
              title="Doanh thu hôm nay"
              value="$1,250"
              percent="+18%"
              color="text-green-600"
              icon={<DollarSign className="text-[#6246EA]" size={34} />}
            />

            <StatCard
              title="Tỷ lệ lấp đầy"
              value="47%"
              percent="-2%"
              color="text-red-500"
              icon={<ChartColumn className="text-[#6246EA]" size={34} />}
            />
          </div>

          {/* Charts */}

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white rounded-3xl border border-gray-200 shadow-sm p-7">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Doanh thu 7 ngày</h2>

                <button className="px-4 py-2 rounded-xl bg-[#6246EA] text-white">
                  7 ngày
                </button>
              </div>

              <div className="mt-8">
                <RevenueChart />
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7">
              <h2 className="text-2xl font-bold mb-6">Tỷ lệ sử dụng</h2>

              <OccupancyChart />
            </div>
          </div>

          <RecentActivity />
        </div>
      </main>
    </div>
  );
}
