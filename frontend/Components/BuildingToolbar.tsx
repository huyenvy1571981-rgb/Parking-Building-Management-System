"use client";

import { Search, Filter, Plus } from "lucide-react";

interface Props {
  onAdd: () => void;
}

export default function BuildingToolbar({
  onAdd,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-4xl font-bold">
            Quản lý tòa nhà
          </h2>

          <p className="text-gray-500 mt-2">
            Quản lý thông tin các tòa nhà trong hệ thống.
          </p>

        </div>

        <button
          onClick={onAdd}
          className="
            bg-[#6246EA]
            hover:bg-[#5337d8]
            text-white
            rounded-2xl
            px-6
            py-3
            flex
            items-center
            gap-3
            transition
          "
        >
          <Plus size={20} />

          Thêm tòa nhà

        </button>

      </div>

      <div className="grid grid-cols-12 gap-4">

        {/* Search */}

        <div className="col-span-6 relative">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            placeholder="Tìm kiếm tên tòa nhà..."
            className="
              w-full
              h-14
              rounded-2xl
              border
              border-gray-200
              pl-12
              pr-4
              outline-none
              focus:border-[#6246EA]
            "
          />

        </div>

        {/* Status */}

        <select
          className="
            col-span-3
            h-14
            rounded-2xl
            border
            border-gray-200
            px-4
            outline-none
          "
        >
          <option>Tất cả trạng thái</option>
          <option>Hoạt động</option>
          <option>Tạm khóa</option>
        </select>

        {/* Filter */}

        <button
          className="
            col-span-3
            h-14
            rounded-2xl
            border
            border-gray-200
            flex
            items-center
            justify-center
            gap-2
            hover:bg-gray-50
          "
        >

          <Filter size={18} />

          Lọc

        </button>

      </div>

    </div>
  );
}