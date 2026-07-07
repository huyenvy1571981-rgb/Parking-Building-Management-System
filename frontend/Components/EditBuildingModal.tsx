"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
  building: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditBuildingModal({
  building,
  onClose,
  onSuccess,
}: Props) {

  const [loading, setLoading] = useState(false);

  const [buildingName, setBuildingName] = useState("");
  const [address, setAddress] = useState("");
  const [totalFloors, setTotalFloors] = useState(1);
  const [status, setStatus] = useState(1);
  const [description, setDescription] = useState("");

  useEffect(() => {

    if (!building) return;

    setBuildingName(building.BuildingName);
    setAddress(building.Address);
    setTotalFloors(building.TotalFloors);
    setStatus(building.Status);
    setDescription(building.Description || "");

  }, [building]);

  const handleSave = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/buildings/${building.BuildingID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            BuildingName: buildingName,
            Address: address,
            TotalFloors: totalFloors,
            Status: status,
            Description: description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Không thể cập nhật.");
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
            Chỉnh sửa tòa nhà
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <label>Tên tòa nhà</label>

            <input
              value={buildingName}
              onChange={(e) =>
                setBuildingName(e.target.value)
              }
              className="w-full h-12 border rounded-xl px-4 mt-2"
            />

          </div>

          <div>

            <label>Tổng số tầng</label>

            <input
              type="number"
              value={totalFloors}
              onChange={(e) =>
                setTotalFloors(Number(e.target.value))
              }
              className="w-full h-12 border rounded-xl px-4 mt-2"
            />

          </div>

          <div className="col-span-2">

            <label>Địa chỉ</label>

            <input
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
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
              <option value={1}>
                Hoạt động
              </option>

              <option value={0}>
                Tạm khóa
              </option>

            </select>

          </div>

          <div></div>

          <div className="col-span-2">

            <label>Mô tả</label>

            <textarea
              rows={4}
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