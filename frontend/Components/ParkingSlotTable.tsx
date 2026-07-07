"use client";

import { useEffect, useState } from "react";

type Props = {
  reload: boolean;
  onEdit: (slot: any) => void;
};

export default function ParkingSlotTable({
  reload,
  onEdit,
}: Props) {
  const [slots, setSlots] = useState<any[]>([]);

  const fetchSlots = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/parking-slots",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Không lấy được Parking Slot");
      }

      const data = await response.json();

      setSlots(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [reload]);

  const deleteSlot = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa Slot này?")) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/parking-slots/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Xóa thất bại");
      }

      fetchSlots();
    } catch (error) {
      console.error(error);
      alert("Không thể xóa Parking Slot.");
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

      <table className="w-full">

        <thead className="border-b">

          <tr className="text-left text-gray-500">

            <th className="py-4">Slot</th>

            <th>Tầng</th>

            <th>Loại xe</th>

            <th>Trạng thái</th>

            <th>Hoạt động</th>

            <th className="text-center">
              Thao tác
            </th>

          </tr>

        </thead>

        <tbody>

          {slots.map((slot) => (

            <tr
              key={slot.SlotID}
              className="border-b hover:bg-gray-50"
            >

              <td className="py-5 font-semibold">
                {slot.SlotCode}
              </td>

              <td>
                {slot.FloorName}
              </td>

              <td>
                {slot.VehicleTypeName}
              </td>

              <td>

                <span
                  className={`px-3 py-1 rounded-full text-sm

                  ${
                    slot.SlotStatus === "Empty"
                      ? "bg-green-100 text-green-700"
                      : slot.SlotStatus === "Occupied"
                      ? "bg-red-100 text-red-700"
                      : slot.SlotStatus === "Reserved"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                  `}
                >

                  {slot.SlotStatus}

                </span>

              </td>

              <td>

                {slot.IsActive ? (
                  <span className="text-green-600 font-medium">
                    Active
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">
                    Inactive
                  </span>
                )}

              </td>

              <td>

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(slot)}
                    className="text-[#6246EA]"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => deleteSlot(slot.SlotID)}
                    className="text-red-500"
                  >
                    🗑️
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}