"use client";

import { useState } from "react";

import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/header";

import PaymentToolbar from "@/Components/PaymentToolbar";
import PaymentTable from "@/Components/PaymentTable";

import AddPaymentModal from "@/Components/AddPaymentModal";
import EditPaymentModal from "@/Components/EditPaymentModal";

export default function PaymentPage() {

  const [reload, setReload] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);

  const [editPayment, setEditPayment] = useState<any>(null);

  const handleReload = () => {
    setReload(!reload);
  };

  return (

    <div className="flex min-h-screen bg-[#F5F6FA]">

      <Sidebar />

      <main className="flex-1 p-7">

        <Header />

        <div className="mt-8">

          <PaymentToolbar
            onAdd={() => setOpenAdd(true)}
          />

          <div className="mt-8">

            <PaymentTable
              reload={reload}
              onEdit={(payment) => setEditPayment(payment)}
            />

          </div>

        </div>

      </main>

      <AddPaymentModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={handleReload}
      />

      {editPayment && (

        <EditPaymentModal
          payment={editPayment}
          onClose={() => setEditPayment(null)}
          onSuccess={handleReload}
        />

      )}

    </div>

  );

}