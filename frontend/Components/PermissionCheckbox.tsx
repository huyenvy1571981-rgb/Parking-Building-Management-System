"use client";

interface PermissionCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

export default function PermissionCheckbox({
  checked,
  onChange,
}: PermissionCheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="
        h-5
        w-5
        cursor-pointer
        accent-[#6246EA]
      "
    />
  );
  }