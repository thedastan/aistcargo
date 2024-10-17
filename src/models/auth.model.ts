export interface IAuthResponse {
	access: string
	refresh: string
}

export interface IAuthForm {
	phone: string
	email: string
}

export type AuthTypes = 'phone' | 'email'
