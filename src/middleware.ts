import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const absoluteUrl = req.nextUrl.origin;

  if (req.nextUrl.pathname === "/login") {
    if (token) {
      return NextResponse.redirect(`${absoluteUrl}/`);
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(`${absoluteUrl}/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};
