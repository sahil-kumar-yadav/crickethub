// filepath: /frontend/middleware.js
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirect to login if not authenticated
  },
  callbacks: {
    authorized: ({ token }) => token?.role === "admin", // Only allow admins
  },
});

export const config = {
  matcher: ["/admin/:path*"], // Protect all routes under /admin
};