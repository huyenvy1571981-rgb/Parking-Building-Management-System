"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
  vehicleType: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditVehicleTypeModal({
  vehicleType,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [vehicleTypeName, setVehicleTypeName] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [hourlyPrice, setHourlyPrice] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!vehicleType) return;

    setVehicleTypeName(vehicleType.VehicleTypeName);
    setWidth(vehicleType.Width);
    setHeight(vehicleType.Height);
    setHourlyPrice(vehicleType.HourlyPrice);
    setDailyPrice(vehicleType.DailyPrice);
    setDescription(vehicleType.Description ?? "");
  }, [vehicleType]);

  const handleSave = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/vehicle-types/${vehicleType.VehicleTypeID}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            VehicleTypeName: vehicleTypeName,
            Width: Number(width),
            Height: Number(height),
            HourlyPrice: Number(hourlyPrice),
            DailyPrice: Number(dailyPrice),
            Description: description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail);
        return;
      }

      alert("Cập nhật thành công.");

      onSuccess();

      onClose();

    } catch (err) {

      console.error(err);

      alert("Không kết nối được Backend.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-[700px] p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">
            Cập nhật loại xe
          </h2>

          <button onClick={onClose}>
            <X size={24}/>
          </button>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <label>Tên loại xe</label>

            <input
              value={vehicleTypeName}
              onChange={(e)=>setVehicleTypeName(e.target.value)}
              className="w-full h-12 mt-2 border rounded-xl px-4"
            />

          </div>

          <div>

            <label>Chiều rộng</label>

            <input
              type="number"
              value={width}
              onChange={(e)=>setWidth(e.target.value)}
              className="w-full h-12 mt-2 border rounded-xl px-4"
            />

          </div>

          <div>

            <label>Chiều cao</label>

            <input
              type="number"
              value={height}
              onChange={(e)=>setHeight(e.target.value)}
              className="w-full h-12 mt-2 border rounded-xl px-4"
            />

          </div>

          <div>

            <label>Giá giờ</label>

            <input
              type="number"
              value={hourlyPrice}
              onChange={(e)=>setHourlyPrice(e.target.value)}
              className="w-full h-12 mt-2 border rounded-xl px-4"
            />

          </div>

          <div>

            <label>Giá ngày</label>

            <input
              type="number"
              value={dailyPrice}
              onChange={(e)=>setDailyPrice(e.target.value)}
              className="w-full h-12 mt-2 border rounded-xl px-4"
            />

          </div>

          <div>

            <label>Mô tả</label>

            <input
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              className="w-full h-12 mt-2 border rounded-xl px-4"
            />

          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-6 py-3 border rounded-xl"
          >
            Hủy
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-[#6246EA] text-white"
          >
            {loading ? "Đang lưu..." : "Cập nhật"}
          </button>

        </div>

      </div>

    </div>
  );
}