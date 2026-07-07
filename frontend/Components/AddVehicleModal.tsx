"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddVehicleModal({
  open,
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
    if (open) {
      fetchVehicleTypes();
    }
  }, [open]);

  const fetchVehicleTypes = async () => {
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

    if (data.length > 0) {
      setVehicleTypeID(data[0].VehicleTypeID);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/vehicles",
        {
          method: "POST",

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

      alert("Thêm phương tiện thành công.");

      onSuccess();

      onClose();

    } catch (err) {

      console.error(err);

      alert("Không kết nối được Backend.");

    } finally {

      setLoading(false);

    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-[650px] p-8">

        <div className="flex justify-between mb-6">

          <h2 className="text-3xl font-bold">
            Thêm phương tiện
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
            onClick={handleSave}
            className="bg-[#6246EA] text-white rounded-xl px-6 py-3"
          >

            {loading ? "Đang lưu..." : "Lưu"}

          </button>

        </div>

      </div>

    </div>
  );
}