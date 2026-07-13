"use client";

import { useState } from "react";

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";

import CameraPanel from "@/Components/CameraPanel";
import VehicleInfo from "@/Components/VehicleInfo";
import GateInfo from "@/Components/GateInfo";
import ConfirmEntryButton from "@/Components/ConfirmEntryButton";


export default function EntryPage() {
  const [plateNumber, setPlateNumber] = useState("");


  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  const [reload, setReload] = useState(false);
  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Sidebar />

      <main className="flex-1 p-7">
        <Header />

        <div className="mt-7">
          {/* Tiêu đề */}

          <h1 className="text-4xl font-bold">Quầy vào bãi</h1>

          <p className="text-gray-500 mt-2 text-lg">
            Quét biển số xe và xác nhận thông tin để xe vào bãi.
          </p>

          {/* Nội dung */}

          <div className="grid grid-cols-2 gap-8 mt-8">
            {/* Camera */}
          <CameraPanel
            plateNumber={plateNumber}
            setPlateNumber={setPlateNumber}
          
          />

            {/* Thông tin */}

            <div>
              <VehicleInfo
              plateNumber={plateNumber}
              />

              <GateInfo
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
              />

              <ConfirmEntryButton
              plateNumber={plateNumber}
              selectedSlot={selectedSlot}
              reload={reload}
              setReload={setReload}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
