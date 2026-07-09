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

  const maxValue = Math.max(...data, 1);

  return (

    <div className="mt-6 h-[320px] flex items-end justify-between gap-4 px-4">

      {data.map((value, index) => (

        <div
          key={index}
          className="flex flex-col items-center flex-1"
        >

          {/* Bar */}

          <div
            className="
              w-full
              rounded-t-2xl
              bg-gradient-to-t
              from-[#6246EA]
              to-[#8D7BFF]
              transition-all
              duration-300
              hover:opacity-80
            "
            style={{
              height: `${Math.max(
                (value / maxValue) * 170,
                8
              )}px`,
            }}
          />

          {/* Value */}

          <p className="mt-3 text-[13px] font-semibold text-[#151930]">

            {value.toLocaleString()}

          </p>

          {/* Day */}

          <p className="mt-1 text-[13px] text-gray-400">

            {days[index]}

          </p>

        </div>

      ))}

    </div>

  );

}