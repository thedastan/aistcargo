import { OtpcodeTypes } from "./auth.enum"

export interface IAuthResponse {
	access: string
	refresh: string
}

export interface IAuthForm {
	phone: string
	password: string
}

export interface ISendotpForm {
	phone: string
	type: OtpcodeTypes
}

