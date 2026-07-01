"use client";

export default function IncidentForm() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-3xl font-bold mb-8">3. Thông tin xử lý</h2>

      <div className="grid grid-cols-2 gap-8">
        {/* Tiền phạt */}

        <div>
          <label className="block text-lg font-medium mb-3">
            Tiền phạt (nếu có)
          </label>

          <div className="flex">
            <input
              type="number"
              placeholder="Nhập số tiền phạt"
              className="
                flex-1
                h-14
                border
                border-gray-200
                rounded-l-2xl
                px-5
                outline-none
                focus:border-[#6246EA]
              "
            />

            <div
              className="
                w-20
                border
                border-l-0
                border-gray-200
                rounded-r-2xl
                flex
                items-center
                justify-center
                font-semibold
              "
            >
              VND
            </div>
          </div>

          <p className="text-gray-500 text-sm mt-3">
            Áp dụng cho trường hợp mất thẻ hoặc vi phạm quy định.
          </p>
        </div>

        {/* Ghi chú */}

        <div>
          <label className="block text-lg font-medium mb-3">
            Ghi chú xử lý
          </label>

          <textarea
            rows={5}
            placeholder="Nhập thông tin chi tiết về sự cố và hướng xử lý..."
            className="
              w-full
              rounded-2xl
              border
              border-gray-200
              p-4
              resize-none
              outline-none
              focus:border-[#6246EA]
            "
          />

          <div className="text-right text-gray-400 text-sm mt-2">0/500</div>
        </div>
      </div>
    </div>
  );
}
