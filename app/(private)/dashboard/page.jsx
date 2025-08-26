async function getData() {
  const res = await fetch("http://localhost:3000/api/me", {
    cache: "no-store", 
  });
  if (!res.ok) throw new Error("Error al cargar datos");
  return res.json();
}

export default async function DashboardPage() {
  const data = await getData();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard 🚀</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Saldo disponible</h2>
          <p className="text-2xl font-bold">${data.balance.available}</p>
        </div>

        <div className="p-4 border rounded-xl shadow">
          <h2 className="text-sm text-gray-500">En proceso</h2>
          <p className="text-2xl font-bold">${data.balance.processing}</p>
        </div>

        <div className="p-4 border rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Último retiro</h2>
          <p className="text-2xl font-bold">{data.balance.lastWithdrawal}</p>
        </div>
      </div>
    </div>
  );
}
