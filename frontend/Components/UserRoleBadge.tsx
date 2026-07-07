"use client";

interface Props {
  role: number | string;
}

export default function UserRoleBadge({ role }: Props) {

  const roleName =
    role == 1
      ? "Admin"
      : role == 2
      ? "Manager"
      : role == 3
      ? "Staff"
      : role == 4
      ? "Driver"
      : "Unknown";

  const color: Record<string, string> = {
    Admin: "bg-purple-100 text-purple-700",
    Manager: "bg-blue-100 text-blue-700",
    Staff: "bg-orange-100 text-orange-700",
    Driver: "bg-green-100 text-green-700",
    Unknown: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`
        inline-flex
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        ${color[roleName]}
      `}
    >
      {roleName}
    </span>
  );
}