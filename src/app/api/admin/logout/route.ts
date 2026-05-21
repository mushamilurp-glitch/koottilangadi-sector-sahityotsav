import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  (await cookies()).set("admin-token", "", { maxAge: 0, path: "/" });

  return NextResponse.json({ success: true });
}