"use client";

export default function OccupancyChart() {
  const percent = 47;

  return (
    <div className="h-[320px] flex items-center justify-center">
      <div className="relative w-60 h-60">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 220 220">
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
            strokeDasharray={565}
            strokeDashoffset={565 - (565 * percent) / 100}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold text-[#6246EA]">{percent}%</h1>

          <p className="text-gray-500 mt-2">Occupancy</p>
        </div>
      </div>
    </div>
  );
}
