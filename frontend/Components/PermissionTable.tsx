"use client";

import { useMemo, useState } from "react";
import {
  Home,
  Users,
  ShieldCheck,
  Car,
  Building2,
  Grid2x2,
  Tags,
  LogIn,
  LogOut,
  TriangleAlert,
  BarChart3,
  Settings,
  Search,
} from "lucide-react";

import PermissionCheckbox from "./PermissionCheckbox";

interface Props {
  selectedRole: string;
}

type Permission = {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
};

const modules = [
  { icon: Home, name: "Tổng quan" },
  { icon: Users, name: "Quản lý người dùng" },
  { icon: ShieldCheck, name: "Phân quyền" },
  { icon: Car, name: "Quản lý bãi đỗ xe" },
  { icon: Building2, name: "Tổng quan tòa nhà & phân tầng" },
  { icon: Grid2x2, name: "Sơ đồ Slot" },
  { icon: Tags, name: "Quản lý bảng giá" },
  { icon: LogIn, name: "Quầy vào bãi" },
  { icon: LogOut, name: "Quầy ra bãi & Thanh toán" },
  { icon: TriangleAlert, name: "Xử lý sự cố" },
  { icon: BarChart3, name: "Báo cáo" },
  { icon: Settings, name: "Cài đặt hệ thống" },
];

const createDefaultPermissions = () =>
  modules.map(() => ({
    view: true,
    create: true,
    edit: true,
    delete: true,
  }));

export default function PermissionTable({
  selectedRole,
}: Props) {
  const [keyword, setKeyword] = useState("");

  const [permissions, setPermissions] = useState<
    Record<string, Permission[]>
  >({
    "System Admin": createDefaultPermissions(),
    "Parking Manager": createDefaultPermissions(),
    Guard: createDefaultPermissions(),
    User: createDefaultPermissions(),
  });

  // Nếu tạo role mới thì tự sinh quyền mặc định
  if (!permissions[selectedRole]) {
    permissions[selectedRole] = createDefaultPermissions();
  }

  const currentPermissions =
    permissions[selectedRole];

  const filteredModules = useMemo(() => {
    return modules.filter((m) =>
      m.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword]);

  const togglePermission = (
    moduleName: string,
    key: keyof Permission
  ) => {
    const index = modules.findIndex(
      (m) => m.name === moduleName
    );

    if (index === -1) return;

    setPermissions((prev) => {
      const updated = [
        ...prev[selectedRole],
      ];

      updated[index] = {
        ...updated[index],
        [key]: !updated[index][key],
      };

      return {
        ...prev,
        [selectedRole]: updated,
      };
    });
  };

  const handleSave = () => {
    console.log(
      "Role:",
      selectedRole
    );

    console.log(
      currentPermissions
    );

    alert(
      `Đã lưu phân quyền cho ${selectedRole}`
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-3xl font-bold">
            Ma trận phân quyền
          </h2>

          <p className="mt-2 text-gray-500">
            Vai trò đang chọn:

            <span className="ml-2 font-semibold text-[#6246EA]">
              {selectedRole}
            </span>

          </p>

        </div>

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={keyword}
            onChange={(e) =>
              setKeyword(e.target.value)
            }
            placeholder="Tìm kiếm module..."
            className="
              w-72
              h-12
              rounded-xl
              border
              border-gray-300
              pl-11
              pr-4
              outline-none
              focus:border-[#6246EA]
            "
          />

        </div>

      </div>

      <table className="w-full">

        <thead>

          <tr className="bg-gray-50 border-b">

            <th className="text-left p-4">
              Module
            </th>

            <th className="text-center">
              Xem
            </th>

            <th className="text-center">
              Thêm
            </th>

            <th className="text-center">
              Sửa
            </th>

            <th className="text-center">
              Xóa
            </th>

          </tr>

        </thead>

        <tbody>
              {filteredModules.map((item) => {

            const index = modules.findIndex(
              (m) => m.name === item.name
            );

            const Icon = item.icon;

            return (

              <tr
                key={item.name}
                className="border-b hover:bg-gray-50 transition"
              >

                {/* Module */}

                <td className="px-4 py-5">

                  <div className="flex items-center gap-4">

                    <div
                      className="
                        w-11
                        h-11
                        rounded-xl
                        bg-[#F2EEFF]
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <Icon
                        size={22}
                        className="text-[#6246EA]"
                      />

                    </div>

                    <span className="font-medium">
                      {item.name}
                    </span>

                  </div>

                </td>

                {/* View */}

                <td className="text-center">

                  <PermissionCheckbox
                    checked={currentPermissions[index].view}
                    onChange={() =>
                      togglePermission(item.name, "view")
                    }
                  />

                </td>

                {/* Create */}

                <td className="text-center">

                  <PermissionCheckbox
                    checked={currentPermissions[index].create}
                    onChange={() =>
                      togglePermission(item.name, "create")
                    }
                  />

                </td>

                {/* Edit */}

                <td className="text-center">

                  <PermissionCheckbox
                    checked={currentPermissions[index].edit}
                    onChange={() =>
                      togglePermission(item.name, "edit")
                    }
                  />

                </td>

                {/* Delete */}

                <td className="text-center">

                  <PermissionCheckbox
                    checked={currentPermissions[index].delete}
                    onChange={() =>
                      togglePermission(item.name, "delete")
                    }
                  />

                </td>

              </tr>

            );

          })}

        </tbody>
          </table>

      {/* Footer */}

      <div className="mt-8 flex justify-end gap-4">

        <button
          onClick={() => {

            if (
              confirm(
                "Bạn có muốn khôi phục phân quyền mặc định?"
              )
            ) {

              setPermissions((prev) => ({
                ...prev,
                [selectedRole]:
                  createDefaultPermissions(),
              }));

            }

          }}
          className="
            rounded-xl
            border
            border-[#6246EA]
            px-6
            py-3
            text-[#6246EA]
            hover:bg-[#F2EEFF]
            transition
          "
        >
          Khôi phục
        </button>

        <button
          onClick={handleSave}
          className="
            rounded-xl
            bg-[#6246EA]
            px-6
            py-3
            text-white
            hover:bg-[#5337d8]
            transition
          "
        >
          Lưu phân quyền
        </button>

      </div>

    </div>
  );
}