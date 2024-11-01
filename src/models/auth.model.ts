import { OtpcodeTypes } from './auth.enum'
import { RoleTypes } from '@/services/role.service'

export interface IAuthResponse {
	access: string
	refresh: string
	role: RoleTypes | null
}

export interface IAuthForm {
	phone: string
	password: string
}

export interface ISendotpForm {
	phone: string
	type: OtpcodeTypes
}
