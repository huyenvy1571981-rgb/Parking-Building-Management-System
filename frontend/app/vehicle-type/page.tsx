"use client";

import { useState } from "react";

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";

import VehicleTypeToolbar from "@/Components/VehicleTypeToolbar";
import VehicleTypeTable from "@/Components/VehicleTypeTable";

import AddVehicleTypeModal from "@/Components/AddVehicleTypeModal";
import EditVehicleTypeModal from "@/Components/EditVehicleTypeModal";

export default function VehicleTypePage() {

  const [reload, setReload] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);

  const [editData, setEditData] = useState<any>(null);

  const handleReload = () => {
    setReload(!reload);
  };

  return (

    <div className="flex min-h-screen bg-[#F5F6FA]">

      <Sidebar />

      <main className="flex-1 p-7">

        <Header />

        <div className="mt-8">

          <VehicleTypeToolbar
            onAdd={() => setOpenAdd(true)}
          />

          <div className="mt-8">

            <VehicleTypeTable
              reload={reload}
              onEdit={(item) => setEditData(item)}
            />

          </div>

        </div>

      </main>

      <AddVehicleTypeModal

        open={openAdd}

        onClose={() => setOpenAdd(false)}

        onSuccess={handleReload}

      />

      {editData && (

        <EditVehicleTypeModal

          vehicleType={editData}

          onClose={() => setEditData(null)}

          onSuccess={handleReload}

        />

      )}

    </div>

  );

}