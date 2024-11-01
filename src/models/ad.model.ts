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
	transport: null | number | string[]
	send_date: string
	price?: string
	phone?: string
}
