import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('✅ Middleware engaged');
  const session = request.cookies.get('session')?.value;
  const userData = request.cookies.get('userData')?.value;
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth');


  console.log("session is ", session);
  console.log("userData is ", userData);

  // if user not logged in then send to auth
  if ((!session || !userData) && !isAuthRoute) {
    console.log('middleware re-routing to auth because session is ', session);
    // goto auth if not logged in
    return NextResponse.redirect(new URL('/auth', request.url));
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
  matcher: ['/home'], // Only intercept requests to /home
};
