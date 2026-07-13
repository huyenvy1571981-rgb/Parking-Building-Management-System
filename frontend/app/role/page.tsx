"use client";

import { useState } from "react";

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";

import RoleList from "@/Components/RoleList";
import PermissionTable from "@/Components/PermissionTable";
import CreateRoleModal from "@/Components/CreateRoleModal";
import RoleSuccessModal from "@/Components/RoleSuccessModal";

interface Role {
  name: string;
  desc: string;
}

export default function RolePage() {
  const [roles, setRoles] = useState<Role[]>([
    {
      name: "System Admin",
      desc: "Quản trị hệ thống",
    },
    {
      name: "Parking Manager",
      desc: "Quản lý bãi đỗ xe",
    },
    {
      name: "Guard",
      desc: "Nhân viên bảo vệ",
    },
    {
      name: "User",
      desc: "Người dùng",
    },
  ]);

  const [selectedRole, setSelectedRole] = useState("System Admin");

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCreateRole = (role: Role) => {
    setRoles((prev) => [...prev, role]);

    setSelectedRole(role.name);

    setShowCreateModal(false);

    setShowSuccessModal(true);
  };

  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">

      <Sidebar />

      <main className="flex-1 min-w-0 bg-[#F6F8FC] overflow-y-auto">

        <Header />

        <div className="max-w-[1450px] mx-auto px-8 pt-8 pb-10">

          <h1 className="text-[48px] font-bold text-[#151930]">
            Phân quyền
          </h1>

          <p className="mt-3 mb-8 text-[18px] text-gray-500">
            Thiết lập và quản lý quyền truy cập cho các vai trò trong hệ thống.
          </p>

          <div className="grid grid-cols-12 gap-8">

            <div className="col-span-4">

              <RoleList
                roles={roles}
                setRoles={setRoles}
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
                openCreate={() => setShowCreateModal(true)}
              />

            </div>

            <div className="col-span-8">

              <PermissionTable
                selectedRole={selectedRole}
              />

            </div>

          </div>

        </div>

        {showCreateModal && (

          <CreateRoleModal
            onClose={() => setShowCreateModal(false)}
            onCreate={handleCreateRole}
          />

        )}

        {showSuccessModal && (

          <RoleSuccessModal
            onClose={() => setShowSuccessModal(false)}
          />

        )}

      </main>

    </div>
  );
  }