"use client";

import { useState } from "react";

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";

import BuildingToolbar from "@/Components/BuildingToolbar";
import BuildingTable from "@/Components/BuildingTable";
import AddBuildingModal from "@/Components/AddBuildingModal";
import EditBuildingModal from "@/Components/EditBuildingModal";

export default function BuildingPage() {

  const [reload, setReload] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);

  return (

    <div className="flex min-h-screen bg-[#F5F6FA]">

      <Sidebar />

      <main className="flex-1 p-7">

        <Header />

        <div className="mt-8 space-y-7">

          {/* Toolbar */}

          <BuildingToolbar
            onAdd={() => setOpenAdd(true)}
          />

          {/* Table */}

          <BuildingTable
            reload={reload}
            onEdit={(building) => {
              setSelectedBuilding(building);
              setOpenEdit(true);
            }}
          />

        </div>

      </main>

      {/* Add Modal */}

      {openAdd && (

        <AddBuildingModal
          onClose={() => setOpenAdd(false)}
          onSuccess={() => {
            setReload(!reload);
          }}
        />

      )}

      {/* Edit Modal */}

      {openEdit && selectedBuilding && (

        <EditBuildingModal
          building={selectedBuilding}
          onClose={() => setOpenEdit(false)}
          onSuccess={() => {
            setReload(!reload);
          }}
        />

      )}

    </div>

  );

}