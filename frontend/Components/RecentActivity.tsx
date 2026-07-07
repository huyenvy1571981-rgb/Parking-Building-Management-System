"use client";

interface Props {
  data: any[];
}

export default function RecentActivity({
  data,
}: Props) {

  return (

    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-bold">

            Hoạt động gần đây

          </h2>

          <p className="text-gray-500 mt-1">

            5 phiên gửi xe gần nhất

          </p>

        </div>

      </div>

      <table className="w-full">

        <thead>

          <tr className="border-b text-gray-500">

            <th className="text-left py-4">
              Biển số
            </th>

            <th className="text-left">
              Slot
            </th>

            <th className="text-left">
              Thời gian
            </th>

            <th className="text-left">
              Trạng thái
            </th>

          </tr>

        </thead>

        <tbody>

          {data.map((item, index) => (

            <tr
              key={index}
              className="border-b hover:bg-gray-50 transition"
            >

              <td className="py-5 font-semibold">

                {item.PlateNumber}

              </td>

              <td>

                {item.SlotCode}

              </td>

              <td>

                {item.EntryTime}

              </td>

              <td>

                <span
                  className={`px-4 py-1 rounded-full text-sm ${
                    item.SessionStatus === "Đang gửi"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >

                  {item.SessionStatus}

                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}