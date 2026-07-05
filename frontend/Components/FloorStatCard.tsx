type Props = {
  title: string;
  value: string;
  unit: string;
  color: string;
};

export default function FloorStatCard({ title, value, unit, color }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className={`text-4xl font-bold mt-3 ${color}`}>{value}</h2>

      <p className="text-gray-400 mt-2">{unit}</p>
    </div>
  );
}
