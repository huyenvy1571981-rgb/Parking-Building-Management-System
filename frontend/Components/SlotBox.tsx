"use client";

type Props = {
  code: string;
  status: "empty" | "occupied" | "reserved" | "maintenance" | "disabled";
  onClick?: () => void;
};

export default function SlotBox({ code, status, onClick }: Props) {
  const style = {
    empty: "bg-green-50 border-green-300 text-green-700 hover:bg-green-100",

    occupied: "bg-red-50 border-red-300 text-red-600 hover:bg-red-100",

    reserved: "bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-100",

    maintenance:
      "bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100",

    disabled: "bg-gray-100 border-gray-300 text-gray-500",
  };

  return (
    <button
      onClick={onClick}
      className={`
        w-28
        h-14
        rounded-xl
        border-2
        font-semibold
        transition
        duration-200
        ${style[status]}
      `}
    >
      {code}
    </button>
  );
}
