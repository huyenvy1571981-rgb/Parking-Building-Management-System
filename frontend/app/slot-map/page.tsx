"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";
import SlotBox from "@/Components/SlotBox";
import SlotInfoPopup from "@/Components/SlotInfoPopup";

export default function SlotMapPage() {

  const [open, setOpen] = useState(false);

  const [slots, setSlots] = useState<any[]>([]);

  const [floors, setFloors] = useState<any[]>([]);

  const [selectedSlot, setSelectedSlot] =
    useState<any>(null);

  const [search, setSearch] = useState("");

  const [selectedFloor, setSelectedFloor] =
    useState("All");

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const [slotRes, floorRes] =
        await Promise.all([

          fetch(
            "http://127.0.0.1:8000/parking-slots",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),

          fetch(
            "http://127.0.0.1:8000/floors",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),

        ]);

      if (!slotRes.ok || !floorRes.ok) {
        throw new Error("Không lấy được dữ liệu.");
      }

      const slotData =
        await slotRes.json();

      const floorData =
        await floorRes.json();

      setSlots(slotData);

      setFloors(floorData);

    } catch (err) {

      console.error(err);

    }

  };

  const convertStatus = (
    status: string
  ):
    | "empty"
    | "occupied"
    | "reserved"
    | "maintenance"
    | "disabled" => {

    switch (status) {

      case "Empty":
        return "empty";

      case "Occupied":
        return "occupied";

      case "Reserved":
        return "reserved";

      case "Maintenance":
        return "maintenance";

      default:
        return "disabled";

    }

  };

  const filteredSlots =
    slots.filter((slot) => {

      const matchFloor =
        selectedFloor === "All" ||
        slot.FloorName === selectedFloor;

      const matchSearch =
        slot.SlotCode
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchFloor && matchSearch;

    });

  const handleOpen = (slot: any) => {

    setSelectedSlot(slot);

    setOpen(true);

  };

  return (

    <div className="flex min-h-screen bg-[#F5F6FA]">

      <Sidebar />

      <main className="flex-1 p-7">

        <Header />

        <div className="mt-8">

          <h1 className="text-4xl font-bold">
            Sơ đồ Slot trực quan
          </h1>

          <p className="text-gray-500 mt-2">
            Theo dõi tình trạng sử dụng chỗ đỗ xe theo thời gian thực.
          </p>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm mt-8 p-6">

            <div className="flex gap-4 mb-6">

              <select
                value={selectedFloor}
                onChange={(e) =>
                  setSelectedFloor(e.target.value)
                }
                className="border rounded-xl px-4 py-3 w-52"
              >

                <option value="All">
                  Tất cả tầng
                </option>

                {floors.map((floor) => (

                  <option
                    key={floor.FloorID}
                    value={floor.FloorName}
                  >
                    {floor.FloorName}
                  </option>

                ))}

              </select>

              <input
                placeholder="Tìm kiếm Slot..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="flex-1 border rounded-xl px-4 py-3"
              />

            </div>

            <div className="flex gap-3 mb-8">

              <span className="px-4 py-2 rounded-lg bg-green-100 text-green-700">
                🟢 Trống
              </span>

              <span className="px-4 py-2 rounded-lg bg-red-100 text-red-600">
                🔴 Có xe
              </span>

              <span className="px-4 py-2 rounded-lg bg-blue-100 text-blue-600">
                🔵 Đặt trước
              </span>

              <span className="px-4 py-2 rounded-lg bg-yellow-100 text-yellow-700">
                🟡 Bảo trì
              </span>

            </div>

            <div className="overflow-x-auto">

              <div className="grid grid-cols-6 gap-6">
            
                          {filteredSlots.length === 0 ? (

                <div className="col-span-6 text-center text-gray-500 py-10">
                  Không có Parking Slot.
                </div>

              ) : (

                filteredSlots.map((slot) => (

                  <SlotBox
                    key={slot.SlotID}
                    code={slot.SlotCode}
                    status={convertStatus(slot.SlotStatus)}
                    plateNumber={slot.CurrentPlateNumber}
                    onClick={() => handleOpen(slot)}
                  />

                ))

              )}

              </div>

            </div>

            <SlotInfoPopup
              open={open}
              slot={selectedSlot}
              onClose={() => setOpen(false)}
            />

          </div>

        </div>

      </main>

    </div>

  );

  }
