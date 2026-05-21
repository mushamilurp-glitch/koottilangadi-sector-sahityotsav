import { NextResponse } from "next/server";

export function middleware(req: any) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("admin-token");

  // ✅ IMPORTANT: allow login page
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // protect admin routes
  if (!token && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}