"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
  vehicle: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditVehicleModal({
  vehicle,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [vehicleTypes, setVehicleTypes] = useState<any[]>([]);

  const [plateNumber, setPlateNumber] = useState("");
  const [vehicleTypeID, setVehicleTypeID] = useState(1);
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!vehicle) return;

    setPlateNumber(vehicle.PlateNumber);
    setVehicleTypeID(vehicle.VehicleTypeID);
    setOwnerName(vehicle.OwnerName);
    setPhone(vehicle.Phone);

    fetchVehicleTypes();
  }, [vehicle]);

  const fetchVehicleTypes = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/vehicle-types",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setVehicleTypes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/vehicles/${vehicle.VehicleID}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            PlateNumber: plateNumber,
            VehicleTypeID: vehicleTypeID,
            OwnerName: ownerName,
            Phone: phone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail);
        return;
      }

      alert("Cập nhật phương tiện thành công.");

      onSuccess();

      onClose();
    } catch (err) {
      console.error(err);

      alert("Không kết nối được Backend.");
    } finally {
      setLoading(false);
    }
  };

  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl w-[650px] p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">
            Cập nhật phương tiện
          </h2>

          <button onClick={onClose}>
            <X size={24}/>
          </button>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <label>Biển số</label>

            <input
              value={plateNumber}
              onChange={(e)=>setPlateNumber(e.target.value)}
              className="w-full border rounded-xl h-12 px-4 mt-2"
            />

          </div>

          <div>

            <label>Loại xe</label>

            <select
              value={vehicleTypeID}
              onChange={(e)=>setVehicleTypeID(Number(e.target.value))}
              className="w-full border rounded-xl h-12 px-4 mt-2"
            >

              {vehicleTypes.map((item)=>(
                <option
                  key={item.VehicleTypeID}
                  value={item.VehicleTypeID}
                >
                  {item.VehicleTypeName}
                </option>
              ))}

            </select>

          </div>

          <div>

            <label>Chủ xe</label>

            <input
              value={ownerName}
              onChange={(e)=>setOwnerName(e.target.value)}
              className="w-full border rounded-xl h-12 px-4 mt-2"
            />

          </div>

          <div>

            <label>Số điện thoại</label>

            <input
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              className="w-full border rounded-xl h-12 px-4 mt-2"
            />

          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="border rounded-xl px-6 py-3"
          >
            Hủy
          </button>

          <button
            disabled={loading}
            onClick={handleUpdate}
            className="bg-[#6246EA] text-white rounded-xl px-6 py-3"
          >
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </button>

        </div>

      </div>
    </div>
  );
}