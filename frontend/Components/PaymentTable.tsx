"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  reload: boolean;
  onEdit: (payment: any) => void;
}

export default function PaymentTable({
  reload,
  onEdit,
}: Props) {

  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    fetchPayments();
  }, [reload]);

  const fetchPayments = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/payments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {

        throw new Error("Không lấy được danh sách thanh toán.");

      }

      const data = await response.json();

      setPayments(data);

    } catch (err) {

      console.error(err);

    }

  };

  const handleDelete = async (id: number) => {

    if (!confirm("Bạn có chắc muốn xóa?")) return;

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(

        `http://127.0.0.1:8000/payments/${id}`,

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

      fetchPayments();

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

            <th className="p-5">

              Biển số

            </th>

            <th>

              Tổng tiền

            </th>

            <th>

              Phương thức

            </th>

            <th>

              Thời gian

            </th>

            <th>

              Mã GD

            </th>

            <th>

              Trạng thái

            </th>

            <th className="text-center">

              Thao tác

            </th>

          </tr>

        </thead>

        <tbody>

          {payments.map((payment)=>(

            <tr
              key={payment.PaymentID}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-5 font-semibold">

                {payment.PlateNumber}

              </td>

              <td>

                {Number(payment.Amount).toLocaleString()} đ

              </td>

              <td>

                {payment.PaymentMethod}

              </td>

              <td>

                {new Date(
                  payment.PaymentTime
                ).toLocaleString()}

              </td>

              <td>

                {payment.TransactionCode}

              </td>

              <td>

                {payment.PaymentStatus==="Paid"

                ?(

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">

                    Đã thanh toán

                  </span>

                )

                :(

                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">

                    Chưa thanh toán

                  </span>

                )}

              </td>

              <td>

                <div className="flex justify-center gap-4">

                  <button
                    onClick={()=>onEdit(payment)}
                    className="text-[#6246EA]"
                  >

                    <Pencil size={20}/>

                  </button>

                  <button
                    onClick={()=>handleDelete(payment.PaymentID)}
                    className="text-red-500"
                  >

                    <Trash2 size={20}/>

                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="flex justify-between items-center p-5 border-t">

        <span className="text-gray-500 text-sm">

          Hiển thị {payments.length} thanh toán

        </span>

      </div>

    </div>

  );

}