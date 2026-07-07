import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";

import UserToolbar from "@/Components/UserToolbar";
import UserTable from "@/Components/UserTable";
import AddUserModal from "@/Components/AddUserModal";

export default function UserPage() {
  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Sidebar />

      <main className="flex-1 p-7">
        <Header />

        <div className="mt-8 space-y-8">
          <UserToolbar />

          <UserTable />

          {/* Demo popup */}
        </div>
      </main>
    </div>
  );
}
