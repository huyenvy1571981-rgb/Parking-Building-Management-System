import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";

import IncidentType from "@/Components/IncidentType";
import IncidentSearch from "@/Components/IncidentSearch";
import IncidentForm from "@/Components/IncidentForm";
import IncidentAction from "@/Components/IncidentAction";

export default function IncidentPage() {
  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Sidebar />

      <main className="flex-1 p-7">
        <Header />

        <div className="mt-8">
          {/* Tiêu đề */}

          <h1 className="text-4xl font-bold">Xử lý sự cố</h1>

          <p className="text-gray-500 mt-2">
            Xử lý các trường hợp phát sinh trong quá trình vận hành.
          </p>

          {/* Hàng 1 */}

          <div className="grid grid-cols-3 gap-8 mt-8">
            <IncidentType />

            <div className="col-span-2">
              <IncidentSearch />
            </div>
          </div>

          {/* Hàng 2 */}

          <div className="mt-8">
            <IncidentForm />
          </div>

          {/* Hàng 3 */}

          <div className="mt-8">
            <IncidentAction />
          </div>
        </div>
      </main>
    </div>
  );
}
