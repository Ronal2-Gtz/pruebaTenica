import { NextResponse } from "next/server";
import { withdrawals } from "../../data";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const w = withdrawals.find((x) => x.id === params.id);
  if (!w) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  if (w.status !== "processing")
    return NextResponse.json(
      { error: "Solo se pueden liquidar retiros en proceso" },
      { status: 400 }
    );

  w.status = "completed";
  return NextResponse.json(w);
}
