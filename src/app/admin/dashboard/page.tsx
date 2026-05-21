export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-gray-100 rounded">
          Results
        </div>

        <div className="p-4 bg-gray-100 rounded">
          Competitions
        </div>

        <div className="p-4 bg-gray-100 rounded">
          Teams
        </div>
      </div>
    </div>
  );
}