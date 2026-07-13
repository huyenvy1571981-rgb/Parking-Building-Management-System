type Props = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  percent: string;
};

export default function StatCard({
  title,
  value,
  icon,
  color,
  percent,
}: Props) {
  return (
    <div
      className="
        h-[150px]
        bg-white
        rounded-2xl
        border
        border-[#ECEEF5]
        shadow-sm
        px-6
      "
    >
      <div className="grid grid-cols-[1fr_72px] items-center h-full">

    <div className="flex flex-col items-center justify-center text-center h-full">

        <p className="text-[15px] text-[#8B93A7] font-medium">
            {title}
        </p>

        <h2 className="mt-2 text-[38px] font-bold leading-none text-[#151930]">
            {value}
        </h2>

        <p className={`mt-2 text-[15px] font-semibold ${color}`}>
            {percent}
        </p>

    </div>

    <div
        className="
            w-[72px]
            h-[72px]
            rounded-2xl
            bg-[#6246EA]/10
            flex
            items-center
            justify-center
            ml-auto
        "
    >
        {icon}
    </div>

</div>
    </div>
  );
}