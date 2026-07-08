"use client";

interface Props {
  onAdd: () => void;
}

export default function PaymentToolbar({
  onAdd,
}: Props) {

  return (

    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">

            Quản lý thanh toán

          </h1>

          <p className="text-gray-500 mt-2">

            Quản lý thông tin thanh toán của các phiên gửi xe.

          </p>

        </div>

        <button
          onClick={onAdd}
          className="bg-[#6246EA] hover:bg-[#5236D8] text-white px-6 py-3 rounded-xl"
        >

          + Thêm thanh toán

        </button>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">

        <input
          placeholder="Tìm biển số..."
          className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#6246EA]"
        />

        <input
          placeholder="Tìm mã giao dịch..."
          className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#6246EA]"
        />

      </div>

    </div>

  );

}