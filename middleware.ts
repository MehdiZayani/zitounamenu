import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("admin_session")?.value;

  const hasSession = Boolean(sessionToken && sessionToken.length > 10);

  // If user is accessing /admin (excluding /admin/login) and has no session token
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!hasSession) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If user is accessing /admin/login and already has a session token
  if (pathname === "/admin/login" && hasSession) {
    const adminUrl = new URL("/admin", request.url);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
