"use client";

import { useEffect, useState } from "react";
import { Clock3, DoorOpen } from "lucide-react";

type Props = {
  selectedSlot: any;
  setSelectedSlot: React.Dispatch<React.SetStateAction<any>>;
};

export default function GateInfo({
  selectedSlot,
  setSelectedSlot,
}: Props) {

  const [slots, setSlots] = useState<any[]>([]);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://127.0.0.1:8000/parking-slots",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setSlots(
        data.filter(
          (slot: any) =>
            slot.SlotStatus === "Empty"
        )
      );

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-3xl border border-gray-200 shadow-sm p-7">

      <h2 className="text-2xl font-bold mb-6">
        Thông tin vào bãi
      </h2>

      {/* Slot */}

      <div className="mb-6">

        <label className="font-semibold text-gray-700">
          Chọn Parking Slot
        </label>

        <select
          value={selectedSlot?.SlotID || ""}
          onChange={(e) => {

            const slot = slots.find(
              (s) =>
                s.SlotID === Number(e.target.value)
            );

            setSelectedSlot(slot);

          }}
          className="mt-3 w-full border rounded-xl px-4 py-3"
        >

          <option value="">
            Chọn Slot
          </option>

          {slots.map((slot) => (

            <option
              key={slot.SlotID}
              value={slot.SlotID}
            >
              {slot.SlotCode} - {slot.FloorName}
            </option>

          ))}

        </select>

      </div>

      {/* Gate */}

      <div className="grid grid-cols-2 gap-6">

        <div className="border rounded-2xl p-5 flex items-center gap-4">

          <DoorOpen
            className="text-[#6246EA]"
            size={30}
          />

          <div>

            <p className="text-gray-500">
              Cổng
            </p>

            <h2 className="text-3xl font-bold">
              #1
            </h2>

          </div>

        </div>

        <div className="border rounded-2xl p-5 flex items-center gap-4">

          <Clock3
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-gray-500">
              Giờ vào
            </p>

            <h2 className="text-2xl font-bold">
              {new Date().toLocaleTimeString()}
            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}