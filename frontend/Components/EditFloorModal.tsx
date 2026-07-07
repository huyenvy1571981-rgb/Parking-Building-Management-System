"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
  floor: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditFloorModal({
  floor,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [buildingID, setBuildingID] = useState(1);
  const [floorName, setFloorName] = useState("");
  const [floorType, setFloorType] = useState("");
  const [totalSlots, setTotalSlots] = useState(0);
  const [status, setStatus] = useState(1);
  const [description, setDescription] = useState("");
  const [vehicleTypeID, setVehicleTypeID] = useState(1);

  useEffect(() => {
    if (!floor) return;

    setBuildingID(floor.BuildingID);
    setFloorName(floor.FloorName);
    setFloorType(floor.FloorType);
    setTotalSlots(floor.TotalSlots);
    setStatus(floor.Status);
    setDescription(floor.Description || "");
    setVehicleTypeID(floor.VehicleTypeID);
  }, [floor]);

  const handleSave = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/floors/${floor.FloorID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            BuildingID: buildingID,
            FloorName: floorName,
            FloorType: floorType,
            TotalSlots: totalSlots,
            Status: status,
            Description: description,
            VehicleTypeID: vehicleTypeID,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Không thể cập nhật tầng.");
        return;
      }

      alert("Cập nhật thành công.");

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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl w-[720px] p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">
            Chỉnh sửa tầng
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label>Tên tầng</label>

            <input
              value={floorName}
              onChange={(e) => setFloorName(e.target.value)}
              className="w-full h-12 border rounded-xl px-4 mt-2"
            />
          </div>

          <div>
            <label>Loại tầng</label>

            <input
              value={floorType}
              onChange={(e) => setFloorType(e.target.value)}
              className="w-full h-12 border rounded-xl px-4 mt-2"
            />
          </div>

          <div>
            <label>Số chỗ</label>

            <input
              type="number"
              value={totalSlots}
              onChange={(e) =>
                setTotalSlots(Number(e.target.value))
              }
              className="w-full h-12 border rounded-xl px-4 mt-2"
            />
          </div>

          <div>
            <label>Building ID</label>

            <input
              type="number"
              value={buildingID}
              onChange={(e) =>
                setBuildingID(Number(e.target.value))
              }
              className="w-full h-12 border rounded-xl px-4 mt-2"
            />
          </div>

          <div>
            <label>Vehicle Type</label>

            <input
              type="number"
              value={vehicleTypeID}
              onChange={(e) =>
                setVehicleTypeID(Number(e.target.value))
              }
              className="w-full h-12 border rounded-xl px-4 mt-2"
            />
          </div>

          <div>
            <label>Trạng thái</label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(Number(e.target.value))
              }
              className="w-full h-12 border rounded-xl px-4 mt-2"
            >
              <option value={1}>Hoạt động</option>
              <option value={0}>Đóng</option>
            </select>
          </div>

          <div className="col-span-2">

            <label>Mô tả</label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3 mt-2"
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
            className="px-6 py-3 bg-[#6246EA] text-white rounded-xl"
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>

        </div>

      </div>

    </div>
  );
}