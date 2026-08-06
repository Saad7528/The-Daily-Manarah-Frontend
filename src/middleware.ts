import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // ১. সুপার অ্যাডমিন ড্যাশবোর্ড নিরাপত্তা
    if (path.startsWith("/admin/dashboard")) {
      if (token?.role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/?error=unauthorized", req.url));
      }
    }

    // ২. রাইটিং ও এডিটর প্যানেল নিরাপত্তা
    if (path.startsWith("/admin/editor")) {
      const allowedRoles = ["EDITOR", "SUPER_ADMIN"];
      if (!token?.role || !allowedRoles.includes(token.role as string)) {
        return NextResponse.redirect(new URL("/?error=unauthorized", req.url));
      }
    }

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
