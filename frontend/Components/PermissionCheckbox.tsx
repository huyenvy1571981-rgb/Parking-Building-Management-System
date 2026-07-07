"use client";

interface PermissionCheckboxProps {
  checked?: boolean;
  onChange?: () => void;
}

export default function PermissionCheckbox({
  checked = false,
  onChange,
}: PermissionCheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="
        w-5
        h-5
        accent-[#6246EA]
        cursor-pointer
      "
    />
  );
}
