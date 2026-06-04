// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get('token')?.value;

//   const pathname = req.nextUrl.pathname;

//   // Allow login page and auth APIs
//   if (
//     pathname === '/login' ||
//     pathname.startsWith('/api/auth')
//   ) {
//     return NextResponse.next();
//   }

//   // Protect dashboard
//   if (pathname.startsWith('/dashboard')) {
//     if (!token) {
//       return NextResponse.redirect(
//         new URL('/login', req.url)
//       );
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/dashboard/:path*'],
// };

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const nextAuth =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  if (!token || !nextAuth) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};