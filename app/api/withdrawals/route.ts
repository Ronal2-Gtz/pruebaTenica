import { NextRequest, NextResponse } from "next/server";
import { withdrawals, generateId } from "./data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || "1");
  const pageSize = Number(searchParams.get("pageSize") || "10");

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return NextResponse.json({
    withdrawals: withdrawals.slice(start, end),
    total: withdrawals.length,
    page,
    pageSize,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();
    if (amount > 1000) throw new Error("El retiro no puede superar $1000");

    const w = {
      id: generateId(),
      amount,
      date: new Date().toISOString().split("T")[0],
      status: "processing" as const,
    };
    withdrawals.unshift(w);

    return NextResponse.json(w, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
