"use client";

type Props = {
  code: string;
  type: string;
  status: "empty" | "occupied" | "reserved" | "maintenance";
};

export default function SlotCard({ code, type, status }: Props) {
  const color = {
    empty: "bg-green-500",
    occupied: "bg-red-500",
    reserved: "bg-yellow-400",
    maintenance: "bg-gray-500",
  };

  const text = {
    empty: "Trống",
    occupied: "Đang sử dụng",
    reserved: "Đã đặt",
    maintenance: "Bảo trì",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-lg transition">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl">{code}</h2>

        <div className={`w-4 h-4 rounded-full ${color[status]}`} />
      </div>

      <p className="text-gray-500 mt-4">{type}</p>

      <div
        className={`mt-5 inline-block px-4 py-2 rounded-full text-white text-sm ${color[status]}`}
      >
        {text[status]}
      </div>
    </div>
  );
}
