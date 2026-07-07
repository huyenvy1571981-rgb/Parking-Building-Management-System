"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  reload: boolean;
  onEdit: (session: any) => void;
}

export default function ParkingSessionTable({
  reload,
  onEdit,
}: Props) {
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    fetchSessions();
  }, [reload]);

  // ==========================
  // Lấy danh sách phiên gửi xe
  // ==========================
  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/parking-sessions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Không lấy được danh sách phiên gửi xe.");
      }

      const data = await response.json();

      setSessions(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================
  // Xóa phiên gửi xe
  // ==========================
  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa phiên gửi xe này?")) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/parking-sessions/${id}`,
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

      fetchSessions();
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

            <th>Slot</th>

            <th>Check In</th>

            <th>Check Out</th>

            <th>Thanh toán</th>

            <th>Tổng tiền</th>

            <th>Trạng thái</th>

            <th className="text-center">
              Thao tác
            </th>

          </tr>

        </thead>

        <tbody>

          {sessions.map((item) => (

            <tr
              key={item.SessionID}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-5 font-semibold">

                {item.PlateNumber}

              </td>

              <td>

                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">

                  {item.SlotCode}

                </span>

              </td>

              <td>

                {new Date(item.EntryTime).toLocaleString()}

              </td>

              <td>

                {item.ExitTime
                  ? new Date(item.ExitTime).toLocaleString()
                  : "-"}

              </td>

              <td>

                {item.PaymentStatus === "Paid" ? (

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">

                    Đã thanh toán

                  </span>

                ) : (

                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">

                    Chưa thanh toán

                  </span>

                )}

              </td>

              <td>

                {Number(item.TotalAmount).toLocaleString()} đ

              </td>

              <td>

                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">

                  {item.SessionStatus}

                </span>

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
                      handleDelete(item.SessionID)
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

          Hiển thị {sessions.length} phiên gửi xe

        </span>

      </div>

    </div>
  );
}