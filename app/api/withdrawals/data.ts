export type Withdrawal = {
  id: string;
  amount: number;
  date: string;
  status: "processing" | "completed" | "canceled";
};

export let withdrawals: Withdrawal[] = [
  { id: "w1", amount: 500, date: "2025-08-10", status: "completed" },
  { id: "w2", amount: 300, date: "2025-08-18", status: "processing" },
];

export function generateId() {
  return "w" + (withdrawals.length + 1);
}
