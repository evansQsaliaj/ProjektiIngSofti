export default function JobElement({ title, description }) {
  return (
    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
      <p className="text-sm mb-2">{title}</p>
      <div className="flex justify-between items-center">{description}</div>
    </div>
  );
}
