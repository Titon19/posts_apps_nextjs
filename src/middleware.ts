import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("__Secure-next-auth.session-token");
  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/posts", "/posts/:path*"] };
