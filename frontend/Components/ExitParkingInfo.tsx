"use client";

import { Clock3, Timer, MapPin } from "lucide-react";

type Props = {
  parkingSession: any;
};

export default function ExitParkingInfo({
  parkingSession,
}: Props) {

  const formatDateTime = (date: string) => {

    if (!date) return "--";

    return new Date(date).toLocaleString("vi-VN");

  };

  const calculateDuration = () => {

    if (!parkingSession) return "--";

    const entry = new Date(parkingSession.EntryTime);

    const exit = new Date();

    const diff = exit.getTime() - entry.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));

    const minutes = Math.floor(
      (diff % (1000 * 60 * 60)) /
      (1000 * 60)
    );

    return `${hours} giờ ${minutes} phút`;

  };

  return (

    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Thông tin gửi xe
      </h2>

      <div className="space-y-5">

        {/* Giờ vào */}

        <div className="flex items-center gap-4">

          <Clock3
            className="text-[#6246EA]"
            size={26}
          />

          <div>

            <p className="text-gray-500">
              Giờ vào
            </p>

            <h3 className="font-bold text-lg">

              {formatDateTime(
                parkingSession?.EntryTime
              )}

            </h3>

          </div>

        </div>

        {/* Giờ ra */}

        <div className="flex items-center gap-4">

          <Clock3
            className="text-green-600"
            size={26}
          />

          <div>

            <p className="text-gray-500">
              Giờ ra
            </p>

            <h3 className="font-bold text-lg">

              {new Date().toLocaleString("vi-VN")}

            </h3>

          </div>

        </div>

        {/* Thời gian gửi */}

        <div className="flex items-center gap-4">

          <Timer
            className="text-orange-500"
            size={26}
          />

          <div>

            <p className="text-gray-500">
              Thời gian gửi
            </p>

            <h3 className="font-bold text-lg">

              {calculateDuration()}

            </h3>

          </div>

        </div>

        {/* Slot */}

        <div className="flex items-center gap-4">

          <MapPin
            className="text-red-500"
            size={26}
          />

          <div>

            <p className="text-gray-500">
              Parking Slot
            </p>

            <h3 className="font-bold text-lg">

              {parkingSession?.SlotID || "--"}

            </h3>

          </div>

        </div>

      </div>

    </div>

  );

}