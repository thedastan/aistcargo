import Cookies from 'js-cookie'

export enum EnumRole {
	SUPER_ADMIN = '0',
	SENDER = '1',
	TRAVELER = '2'
}

export type RoleTypes =
	| EnumRole.SENDER
	| EnumRole.TRAVELER
	| EnumRole.SUPER_ADMIN

export const ROLE_KEY = 'role'
export const saveUserRole = (role: RoleTypes) => {
	Cookies.set(ROLE_KEY, encodeURIComponent(role), {
		sameSite: 'strict',
		expires: 1
	})
}

export const getUserRole = (): RoleTypes => {
	const role = decodeURIComponent(Cookies.get(ROLE_KEY) as string) as
		| RoleTypes
		| undefined
	return role ? role : EnumRole.SUPER_ADMIN
}

export const TitlesRole = {
	[EnumRole.SUPER_ADMIN]: 'nobody',
	[EnumRole.SENDER]: 'sender',
	[EnumRole.TRAVELER]: 'traveler'
}
