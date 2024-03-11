import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("token")?.value;

  if (req.nextUrl.pathname === "/login" && !token) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  middleware: "all",
};
