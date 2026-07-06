import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";

import CameraPanel from "@/Components/CameraPanel";
import VehicleInfo from "@/Components/VehicleInfo";
import GateInfo from "@/Components/GateInfo";
import ConfirmEntryButton from "@/Components/ConfirmEntryButton";

export default function EntryPage() {
  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Sidebar />

      <main className="flex-1 p-7">
        <Header />

        <div className="mt-7">
          {/* Tiêu đề */}

          <h1 className="text-4xl font-bold">Quầy vào bãi</h1>

          <p className="text-gray-500 mt-2 text-lg">
            Quét biển số xe và xác nhận thông tin để xe vào bãi.
          </p>

          {/* Nội dung */}

          <div className="grid grid-cols-2 gap-8 mt-8">
            {/* Camera */}

            <CameraPanel />

            {/* Thông tin */}

            <div>
              <VehicleInfo />

              <GateInfo />

              <ConfirmEntryButton />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
