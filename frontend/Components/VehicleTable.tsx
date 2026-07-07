"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  reload: boolean;
  onEdit: (vehicle: any) => void;
}

export default function VehicleTable({
  reload,
  onEdit,
}: Props) {

  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    fetchVehicles();
  }, [reload]);

  // ==========================
  // Lấy danh sách phương tiện
  // ==========================
  const fetchVehicles = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/vehicles",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Không lấy được danh sách phương tiện.");
      }

      const data = await response.json();

      setVehicles(data);

    } catch (err) {

      console.error(err);

    }

  };

  // ==========================
  // Xóa phương tiện
  // ==========================
  const handleDelete = async (id: number) => {

    if (!confirm("Bạn có chắc muốn xóa phương tiện này?")) return;

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/vehicles/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(data.detail);

        return;

      }

      alert("Xóa thành công.");

      fetchVehicles();

    } catch (err) {

      console.error(err);

      alert("Không thể kết nối Backend.");

    }

  };

  return (

    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr className="text-left">

            <th className="p-5">Biển số</th>

            <th>Loại xe</th>

            <th>Chủ xe</th>

            <th>Số điện thoại</th>

            <th>Ngày tạo</th>

            <th className="text-center">Thao tác</th>

          </tr>

        </thead>

        <tbody>

          {vehicles.map((vehicle) => (

            <tr
              key={vehicle.VehicleID}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-5 font-semibold">
                {vehicle.PlateNumber}
              </td>

              <td>

                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">

                  {vehicle.VehicleTypeName}

                </span>

              </td>

              <td>

                {vehicle.OwnerName}

              </td>

              <td>

                {vehicle.Phone}

              </td>

              <td>

                {vehicle.CreatedAt
                  ? new Date(vehicle.CreatedAt).toLocaleString()
                  : ""}

              </td>

              <td>

                <div className="flex justify-center gap-4">

                  <button
                    onClick={() => onEdit(vehicle)}
                    className="text-[#6246EA]"
                  >

                    <Pencil size={20} />

                  </button>

                  <button
                    onClick={() =>
                      handleDelete(vehicle.VehicleID)
                    }
                    className="text-red-500"
                  >

                    <Trash2 size={20} />

                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="flex justify-between items-center p-5 border-t">

        <span className="text-gray-500 text-sm">

          Hiển thị {vehicles.length} phương tiện

        </span>

      </div>

    </div>

  );

}