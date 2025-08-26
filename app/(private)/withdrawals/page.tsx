"use client";

import { useEffect, useState } from "react";

type Withdrawal = {
  id: string;
  amount: number;
  date: string;
  status: "processing" | "completed" | "canceled";
};

export default function WithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchWithdrawals() {
    try {
      setLoading(true);
      const res = await fetch("/api/withdrawals");
      if (!res.ok) throw new Error("Error cargando withdrawals");
      const data = await res.json();
      setWithdrawals(data.withdrawals);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/withdrawals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAmount("");
      fetchWithdrawals();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleCancel(id: string) {
    await fetch(`/api/withdrawals/${id}/cancel`, { method: "POST" });
    fetchWithdrawals();
  }

  async function handleSettle(id: string) {
    await fetch(`/api/withdrawals/${id}/settle`, { method: "POST" });
    fetchWithdrawals();
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Withdrawals 💸</h1>

      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Crear
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading && <p className="text-gray-500">Cargando withdrawals...</p>}

      {!loading && withdrawals.length === 0 && (
        <p className="text-gray-500">No hay withdrawals todavía.</p>
      )}

      {!loading && withdrawals.length > 0 && (
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="p-3">Fecha</th>
                <th className="p-3">Monto</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((w) => (
                <tr key={w.id} className="border-t">
                  <td className="p-3">{w.date}</td>
                  <td className="p-3">${w.amount}</td>
                  <td className="p-3 capitalize">{w.status}</td>
                  <td className="p-3 space-x-2">
                    {w.status === "processing" ? (
                      <>
                        <button
                          onClick={() => handleCancel(w.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleSettle(w.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Finalizar
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
