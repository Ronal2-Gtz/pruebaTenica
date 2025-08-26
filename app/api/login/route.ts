import { NextResponse } from "next/server";

const DEMO_EMAIL = "demo@mail.test";
const DEMO_PASS = "Demo123*";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === DEMO_EMAIL && password === DEMO_PASS) {
    const res = NextResponse.json({ ok: true });

    res.cookies.set("session", "m.eyJ1c2VySWQiOiJ1X2RlbW8ifQ.k", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    });

    return res;
  }

  return NextResponse.json(
    { error: "Credenciales inválidas" },
    { status: 401 }
  );
}
