"use client";

interface Props {
  status: boolean | string | number;
}

export default function UserStatusBadge({ status }: Props) {
  const normalized = typeof status === "string" ? status.toLowerCase() : status;
  const isActive = normalized === true || normalized === 1 || normalized === "1" || normalized === "active";

  return isActive ? (
    <span className="inline-flex px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
      Đang hoạt động
    </span>
  ) : (
    <span className="inline-flex px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-medium">
      Đã khóa
    </span>
  );
}
