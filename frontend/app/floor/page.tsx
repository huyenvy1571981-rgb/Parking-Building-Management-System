"use client";

import { useState } from "react";

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";

import FloorToolbar from "@/Components/FloorToolbar";
import FloorTable from "@/Components/FloorTable";
import AddFloorModal from "@/Components/AddFloorModal";
import EditFloorModal from "@/Components/EditFloorModal";

export default function FloorPage() {

  const [showModal, setShowModal] = useState(false);

  const [reload, setReload] = useState(false);

  const [editFloor, setEditFloor] = useState<any>(null);

  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">

      <Sidebar />

      <main className="flex-1 p-7">

        <Header />

        <div className="mt-8 space-y-8">

          <FloorToolbar
            onAdd={() => setShowModal(true)}
          />

          <FloorTable
            reload={reload}
            onEdit={(floor) => setEditFloor(floor)}
          />

        </div>

      </main>

      {showModal && (

        <AddFloorModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setReload(!reload);
            setShowModal(false);
          }}
        />

      )}

      {editFloor && (

        <EditFloorModal
          floor={editFloor}
          onClose={() => setEditFloor(null)}
          onSuccess={() => {
            setReload(!reload);
            setEditFloor(null);
          }}
        />

      )}

    </div>
  );
}