import { NextRequest, NextResponse } from 'next/server'

import { AUTH_PAGES } from './config/pages/auth-url.config'
import { USER_PAGES } from './config/pages/user-url.config'
import { EnumTokens } from './services/auth-token.services'
import { EnumRole } from './services/role.service'

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies, nextUrl } = request
	const role = decodeURIComponent(cookies.get(EnumTokens.ROLE)?.value as string)
	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const isAuthPage = url.includes('/auth')

	const isUserPage = url.includes('/user')

	if (
		isUserPage &&
		refreshToken &&
		role !== EnumRole.SENDER &&
		role !== EnumRole.TRAVELER
	) {
		return NextResponse.redirect(new URL(AUTH_PAGES.REGISTER_CONFIRM, url))
	}

	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(USER_PAGES.HOME, url))
	}

	if (isAuthPage) {
		return NextResponse.next()
	}

	if (!refreshToken) {
		return NextResponse.redirect(new URL(AUTH_PAGES.AUTH, url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/auth/:path*', '/user/:path*']
}
