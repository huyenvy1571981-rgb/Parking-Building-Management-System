import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";

import RoleList from "@/Components/RoleList";
import PermissionTable from "@/Components/PermissionTable";
// import CreateRoleModal from "@/Components/CreateRoleModal";
// import RoleSuccessModal from "@/Components/RoleSuccessModal";

export default function RolePage() {
  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Sidebar />

      <main className="flex-1 p-7">
        <Header />

        <div className="mt-8">
          <h1 className="text-5xl font-bold">Phân quyền</h1>

          <p className="text-gray-500 mt-3 mb-8">
            Thiết lập và quản lý quyền truy cập cho các vai trò trong hệ thống.
          </p>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <RoleList />
            </div>

            <div className="col-span-8"></div>
          </div>
        </div>

        {/*
        <CreateRoleModal />
        */}

        {/*
        <RoleSuccessModal />
        */}
      </main>
    </div>
  );
}
