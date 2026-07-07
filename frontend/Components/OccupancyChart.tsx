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

  const circumference = 565;

  const offset =
    circumference - (circumference * percent) / 100;

  return (

    <div className="h-[320px] flex items-center justify-center">

      <div className="relative w-60 h-60">

        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 220 220"
        >

          {/* Background */}

          <circle
            cx="110"
            cy="110"
            r="90"
            stroke="#ECEBFF"
            strokeWidth="18"
            fill="none"
          />

          {/* Progress */}

          <circle
            cx="110"
            cy="110"
            r="90"
            stroke="#6246EA"
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />

        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <h1 className="text-5xl font-bold text-[#6246EA]">
            {percent}%
          </h1>

          <p className="text-gray-500 mt-2">
            Occupancy
          </p>

          <p className="text-sm mt-3 text-green-600">

            {occupied} / {total} Slots

          </p>

        </div>

      </div>

    </div>

  );

}