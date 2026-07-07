"use client";

interface Props {
  data: number[];
}

export default function RevenueChart({
  data,
}: Props) {

  const days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  // Tìm giá trị lớn nhất để scale cột
  const maxValue = Math.max(...data, 1);

  return (

    <div className="h-[320px] flex items-end justify-between gap-4 px-4">

      {data.map((value, index) => (

        <div
          key={index}
          className="flex flex-col items-center flex-1"
        >

          <div
            className="w-full rounded-t-xl bg-gradient-to-t from-[#6246EA] to-[#8B7CF8] hover:opacity-80 transition"
            style={{
              height: `${(value / maxValue) * 240}px`,
            }}
          />

          <p className="mt-2 text-sm font-medium">
            {value.toLocaleString()}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {days[index]}
          </p>

        </div>

      ))}

    </div>

  );

}