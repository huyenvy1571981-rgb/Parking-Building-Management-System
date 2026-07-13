"use client";

import { useState } from "react";

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";

import ExitCameraPanel from "@/Components/ExitCameraPanel";
import ExitVehicleInfo from "@/Components/ExitVehicleInfo";
import ExitParkingInfo from "@/Components/ExitParkingInfo";
import PaymentPanel from "@/Components/PaymentPanel";
import ConfirmExitButton from "@/Components/ConfirmExitButton";

export default function ExitPage() {

  const [plateNumber, setPlateNumber] = useState("");

  const [vehicle, setVehicle] = useState<any>(null);

  const [parkingSession, setParkingSession] = useState<any>(null);

  const [reload, setReload] = useState(false);

  return (

    <div className="flex min-h-screen bg-[#F5F6FA]">

      <Sidebar />

      <main className="flex-1 p-7">

        <Header />

        <div className="mt-7">

          <h1 className="text-4xl font-bold">
            Quầy ra bãi & Thanh toán
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Kiểm tra phiên gửi xe và xác nhận thanh toán.
          </p>

          <div className="grid grid-cols-2 gap-8 mt-8">

            <ExitCameraPanel
              plateNumber={plateNumber}
              setPlateNumber={setPlateNumber}
              setVehicle={setVehicle}
              setParkingSession={setParkingSession}
            />

            <div>

              <ExitVehicleInfo
                vehicle={vehicle}
                plateNumber={plateNumber}
              />

              <ExitParkingInfo
                parkingSession={parkingSession}
              />

              <PaymentPanel
                parkingSession={parkingSession}
              />

              <ConfirmExitButton
                vehicle={vehicle}
                parkingSession={parkingSession}
                reload={reload}
                setReload={setReload}
              />

            </div>

          </div>

        </div>

      </main>

    </div>

  );

}