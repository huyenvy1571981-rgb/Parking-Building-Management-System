"use client";

interface Props {
  occupied: number;
  available: number;
}

export default function OccupancyChart({
  occupied,
  available,
}: Props) {
  const total = occupied + available;

  const percent =
    total > 0
      ? Math.round((occupied / total) * 100)
      : 0;

  const radius = 72;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (circumference * percent) / 100;

  return (
    <div className="h-[260px] flex items-center justify-center">

      <div className="relative w-[210px] h-[210px]">

        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 200 200"
        >

          {/* Background */}

          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#ECEBFF"
            strokeWidth="14"
            fill="none"
          />

          {/* Progress */}

          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#6246EA"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />

        </svg>

        {/* Center */}

        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <h2 className="text-[42px] font-bold text-[#6246EA]">
            {percent}%
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Occupancy
          </p>

          <div className="mt-4 text-center">

            <p className="text-[15px] font-semibold text-[#151930]">
              {occupied} / {total}
            </p>

            <p className="text-xs text-gray-500">
              Parking Slots
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}