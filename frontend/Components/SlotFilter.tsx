"use client";

export default function SlotFilter() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-6">
      <div className="grid grid-cols-3 gap-4">
        <select className="border rounded-xl px-4 py-3 outline-none focus:border-[#6246EA]">
          <option>Tất cả tầng</option>
          <option>Tầng B2</option>
          <option>Tầng B1</option>
          <option>Tầng 1</option>
          <option>Tầng 2</option>
        </select>

        <select className="border rounded-xl px-4 py-3 outline-none focus:border-[#6246EA]">
          <option>Tất cả loại xe</option>
          <option>Xe máy</option>
          <option>Ô tô</option>
          <option>Xe điện</option>
        </select>

        <input
          type="text"
          placeholder="🔍 Tìm mã Slot..."
          className="border rounded-xl px-4 py-3 outline-none focus:border-[#6246EA]"
        />
      </div>
    </div>
  );
}
