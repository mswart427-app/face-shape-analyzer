import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the referer to check where the request is coming from
  const referer = request.headers.get('referer')
  const response = NextResponse.next()

  // Set headers based on the request origin
  if (referer?.includes('myhairmail.com')) {
    response.headers.set('Access-Control-Allow-Origin', 'https://myhairmail.com')
    response.headers.set('Content-Security-Policy', 
      "frame-ancestors https://myhairmail.com https://*.myshopify.com;"
    )
  } else {
    // For direct access and development
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Content-Security-Policy', 'frame-ancestors *;')
  }

  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', '*')

  return response
}

export const config = {
  matcher: '/:path*',
} 