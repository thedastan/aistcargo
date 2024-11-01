import { PartialListItem } from './transport.model'

export interface IAdUpdatePayload {
	id: number
	value: any
}

export interface IAdFormCreate {
	from_city: PartialListItem
	to_city: PartialListItem
	parcel: PartialListItem
	address: string
	description?: string
	transport: string[]
	send_date: string
	price?: string
	phone?: string
}

export interface IAdCreatePayload {
	from_city?: number
	to_city?: number
	parcel?: number
	address: string
	description?: string
	transport?: number | string | string[]
	send_date: string
	price?: string
	phone?: string
}
