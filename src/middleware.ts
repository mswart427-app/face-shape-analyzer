import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add headers specifically for myhairmail.com
  response.headers.set('Access-Control-Allow-Origin', 'https://myhairmail.com')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', '*')
  
  // Set frame-ancestors for Shopify specifically
  response.headers.set('Content-Security-Policy', 
    "frame-ancestors 'self' https://myhairmail.com https://*.myshopify.com https://admin.shopify.com;"
  )

  // Remove restrictive headers
  response.headers.delete('X-Frame-Options')
  response.headers.delete('X-Content-Type-Options')

  return response
}

export const config = {
  matcher: '/:path*',
} 