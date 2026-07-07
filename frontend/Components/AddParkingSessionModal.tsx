"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddParkingSessionModal({
  open,
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

  const [paymentStatus, setPaymentStatus] = useState("Unpaid");

  const [totalAmount, setTotalAmount] = useState("");

  const [sessionStatus, setSessionStatus] = useState("Parking");

  useEffect(() => {
    if (open) {
      fetchVehicles();
      fetchSlots();
    }
  }, [open]);

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

    if (data.length > 0) {
      setVehicleID(data[0].VehicleID);
    }
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

    if (data.length > 0) {
      setSlotID(data[0].SlotID);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/parking-sessions",
        {
          method: "POST",

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

      alert("Tạo phiên gửi xe thành công.");

      onSuccess();

      onClose();
    } catch (err) {
      console.error(err);
      alert("Không kết nối Backend.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl w-[760px] p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">
            Tạo phiên gửi xe
          </h2>

          <button onClick={onClose}>
            <X size={24} />
          </button>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label>Phương tiện</label>

            <select
              value={vehicleID}
              onChange={(e) =>
                setVehicleID(Number(e.target.value))
              }
              className="w-full h-12 border rounded-xl px-4 mt-2"
            >
              {vehicles.map((v) => (
                <option
                  key={v.VehicleID}
                  value={v.VehicleID}
                >
                  {v.PlateNumber}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Slot</label>

            <select
              value={slotID}
              onChange={(e) =>
                setSlotID(Number(e.target.value))
              }
              className="w-full h-12 border rounded-xl px-4 mt-2"
            >
              {slots.map((s) => (
                <option
                  key={s.SlotID}
                  value={s.SlotID}
                >
                  {s.SlotCode}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Check In</label>

            <input
              type="datetime-local"
              value={entryTime}
              onChange={(e) =>
                setEntryTime(e.target.value)
              }
              className="w-full h-12 border rounded-xl px-4 mt-2"
            />
          </div>

          <div>
            <label>Check Out</label>

            <input
              type="datetime-local"
              value={exitTime}
              onChange={(e) =>
                setExitTime(e.target.value)
              }
              className="w-full h-12 border rounded-xl px-4 mt-2"
            />
          </div>

          <div>
            <label>Thanh toán</label>

            <select
              value={paymentStatus}
              onChange={(e) =>
                setPaymentStatus(e.target.value)
              }
              className="w-full h-12 border rounded-xl px-4 mt-2"
            >
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>

          <div>
            <label>Tổng tiền</label>

            <input
              type="number"
              value={totalAmount}
              onChange={(e) =>
                setTotalAmount(e.target.value)
              }
              className="w-full h-12 border rounded-xl px-4 mt-2"
            />
          </div>

          <div className="col-span-2">
            <label>Trạng thái phiên</label>

            <select
              value={sessionStatus}
              onChange={(e) =>
                setSessionStatus(e.target.value)
              }
              className="w-full h-12 border rounded-xl px-4 mt-2"
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
            onClick={handleSave}
            className="bg-[#6246EA] text-white rounded-xl px-6 py-3"
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>

        </div>

      </div>

    </div>
  );
}