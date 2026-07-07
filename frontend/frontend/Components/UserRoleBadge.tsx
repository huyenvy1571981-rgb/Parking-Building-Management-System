"use client";

interface Props {
  role: "Admin" | "Manager" | "Staff" | "Driver";
}

export default function UserRoleBadge({ role }: Props) {
  const color = {
    Admin: "bg-purple-100 text-purple-700",
    Manager: "bg-blue-100 text-blue-700",
    Staff: "bg-orange-100 text-orange-700",
    Driver: "bg-green-100 text-green-700",
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
        ${color[role]}
      `}
    >
      {role}
    </span>
  );
}
