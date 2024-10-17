// import { NextResponse } from 'next/server';

// function middleware(request) {
//   return NextResponse.redirect(new URL('/about', request.url));
// }

// export const config = {
//   matcher: ['/account', '/cabins'],
// };

// export default middleware;
import { auth } from '@/app/_lib/auth';
export const middleware = auth;

export const config = {
  matcher: ['/account/:path*'],
};
