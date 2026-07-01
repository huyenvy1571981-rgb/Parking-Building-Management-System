"use client";

export default function RevenueChart() {
  const data = [40, 75, 55, 95, 70, 120, 90];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="h-[320px] flex items-end justify-between gap-4 px-4">
      {data.map((value, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div
            className="w-full rounded-t-xl bg-gradient-to-t from-[#6246EA] to-[#8B7CF8] hover:opacity-80 transition"
            style={{
              height: `${value * 2}px`,
            }}
          />

          <p className="mt-3 text-sm text-gray-500">{days[index]}</p>
        </div>
      ))}
    </div>
  );
}
