import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Set secure cookie settings
  response.headers.set(
    'Set-Cookie', 
    'session=true; SameSite=None; Secure'
  )

  // Remove X-Frame-Options to rely on CSP
  response.headers.delete('X-Frame-Options')

  return response
}

export const config = {
  matcher: '/:path*',
} 