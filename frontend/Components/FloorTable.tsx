"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  reload: boolean;
  onEdit: (floor: any) => void;
}

export default function FloorTable({
  reload,
  onEdit,
}: Props) {
  const [floors, setFloors] = useState<any[]>([]);

  useEffect(() => {
    fetchFloors();
  }, [reload]);

  // ============================
  // Lấy danh sách tầng
  // ============================
  const fetchFloors = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/floors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Không lấy được danh sách tầng");
      }

      const data = await response.json();
      setFloors(data);
    } catch (error) {
      console.error(error);
    }
  };

  // ============================
  // Xóa tầng
  // ============================
  const handleDelete = async (floorID: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa tầng này?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/floors/${floorID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Không thể xóa tầng.");
        return;
      }

      alert("Đã xóa tầng thành công.");

      fetchFloors();
    } catch (error) {
      console.error(error);
      alert("Không thể kết nối Backend.");
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-50">
          <tr className="text-left">
            <th className="p-5">ID</th>
            <th>Tên tầng</th>
            <th>Loại tầng</th>
            <th>Tổng Slot</th>
            <th>Mô tả</th>
            <th>Ngày tạo</th>
            <th>Trạng thái</th>
            <th className="text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody>

          {floors.map((floor) => (

            <tr
              key={floor.FloorID}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-5 font-semibold">
                {floor.FloorID}
              </td>

              <td className="font-semibold">
                {floor.FloorName}
              </td>

              <td>{floor.FloorType}</td>

              <td>{floor.TotalSlots}</td>

              <td>{floor.Description}</td>

              <td>
                {floor.CreatedAt
                  ? new Date(floor.CreatedAt).toLocaleString()
                  : ""}
              </td>

              <td>
                {floor.Status === 1 ? (
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                    Hoạt động
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
                    Tạm khóa
                  </span>
                )}
              </td>

              <td>

                <div className="flex justify-center gap-4">

                  {/* Sửa */}
                  <button
                    onClick={() => onEdit(floor)}
                    className="text-[#6246EA] hover:text-[#4F37D8]"
                  >
                    <Pencil size={20} />
                  </button>

                  {/* Xóa */}
                  <button
                    onClick={() =>
                      handleDelete(floor.FloorID)
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* Footer */}

      <div className="flex justify-between items-center p-5 border-t">

        <span className="text-gray-500 text-sm">
          Hiển thị {floors.length} tầng
        </span>

        <div className="flex gap-2">

          <button className="w-10 h-10 border rounded-lg">
            &lt;
          </button>

          <button className="w-10 h-10 rounded-lg bg-[#6246EA] text-white">
            1
          </button>

          <button className="w-10 h-10 border rounded-lg">
            &gt;
          </button>

        </div>

      </div>

    </div>
  );
}