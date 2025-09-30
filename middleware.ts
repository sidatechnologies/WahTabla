import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';
import { publicRoutes, protectedRoutes } from './lib/routes';

export default async function middleware(request: NextRequest) {

  const { nextUrl } = request;
  const pathname = nextUrl.pathname;

  const session = await auth();
  const isAuthenticated = !!session;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));


  if (isPublicRoute && isAuthenticated && (pathname === '/auth/login' || pathname === '/auth/register')) {
    return NextResponse.redirect(new URL('/profile', nextUrl.origin));
  }


  if (isProtectedRoute && !isAuthenticated) {
    const redirectUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${redirectUrl}`, nextUrl.origin));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};