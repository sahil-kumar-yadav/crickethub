import { authMiddleware } from "@auth/core/nextjs";

export default authMiddleware();

export const config = {
  matcher: ["/dashboard", "/profile"], // Add your protected routes here
};
