import { RoleTypes } from '@/services/role.service'

export enum EnumGender {
	MAN = '0', //'мужчина'
	WOMAN = '1' //'женщина'
}

export type GenderTypes = typeof EnumGender.MAN | typeof EnumGender.WOMAN

export interface IProfileUpdate {
	first_name?: string
	last_name?: string
	role?: RoleTypes
	sex?: GenderTypes
	password?: string
	birth_date?: string
	email?: string
}

export interface IProfile {
	first_name?: string
	last_name?: string
	role: RoleTypes
	role_label: RoleTypes
	image?: string
	birth_date?: string
	sex?: GenderTypes
	email?: string
}

export interface IAdUser {
	first_name: string
	last_name: string
	image: any
	phone: string
}