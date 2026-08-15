import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Allowed roles definition
    const validRoles = ["SUPER_ADMIN", "EDITOR", "REPORTER", "AD_MANAGER"];
    const userRole = (token?.role as string) || "";

    // 1. Check if user has a valid role
    if (!token || !validRoles.includes(userRole)) {
      const signInUrl = new URL("/auth/signin", req.url);
      signInUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(signInUrl);
    }

    // 2. Route-specific role checking
    if (path.startsWith("/admin/editor")) {
      const editorAllowedRoles = ["SUPER_ADMIN", "EDITOR", "REPORTER"];
      if (!editorAllowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL("/admin/dashboard?error=restricted", req.url));
      }
    }

    // 3. SUPER_ADMIN has unrestricted access to everything
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
