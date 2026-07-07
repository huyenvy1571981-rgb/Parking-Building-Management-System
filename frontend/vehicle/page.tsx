"use client";

import { useState } from "react";

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";

import VehicleToolbar from "@/Components/VehicleToolbar";
import VehicleTable from "@/Components/VehicleTable";

import AddVehicleModal from "@/Components/AddVehicleModal";
import EditVehicleModal from "@/Components/EditVehicleModal";

export default function VehiclePage() {

  const [reload, setReload] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);

  const [editVehicle, setEditVehicle] = useState<any>(null);

  const handleReload = () => {
    setReload(!reload);
  };

  return (

    <div className="flex min-h-screen bg-[#F5F6FA]">

      <Sidebar />

      <main className="flex-1 p-7">

        <Header />

        <div className="mt-8">

          <VehicleToolbar
            onAdd={() => setOpenAdd(true)}
          />

          <div className="mt-8">

            <VehicleTable
              reload={reload}
              onEdit={(vehicle) => setEditVehicle(vehicle)}
            />

          </div>

        </div>

      </main>

      <AddVehicleModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={handleReload}
      />

      {editVehicle && (

        <EditVehicleModal
          vehicle={editVehicle}
          onClose={() => setEditVehicle(null)}
          onSuccess={handleReload}
        />

      )}

    </div>

  );

}