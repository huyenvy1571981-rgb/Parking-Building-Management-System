"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddVehicleTypeModal({
  open,
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

  if (!open) return null;

  const clearForm = () => {
    setVehicleTypeName("");
    setWidth("");
    setHeight("");
    setHourlyPrice("");
    setDailyPrice("");
    setDescription("");
  };

  const handleSave = async () => {

    if (
      !vehicleTypeName ||
      !width ||
      !height ||
      !hourlyPrice ||
      !dailyPrice
    ) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/vehicle-types",
        {
          method: "POST",

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

      alert("Thêm loại xe thành công.");

      clearForm();

      onSuccess();

      onClose();

    } catch (err) {

      console.error(err);

      alert("Không thể kết nối Backend.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-[700px] p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">
            Thêm loại xe
          </h2>

          <button onClick={onClose}>
            <X size={24}/>
          </button>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <label>Tên loại xe *</label>

            <input
              value={vehicleTypeName}
              onChange={(e)=>setVehicleTypeName(e.target.value)}
              className="w-full h-12 mt-2 border rounded-xl px-4"
            />

          </div>

          <div>

            <label>Chiều rộng *</label>

            <input
              type="number"
              value={width}
              onChange={(e)=>setWidth(e.target.value)}
              className="w-full h-12 mt-2 border rounded-xl px-4"
            />

          </div>

          <div>

            <label>Chiều cao *</label>

            <input
              type="number"
              value={height}
              onChange={(e)=>setHeight(e.target.value)}
              className="w-full h-12 mt-2 border rounded-xl px-4"
            />

          </div>

          <div>

            <label>Giá theo giờ *</label>

            <input
              type="number"
              value={hourlyPrice}
              onChange={(e)=>setHourlyPrice(e.target.value)}
              className="w-full h-12 mt-2 border rounded-xl px-4"
            />

          </div>

          <div>

            <label>Giá theo ngày *</label>

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
            disabled={loading}
            onClick={handleSave}
            className="px-6 py-3 bg-[#6246EA] text-white rounded-xl"
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>

        </div>

      </div>

    </div>

  );

}