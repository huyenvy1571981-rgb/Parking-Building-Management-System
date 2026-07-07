"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  reload: boolean;
  onEdit: (vehicleType: any) => void;
}

export default function VehicleTypeTable({
  reload,
  onEdit,
}: Props) {
  const [vehicleTypes, setVehicleTypes] = useState<any[]>([]);

  useEffect(() => {
    fetchVehicleTypes();
  }, [reload]);

  // ==========================
  // Lấy danh sách loại xe
  // ==========================
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

      if (!response.ok) {
        throw new Error("Không lấy được danh sách loại xe");
      }

      const data = await response.json();

      setVehicleTypes(data);

    } catch (err) {
      console.error(err);
    }
  };

  // ==========================
  // Xóa loại xe
  // ==========================
  const handleDelete = async (id: number) => {

    if (!confirm("Bạn có chắc muốn xóa loại xe này?"))
      return;

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(

        `http://127.0.0.1:8000/vehicle-types/${id}`,

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

      fetchVehicleTypes();

    } catch (err) {

      console.error(err);

      alert("Không kết nối được Backend.");

    }

  };

  return (

    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr className="text-left">

            <th className="p-5">Tên loại xe</th>

            <th>Chiều rộng</th>

            <th>Chiều cao</th>

            <th>Giá giờ</th>

            <th>Giá ngày</th>

            <th>Mô tả</th>

            <th>Ngày tạo</th>

            <th className="text-center">Thao tác</th>

          </tr>

        </thead>

        <tbody>

          {vehicleTypes.map((item) => (

            <tr
              key={item.VehicleTypeID}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-5 font-semibold">
                {item.VehicleTypeName}
              </td>

              <td>
                {item.Width}
              </td>

              <td>
                {item.Height}
              </td>

              <td>
                {Number(item.HourlyPrice).toLocaleString()} đ
              </td>

              <td>
                {Number(item.DailyPrice).toLocaleString()} đ
              </td>

              <td>
                {item.Description}
              </td>

              <td>

                {item.CreatedAt
                  ? new Date(item.CreatedAt).toLocaleString()
                  : ""}

              </td>

              <td>

                <div className="flex justify-center gap-4">

                  <button
                    onClick={() => onEdit(item)}
                    className="text-[#6246EA]"
                  >

                    <Pencil size={20} />

                  </button>

                  <button
                    onClick={() =>
                      handleDelete(item.VehicleTypeID)
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

          Hiển thị {vehicleTypes.length} loại xe

        </span>

      </div>

    </div>

  );

}