import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionValue = request.cookies.get('sessionValue')?.value;
  console.log('✅ Middleware engaged');
  // console.log('🧠 Session cookie value in middleware:', sessionValue);
  if (sessionValue !== 'correct-value') {
    // console.log('🚫 Invalid or missing session cookie. Redirecting to /other');
    return NextResponse.redirect(new URL('/other', request.url));
  }

  // add current hostname to headers
  let headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  headers.set("x-current-host", request.nextUrl.host);
  headers.set("x-current-protocol", request.nextUrl.protocol);
  console.log('✅ Middleware good');
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'], // Only intercept requests to /dashboard
};
