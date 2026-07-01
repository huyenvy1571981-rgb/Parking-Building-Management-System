"use client";

export default function SlotLegend() {
  const items = [
    {
      color: "bg-green-500",
      text: "Trống",
    },
    {
      color: "bg-red-500",
      text: "Đang sử dụng",
    },
    {
      color: "bg-yellow-400",
      text: "Đã đặt trước",
    },
    {
      color: "bg-gray-500",
      text: "Bảo trì",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mt-6">
      <h2 className="text-xl font-bold mb-4">Chú thích</h2>

      <div className="flex flex-wrap gap-8">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full ${item.color}`} />

            <span className="text-gray-700 font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
