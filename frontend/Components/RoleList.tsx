"use client";

import { useState } from "react";

import {
  Crown,
  Briefcase,
  Shield,
  User,
  MoreVertical,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import DeleteRoleModal from "./DeleteRoleModal";

interface Role {
  name: string;
  desc: string;
}

interface Props {
  roles: Role[];
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  openCreate: () => void;
}

export default function RoleList({
  roles,
  setRoles,
  selectedRole,
  setSelectedRole,
  openCreate,
}: Props) {

  const [showDelete, setShowDelete] = useState(false);

  const [roleDelete, setRoleDelete] = useState("");

  const [menuIndex, setMenuIndex] = useState<number | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case "System Admin":
        return Crown;

      case "Parking Manager":
        return Briefcase;

      case "Guard":
        return Shield;

      default:
        return User;
    }
  };

  const getColor = (name: string) => {
    switch (name) {
      case "System Admin":
        return "bg-purple-100 text-[#6246EA]";

      case "Parking Manager":
        return "bg-blue-100 text-blue-600";

      case "Guard":
        return "bg-green-100 text-green-600";

      default:
        return "bg-orange-100 text-orange-500";
    }
  };

  const deleteRole = () => {
    setRoles((prev) =>
      prev.filter((r) => r.name !== roleDelete)
    );

    if (selectedRole === roleDelete) {
      const remain = roles.filter(
        (r) => r.name !== roleDelete
      );

      if (remain.length > 0) {
        setSelectedRole(remain[0].name);
      }
    }

    setShowDelete(false);
  };

  return (
    <>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Danh sách vai trò
          </h2>

          <button
            onClick={openCreate}
            className="
              flex
              items-center
              gap-2
              bg-[#6246EA]
              hover:bg-[#5337d8]
              text-white
              px-4
              py-2
              rounded-xl
              transition
            "
          >
            <Plus size={18} />
            Tạo vai trò
          </button>

        </div>

        <div className="space-y-4">

          {roles.map((role, index) => {

            const Icon = getIcon(role.name);

            return (

              <div
                key={index}
                onClick={() => setSelectedRole(role.name)}
                className={`
                  relative
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  p-4
                  cursor-pointer
                  transition

                  ${
                    selectedRole === role.name
                      ? "bg-[#F2EEFF] border-[#6246EA]"
                      : "border-gray-200 hover:bg-gray-50"
                  }
                `}
              >

                <div className="flex items-center gap-4">

                  <div
                    className={`
                      w-14
                      h-14
                      rounded-full
                      flex
                      items-center
                      justify-center
                      ${getColor(role.name)}
                    `}
                  >
                    <Icon size={28} />
                  </div>

                  <div>

                    <h3 className="font-semibold text-lg">
                      {role.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {role.desc}
                    </p>

                  </div>

                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    if (menuIndex === index) {
                      setMenuIndex(null);
                    } else {
                      setMenuIndex(index);
                    }
                  }}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <MoreVertical size={20} />
                </button>

                {menuIndex === index && (

                  <div
                    className="
                      absolute
                      right-5
                      top-16
                      w-44
                      rounded-xl
                      border
                      bg-white
                      shadow-lg
                      z-20
                    "
                  >

                    <button
                      className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        hover:bg-gray-50
                      "
                    >
                      <Pencil size={18} />

                      Chỉnh sửa
                    </button>

                    <button
                      onClick={() => {
                        setRoleDelete(role.name);

                        setShowDelete(true);

                        setMenuIndex(null);
                      }}
                      className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        text-red-500
                        hover:bg-red-50
                      "
                    >
                      <Trash2 size={18} />

                      Xóa vai trò
                    </button>

                  </div>

                )}

                    </div>

            );

          })}

        </div>

        <div className="mt-6 text-sm text-gray-500">
          Tổng số: {roles.length} vai trò
        </div>

      </div>

      {/* Delete Modal */}

      {showDelete && (

        <DeleteRoleModal
          roleName={roleDelete}
          onClose={() => setShowDelete(false)}
          onDelete={deleteRole}
        />

      )}

    </>

  );
}