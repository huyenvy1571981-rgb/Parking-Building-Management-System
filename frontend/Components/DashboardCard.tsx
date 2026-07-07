type CardProps = {
  title: string;
  value: string;
  color: string;
  icon: string;
  sub: string;
};

export default function DashboardCard({
  title,
  value,
  color,
  icon,
  sub,
}: CardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition duration-300">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-4xl font-bold mt-3">{value}</h2>

          <p className={`mt-4 text-sm font-medium ${color}`}>{sub}</p>
        </div>

        <div
          className="
          w-16
          h-16
          rounded-2xl
          bg-[#6246EA]/10
          flex
          items-center
          justify-center
          text-4xl
          "
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
