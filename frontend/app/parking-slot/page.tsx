import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";
import FloorStatCard from "@/Components/FloorStatCard";

export default function BuildingPage() {
  const floors = [
    {
      name: "Hầm B2",
      type: "Tầng hầm",
      slot: 250,
      vehicle: ["Ô tô", "Xe máy"],
      status: "Đang hoạt động",
      note: "Khu vực gửi xe dài hạn",
    },
    {
      name: "Hầm B1",
      type: "Tầng hầm",
      slot: 300,
      vehicle: ["Ô tô", "Xe máy"],
      status: "Đang hoạt động",
      note: "Khu vực gửi xe ngắn hạn",
    },
    {
      name: "Tầng 1",
      type: "Tầng nổi",
      slot: 250,
      vehicle: ["Ô tô", "Xe máy"],
      status: "Đang hoạt động",
      note: "Khu vực trung tâm thương mại",
    },
    {
      name: "Tầng 2",
      type: "Tầng nổi",
      slot: 250,
      vehicle: ["Ô tô"],
      status: "Đang hoạt động",
      note: "Khu vực văn phòng",
    },
    {
      name: "Tầng 3",
      type: "Tầng nổi",
      slot: 200,
      vehicle: ["Ô tô"],
      status: "Bảo trì",
      note: "Đang bảo trì hệ thống PCCC",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Sidebar />

      <main className="flex-1 p-7">
        <Header />

        <div className="mt-7">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold">
                Tổng quan tòa nhà & phân tầng
              </h1>

              <p className="text-gray-500 mt-2">
                Theo dõi sức chứa bãi xe và quản lý cấu trúc phân tầng trong tòa
                nhà.
              </p>
            </div>

            <button className="bg-[#6246EA] text-white px-6 py-3 rounded-xl hover:bg-[#5337d8]">
              + Thêm tầng
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6 mt-8">
            <FloorStatCard
              title="Tổng số tầng"
              value="5"
              unit="Tầng"
              color="text-black"
            />

            <FloorStatCard
              title="Tổng sức chứa"
              value="1.250"
              unit="Slot"
              color="text-black"
            />

            <FloorStatCard
              title="Đang sử dụng"
              value="862"
              unit="Slot"
              color="text-black"
            />

            <FloorStatCard
              title="Tỷ lệ sử dụng"
              value="68.9%"
              unit=""
              color="text-green-600"
            />
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 mt-8 p-6">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <input
                type="text"
                placeholder="Tìm kiếm tầng..."
                className="col-span-2 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#6246EA]"
              />

              <select className="border border-gray-300 rounded-xl px-4 py-3">
                <option>Tất cả loại xe</option>
                <option>Ô tô</option>
                <option>Xe máy</option>
              </select>

              <select className="border border-gray-300 rounded-xl px-4 py-3">
                <option>Tất cả trạng thái</option>
                <option>Đang hoạt động</option>
                <option>Bảo trì</option>
              </select>
            </div>

            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left text-gray-500">
                  <th className="py-4">Tên tầng</th>
                  <th>Tổng Slot</th>
                  <th>Loại xe</th>
                  <th>Trạng thái</th>
                  <th>Ghi chú</th>
                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {floors.map((floor, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-5">
                      <p className="font-semibold">{floor.name}</p>

                      <p className="text-sm text-gray-500">{floor.type}</p>
                    </td>

                    <td>{floor.slot}</td>

                    <td>
                      <div className="flex gap-2">
                        {floor.vehicle.map((v, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          floor.status === "Đang hoạt động"
                            ? "bg-green-100 text-green-600"
                            : "bg-orange-100 text-orange-500"
                        }`}
                      >
                        {floor.status}
                      </span>
                    </td>

                    <td className="text-gray-600">{floor.note}</td>

                    <td>
                      <div className="flex justify-center gap-3">
                        <button className="text-[#6246EA] hover:text-[#5337d8]">
                          ✏️
                        </button>

                        <button className="text-red-500 hover:text-red-700">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-6">
              <p className="text-gray-500 text-sm">
                Hiển thị 1 - 5 trong tổng số 5 tầng
              </p>

              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-xl border">‹</button>

                <button className="w-10 h-10 rounded-xl bg-[#6246EA] text-white">
                  1
                </button>

                <button className="w-10 h-10 rounded-xl border">›</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
