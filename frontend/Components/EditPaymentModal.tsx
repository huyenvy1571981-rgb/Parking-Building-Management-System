"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
  payment: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditPaymentModal({
  payment,
  onClose,
  onSuccess,
}: Props) {

  const [loading, setLoading] = useState(false);

  const [sessions, setSessions] = useState<any[]>([]);

  const [sessionID, setSessionID] = useState(0);

  const [amount, setAmount] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");

  const [paymentTime, setPaymentTime] = useState("");

  const [transactionCode, setTransactionCode] = useState("");

  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {

    if (!payment) return;

    fetchSessions();

    setSessionID(payment.SessionID);

    setAmount(String(payment.Amount));

    setPaymentMethod(payment.PaymentMethod);

    setPaymentTime(
      payment.PaymentTime
        ? payment.PaymentTime.slice(0,16)
        : ""
    );

    setTransactionCode(payment.TransactionCode);

    setPaymentStatus(payment.PaymentStatus);

  }, [payment]);

  const fetchSessions = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://127.0.0.1:8000/parking-sessions",
      {
        headers:{
          Authorization:`Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setSessions(data);

  };

  const handleUpdate = async () => {

    try{

      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(

        `http://127.0.0.1:8000/payments/${payment.PaymentID}`,

        {

          method:"PUT",

          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
          },

          body:JSON.stringify({

            SessionID:sessionID,

            Amount:Number(amount),

            PaymentMethod:paymentMethod,

            PaymentTime:paymentTime,

            TransactionCode:transactionCode,

            PaymentStatus:paymentStatus,

          })

        }

      );

      const data=await response.json();

      if(!response.ok){

        alert(data.detail);

        return;

      }

      alert("Cập nhật thành công.");

      onSuccess();

      onClose();

    }

    catch(err){

      console.error(err);

      alert("Không kết nối được Backend.");

    }

    finally{

      setLoading(false);

    }

  };

  if(!payment) return null;

  return(

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-[720px] p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">

            Cập nhật thanh toán

          </h2>

          <button onClick={onClose}>

            <X size={24}/>

          </button>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <label>Phiên gửi xe</label>

            <select

              value={sessionID}

              onChange={(e)=>setSessionID(Number(e.target.value))}

              className="w-full border rounded-xl h-12 px-4 mt-2"

            >

              {sessions.map((item)=>(

                <option
                  key={item.SessionID}
                  value={item.SessionID}
                >

                  {item.PlateNumber} - {item.SlotCode}

                </option>

              ))}

            </select>

          </div>

          <div>

            <label>Tổng tiền</label>

            <input

              type="number"

              value={amount}

              onChange={(e)=>setAmount(e.target.value)}

              className="w-full border rounded-xl h-12 px-4 mt-2"

            />

          </div>

          <div>

            <label>Phương thức</label>

            <select

              value={paymentMethod}

              onChange={(e)=>setPaymentMethod(e.target.value)}

              className="w-full border rounded-xl h-12 px-4 mt-2"

            >

              <option value="Cash">

                Cash

              </option>

              <option value="Banking">

                Banking

              </option>

              <option value="Momo">

                Momo

              </option>

            </select>

          </div>

          <div>

            <label>Thời gian</label>

            <input

              type="datetime-local"

              value={paymentTime}

              onChange={(e)=>setPaymentTime(e.target.value)}

              className="w-full border rounded-xl h-12 px-4 mt-2"

            />

          </div>

          <div>

            <label>Mã giao dịch</label>

            <input

              value={transactionCode}

              onChange={(e)=>setTransactionCode(e.target.value)}

              className="w-full border rounded-xl h-12 px-4 mt-2"

            />

          </div>

          <div>

            <label>Trạng thái</label>

            <select

              value={paymentStatus}

              onChange={(e)=>setPaymentStatus(e.target.value)}

              className="w-full border rounded-xl h-12 px-4 mt-2"

            >

              <option value="Paid">

                Paid

              </option>

              <option value="Pending">

                Pending

              </option>

            </select>

          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button

            onClick={onClose}

            className="border rounded-xl px-6 py-3"

          >

            Hủy

          </button>

          <button

            disabled={loading}

            onClick={handleUpdate}

            className="bg-[#6246EA] text-white rounded-xl px-6 py-3"

          >

            {loading
              ? "Đang cập nhật..."
              : "Cập nhật"}

          </button>

        </div>

      </div>

    </div>

  );

}