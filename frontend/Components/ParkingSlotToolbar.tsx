"use client";

type Props = {
  onAdd: () => void;
};

export default function ParkingSlotToolbar({
  onAdd,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 mb-6">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Quản lý Parking Slot
          </h1>

          <p className="text-gray-500 mt-2">
            Quản lý danh sách các vị trí đỗ xe trong tòa nhà.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="bg-[#6246EA] hover:bg-[#5337d8] text-white px-6 py-3 rounded-xl"
        >
          + Thêm Slot
        </button>

      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">

        <input
          type="text"
          placeholder="Tìm Slot..."
          className="border rounded-xl px-4 py-3"
        />

        <select className="border rounded-xl px-4 py-3">
          <option>Tất cả tầng</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>Tất cả trạng thái</option>
          <option>Empty</option>
          <option>Occupied</option>
          <option>Reserved</option>
          <option>Maintenance</option>
        </select>

      </div>

    </div>
  );
}