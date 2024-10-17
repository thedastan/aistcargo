import Cookies from 'js-cookie'

import { IAuthResponse } from '@/models/auth.model'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'access',
	'REFRESH_TOKEN' = 'refresh',
	'ROLE' = 'role'
}

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
	return accessToken || null
}
export const saveTokenStorage = (tokens: IAuthResponse) => {
	const settings: Cookies.CookieAttributes = {
		sameSite: 'strict',
		expires: 1
	}

	Cookies.set(EnumTokens.ACCESS_TOKEN, tokens.access, settings)
	Cookies.set(EnumTokens.REFRESH_TOKEN, tokens.refresh, settings)
}

export const removeFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN)
	Cookies.remove(EnumTokens.REFRESH_TOKEN)
}
