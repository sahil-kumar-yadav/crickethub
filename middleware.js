// middleware.js
export { auth as default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/tournaments/:path*']
};
