import { NextResponse } from 'next/server'

export function middleware(request) {
  const path = request.nextUrl.pathname

  // Admin logic
  if (path.startsWith('/admin')) {
    const isLogin = path === '/admin/login'
    const token = request.cookies.get('atoken')?.value || ''

    if (isLogin && token) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
    if (!isLogin && !token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    return NextResponse.next()
  }

  // Doctor logic
  if (path.startsWith('/doctor')) {
    const isLogin = path === '/doctor/login'
    const token = request.cookies.get('dtoken')?.value || ''

    if (isLogin && token) {
      return NextResponse.redirect(new URL('/doctor/dashboard', request.url))
    }
    if (!isLogin && !token) {
      return NextResponse.redirect(new URL('/doctor/login', request.url))
    }
    return NextResponse.next()
  }

   // user logic
  if (path.startsWith('/login')) {
    const isLogin = path === '/login'

    const token = request.cookies.get('utoken')?.value || ''

    if (isLogin && token) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    if (!isLogin && !token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/doctor/:path*', '/login'],
}
