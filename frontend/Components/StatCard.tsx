type Props = {
  title: string;
  value: string;
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
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>

          <h2 className="text-4xl font-bold mt-3">{value}</h2>

          <p className={`mt-4 text-sm font-semibold ${color}`}>{percent}</p>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-[#6246EA]/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}
