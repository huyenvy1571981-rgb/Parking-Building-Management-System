"use client";

import { useState } from "react";

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";

import ParkingSessionToolbar from "@/Components/ParkingSessionToolbar";
import ParkingSessionTable from "@/Components/ParkingSessionTable";

import AddParkingSessionModal from "@/Components/AddParkingSessionModal";
import EditParkingSessionModal from "@/Components/EditParkingSessionModal";

export default function ParkingSessionPage() {

  const [reload, setReload] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);

  const [editSession, setEditSession] = useState<any>(null);

  const handleReload = () => {
    setReload(!reload);
  };

  return (

    <div className="flex min-h-screen bg-[#F5F6FA]">

      <Sidebar />

      <main className="flex-1 p-7">

        <Header />

        <div className="mt-8">

          <ParkingSessionToolbar
            onAdd={() => setOpenAdd(true)}
          />

          <div className="mt-8">

            <ParkingSessionTable
              reload={reload}
              onEdit={(item) => setEditSession(item)}
            />

          </div>

        </div>

      </main>

      <AddParkingSessionModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={handleReload}
      />

      {editSession && (
        <EditParkingSessionModal
          session={editSession}
          onClose={() => setEditSession(null)}
          onSuccess={handleReload}
        />
      )}

    </div>

  );

}