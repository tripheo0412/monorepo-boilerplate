import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

// Add routes that require authentication here
const protectedRoutes = ['/dashboard', '/profile', '/settings']

// Add routes that should redirect to dashboard if user is already logged in
const authRoutes = ['/sign-in', '/sign-up']

/**
 * Middleware to handle authentication and route protection
 * @param request - Next.js request object
 * @returns Next response or redirect
 */
export function middleware(request: NextRequest) {
	const token = request.cookies.get('auth_token')?.value
	const {pathname} = request.nextUrl

	// Check if the current route is protected
	const isProtectedRoute = protectedRoutes.some(route =>
		pathname.startsWith(route),
	)
	const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

	// Redirect to sign-in if accessing protected route without token
	if (isProtectedRoute && !token) {
		const url = new URL('/sign-in', request.url)
		url.searchParams.set('from', pathname)
		return NextResponse.redirect(url)
	}

	// Redirect to dashboard if accessing auth routes with token
	if (isAuthRoute && token) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return NextResponse.next()
}

// Configure which routes the middleware should run on
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
}
