"use client";

import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  slot: any;
};

export default function EditParkingSlotModal({
  open,
  onClose,
  onSuccess,
  slot,
}: Props) {
  const [floors, setFloors] = useState<any[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<any[]>([]);

  const [form, setForm] = useState({
    FloorID: "",
    VehicleTypeID: "",
    SlotCode: "",
    SlotStatus: "",
    IsActive: true,
  });

  useEffect(() => {
    if (!open || !slot) return;

    fetchData();

    setForm({
      FloorID: String(slot.FloorID),
      VehicleTypeID: String(slot.VehicleTypeID),
      SlotCode: slot.SlotCode,
      SlotStatus: slot.SlotStatus,
      IsActive: slot.IsActive,
    });
  }, [open, slot]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");

    const floorRes = await fetch(
      "http://127.0.0.1:8000/floors",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const vehicleRes = await fetch(
      "http://127.0.0.1:8000/vehicle-types",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setFloors(await floorRes.json());
    setVehicleTypes(await vehicleRes.json());
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/parking-slots/${slot.SlotID}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            FloorID: Number(form.FloorID),
            VehicleTypeID: Number(form.VehicleTypeID),
            SlotCode: form.SlotCode,
            SlotStatus: form.SlotStatus,
            IsActive: form.IsActive,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Không thể cập nhật Parking Slot");
    }
  };

  if (!open || !slot) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl w-[520px] p-7">

        <h2 className="text-2xl font-bold mb-6">
          Cập nhật Parking Slot
        </h2>

        <div className="space-y-4">

          <select
            className="w-full border rounded-xl p-3"
            value={form.FloorID}
            onChange={(e) =>
              setForm({
                ...form,
                FloorID: e.target.value,
              })
            }
          >
            {floors.map((floor) => (
              <option
                key={floor.FloorID}
                value={floor.FloorID}
              >
                {floor.FloorName}
              </option>
            ))}
          </select>

          <select
            className="w-full border rounded-xl p-3"
            value={form.VehicleTypeID}
            onChange={(e) =>
              setForm({
                ...form,
                VehicleTypeID: e.target.value,
              })
            }
          >
            {vehicleTypes.map((vehicle) => (
              <option
                key={vehicle.VehicleTypeID}
                value={vehicle.VehicleTypeID}
              >
                {vehicle.VehicleTypeName}
              </option>
            ))}
          </select>

          <input
            className="w-full border rounded-xl p-3"
            value={form.SlotCode}
            onChange={(e) =>
              setForm({
                ...form,
                SlotCode: e.target.value,
              })
            }
          />

          <select
            className="w-full border rounded-xl p-3"
            value={form.SlotStatus}
            onChange={(e) =>
              setForm({
                ...form,
                SlotStatus: e.target.value,
              })
            }
          >
            <option>Empty</option>
            <option>Occupied</option>
            <option>Reserved</option>
            <option>Maintenance</option>
          </select>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.IsActive}
              onChange={(e) =>
                setForm({
                  ...form,
                  IsActive: e.target.checked,
                })
              }
            />

            Active
          </label>

        </div>

        <div className="flex justify-end gap-4 mt-7">

          <button
            onClick={onClose}
            className="px-5 py-3 border rounded-xl"
          >
            Hủy
          </button>

          <button
            onClick={handleUpdate}
            className="px-6 py-3 bg-[#6246EA] text-white rounded-xl"
          >
            Lưu
          </button>

        </div>

      </div>

    </div>
  );
}