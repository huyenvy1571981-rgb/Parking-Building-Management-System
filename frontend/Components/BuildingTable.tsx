"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  reload: boolean;
  onEdit: (building: any) => void;
}

export default function BuildingTable({
  reload,
  onEdit,
}: Props) {
  const [buildings, setBuildings] = useState<any[]>([]);

  useEffect(() => {
    fetchBuildings();
  }, [reload]);

  // ============================
  // Lấy danh sách Building
  // ============================
  const fetchBuildings = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/buildings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Không lấy được danh sách Building");
      }

      const data = await response.json();

      setBuildings(data);

    } catch (error) {
      console.error(error);
    }
  };

  // ============================
  // Xóa Building
  // ============================
  const handleDelete = async (buildingID: number) => {

    if (!confirm("Bạn có chắc muốn xóa tòa nhà này?"))
      return;

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/buildings/${buildingID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Không thể xóa.");
        return;
      }

      alert("Xóa thành công.");

      fetchBuildings();

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

            <th className="p-5">ID</th>

            <th>Tên tòa nhà</th>

            <th>Địa chỉ</th>

            <th>Tổng tầng</th>

            <th>Mô tả</th>

            <th>Ngày tạo</th>

            <th>Trạng thái</th>

            <th className="text-center">
              Thao tác
            </th>

          </tr>

        </thead>

        <tbody>

          {buildings.map((building) => (

            <tr
              key={building.BuildingID}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-5 font-semibold">
                {building.BuildingID}
              </td>

              <td className="font-semibold">
                {building.BuildingName}
              </td>

              <td>
                {building.Address}
              </td>

              <td>
                {building.TotalFloors}
              </td>

              <td>
                {building.Description}
              </td>

              <td>
                {building.CreatedAt
                  ? new Date(
                      building.CreatedAt
                    ).toLocaleString()
                  : ""}
              </td>

              <td>

                {building.Status === 1 ? (

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

                  <button
                    onClick={() => onEdit(building)}
                    className="text-[#6246EA]"
                  >
                    <Pencil size={20} />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        building.BuildingID
                      )
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

          Hiển thị {buildings.length} tòa nhà

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