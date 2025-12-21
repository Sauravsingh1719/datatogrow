import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET! 
  });

  const url = request.nextUrl;
  const pathname = url.pathname;

  if (pathname.startsWith('/admin') && !pathname.includes('/signin')) {
    if (!token) {
      const signInUrl = new URL('/signin', request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }

    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  if (pathname.includes('/signin') && token?.role === 'admin') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/signin',
    '/admin/:path*',
    '/api/admin/:path*',
  ]
};