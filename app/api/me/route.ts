import { NextResponse } from "next/server";
import { mockUser, mockBalance } from "../_data/mock";

export async function GET() {
  return NextResponse.json({
    user: mockUser,
    balance: mockBalance,
  });
}
