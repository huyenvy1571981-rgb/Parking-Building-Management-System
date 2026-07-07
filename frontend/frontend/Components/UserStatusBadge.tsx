"use client";

interface Props {
  status: "active" | "locked";
}

export default function UserStatusBadge({ status }: Props) {
  if (status === "active") {
    return (
      <span
        className="
          inline-flex
          px-3
          py-1
          rounded-full
          bg-green-100
          text-green-700
          text-sm
          font-medium
        "
      >
        Đang hoạt động
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        px-3
        py-1
        rounded-full
        bg-red-100
        text-red-600
        text-sm
        font-medium
      "
    >
      Đã khóa
    </span>
  );
}
