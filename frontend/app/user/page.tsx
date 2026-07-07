"use client";

import { useState } from "react";

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";

import UserToolbar from "@/Components/UserToolbar";
import UserTable from "@/Components/UserTable";
import AddUserModal from "@/Components/AddUserModal";
import EditUserModal from "@/Components/EditUserModal";

export default function UserPage() {

  const [showModal, setShowModal] = useState(false);

  const [reload, setReload] = useState(false);

  const [editUser, setEditUser] = useState<any>(null);

  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">

      <Sidebar />

      <main className="flex-1 p-7">

        <Header />

        <div className="mt-8 space-y-8">

          <UserToolbar
            onAdd={() => setShowModal(true)}
          />

          <UserTable
            reload={reload}
            onEdit={(user) => setEditUser(user)}
          />

        </div>

      </main>

      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setReload(!reload);
            setShowModal(false);
          }}
        />
      )}

      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSuccess={() => {
            setReload(!reload);
            setEditUser(null);
          }}
        />
      )}

    </div>
  );
}