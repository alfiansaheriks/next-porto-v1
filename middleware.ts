// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Retrieve token from cookies
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  // Define public paths that don't require authentication
  const publicPaths = ['/login', '/register'];

  // Allow requests to public paths
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Redirect to login if token is missing
  if (!token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  // Continue to the protected route if token exists
  return NextResponse.next();
}

// Specify which paths the middleware should apply to
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/protected/:path*',
    '/project/manage/:path*',
    '/panel/:path*',
  ],
};
