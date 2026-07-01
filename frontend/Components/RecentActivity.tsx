"use client";

export default function RecentActivity() {
  const data = [
    {
      plate: "59A-12345",
      owner: "Nguyễn Văn A",
      slot: "A-15",
      time: "08:10",
      status: "Đang gửi",
      color: "bg-green-100 text-green-600",
    },
    {
      plate: "51H-56789",
      owner: "Trần Thị B",
      slot: "B-08",
      time: "09:35",
      status: "Đã đặt",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      plate: "60A-88888",
      owner: "Lê Văn C",
      slot: "C-21",
      time: "10:05",
      status: "Đã ra",
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Hoạt động gần đây</h2>

          <p className="text-gray-500 mt-1">Phiên đỗ xe mới nhất</p>
        </div>

        <button className="bg-[#6246EA] hover:bg-[#5337d8] text-white px-5 py-2 rounded-xl">
          Xem tất cả
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b text-gray-500">
            <th className="text-left py-4">Biển số xe</th>
            <th className="text-left">Chủ xe</th>
            <th className="text-left">Vị trí</th>
            <th className="text-left">Giờ vào</th>
            <th className="text-left">Trạng thái</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition">
              <td className="py-5 font-semibold">{item.plate}</td>

              <td>{item.owner}</td>

              <td>{item.slot}</td>

              <td>{item.time}</td>

              <td>
                <span
                  className={`${item.color} px-4 py-1 rounded-full text-sm`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
