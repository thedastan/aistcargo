import Cookies from 'js-cookie'

export enum EnumRole {
	NOBODY = '0',
	SENDER = '1',
	TRAVELER = '2'
}

export type RoleTypes = EnumRole.SENDER | EnumRole.TRAVELER | EnumRole.NOBODY

export const ROLE_KEY = 'role'
export const saveUserRole = (role: RoleTypes) => {
	Cookies.set(ROLE_KEY, JSON.stringify(role), {
		sameSite: 'strict',
		expires: 1
	})
}

export const getUserRole = (): RoleTypes => {
	const role = Cookies.get(ROLE_KEY) as RoleTypes | undefined
	return role ? role : EnumRole.NOBODY
}
