"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
  session: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditParkingSessionModal({
  session,
  onClose,
  onSuccess,
}: Props) {

  const [loading, setLoading] = useState(false);

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);

  const [vehicleID, setVehicleID] = useState(0);
  const [slotID, setSlotID] = useState(0);

  const [entryTime, setEntryTime] = useState("");
  const [exitTime, setExitTime] = useState("");

  const [paymentStatus, setPaymentStatus] = useState("");

  const [totalAmount, setTotalAmount] = useState("");

  const [sessionStatus, setSessionStatus] = useState("");

  useEffect(() => {

    if (!session) return;

    fetchVehicles();

    fetchSlots();

    setVehicleID(session.VehicleID);

    setSlotID(session.SlotID);

    setEntryTime(
      session.EntryTime
        ? session.EntryTime.slice(0, 16)
        : ""
    );

    setExitTime(
      session.ExitTime
        ? session.ExitTime.slice(0, 16)
        : ""
    );

    setPaymentStatus(session.PaymentStatus);

    setTotalAmount(String(session.TotalAmount));

    setSessionStatus(session.SessionStatus);

  }, [session]);

  const fetchVehicles = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://127.0.0.1:8000/vehicles",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setVehicles(data);

  };

  const fetchSlots = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://127.0.0.1:8000/parking-slots",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setSlots(data);

  };

  const handleUpdate = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/parking-sessions/${session.SessionID}`,
        {

          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({

            VehicleID: vehicleID,

            SlotID: slotID,

            EntryTime: entryTime,

            ExitTime: exitTime || null,

            PaymentStatus: paymentStatus,

            TotalAmount: Number(totalAmount),

            SessionStatus: sessionStatus,

          }),

        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(data.detail);

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

  if (!session) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-[760px] p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">

            Cập nhật phiên gửi xe

          </h2>

          <button onClick={onClose}>
            <X size={24}/>
          </button>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <label>Phương tiện</label>

            <select
              value={vehicleID}
              onChange={(e)=>
                setVehicleID(Number(e.target.value))
              }
              className="w-full border rounded-xl h-12 px-4 mt-2"
            >

              {vehicles.map((item)=>(

                <option
                  key={item.VehicleID}
                  value={item.VehicleID}
                >

                  {item.PlateNumber}

                </option>

              ))}

            </select>

          </div>

          <div>

            <label>Slot</label>

            <select
              value={slotID}
              onChange={(e)=>
                setSlotID(Number(e.target.value))
              }
              className="w-full border rounded-xl h-12 px-4 mt-2"
            >

              {slots.map((item)=>(

                <option
                  key={item.SlotID}
                  value={item.SlotID}
                >

                  {item.SlotCode}

                </option>

              ))}

            </select>

          </div>

          <div>

            <label>Check In</label>

            <input
              type="datetime-local"
              value={entryTime}
              onChange={(e)=>setEntryTime(e.target.value)}
              className="w-full border rounded-xl h-12 px-4 mt-2"
            />

          </div>

          <div>

            <label>Check Out</label>

            <input
              type="datetime-local"
              value={exitTime}
              onChange={(e)=>setExitTime(e.target.value)}
              className="w-full border rounded-xl h-12 px-4 mt-2"
            />

          </div>

          <div>

            <label>Thanh toán</label>

            <select
              value={paymentStatus}
              onChange={(e)=>setPaymentStatus(e.target.value)}
              className="w-full border rounded-xl h-12 px-4 mt-2"
            >

              <option value="Paid">

                Paid

              </option>

              <option value="Unpaid">

                Unpaid

              </option>

            </select>

          </div>

          <div>

            <label>Tổng tiền</label>

            <input
              type="number"
              value={totalAmount}
              onChange={(e)=>setTotalAmount(e.target.value)}
              className="w-full border rounded-xl h-12 px-4 mt-2"
            />

          </div>

          <div className="col-span-2">

            <label>Trạng thái phiên</label>

            <select
              value={sessionStatus}
              onChange={(e)=>setSessionStatus(e.target.value)}
              className="w-full border rounded-xl h-12 px-4 mt-2"
            >

              <option value="Parking">

                Parking

              </option>

              <option value="Completed">

                Completed

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