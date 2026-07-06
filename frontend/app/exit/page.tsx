import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";

import ExitSearch from "@/Components/ExitSearch";
import CompareImages from "@/Components/CompareImages";
import PaymentInfo from "@/Components/PaymentInfo";
import ConfirmExitButton from "@/Components/ConfirmExitButton";

export default function ExitPage() {
  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Sidebar />

      <main className="flex-1 p-7">
        <Header />

        <div className="mt-8">
          <h1 className="text-4xl font-bold">Quầy ra bãi & Thanh toán</h1>

          <p className="text-gray-500 mt-2">
            Đối chiếu thông tin xe và thực hiện thanh toán trước khi xe ra khỏi
            bãi.
          </p>

          <div className="mt-8">
            <ExitSearch />
          </div>

          <div className="grid grid-cols-3 gap-8 mt-8">
            <div className="col-span-2">
              <CompareImages />
            </div>

            <div>
              <PaymentInfo />

              <ConfirmExitButton />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
