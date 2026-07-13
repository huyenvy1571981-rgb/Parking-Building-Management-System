"use client";

import { useState } from "react";

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";

import ParkingSlotToolbar from "@/Components/ParkingSlotToolbar";
import ParkingSlotTable from "@/Components/ParkingSlotTable";
import AddParkingSlotModal from "@/Components/AddParkingSlotModal";
import EditParkingSlotModal from "@/Components/EditParkingSlotModal";

export default function ParkingSlotPage() {

  const [reload, setReload] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  return (

    <div className="flex min-h-screen bg-[#F5F6FA]">

      <Sidebar />

      <main className="flex-1 p-7">

        <Header />

        <div className="mt-7">

          <ParkingSlotToolbar
            onAdd={() => setOpenAdd(true)}
          />

          <ParkingSlotTable
            reload={reload}
            onEdit={(slot) => {
              setSelectedSlot(slot);
              setOpenEdit(true);
            }}
          />

        </div>

      </main>

      <AddParkingSlotModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={() => setReload(!reload)}
      />

      <EditParkingSlotModal
        open={openEdit}
        slot={selectedSlot}
        onClose={() => setOpenEdit(false)}
        onSuccess={() => setReload(!reload)}
      />

    </div>

  );

}