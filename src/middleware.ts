import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Remove X-Frame-Options completely
  response.headers.delete('X-Frame-Options')
  
  // Set secure cookie settings
  response.headers.set(
    'Set-Cookie', 
    'session=true; SameSite=None; Secure'
  )

  return response
}

export const config = {
  matcher: '/:path*',
} 