import { IAdUser } from './profile.model'
import { IListItem, PartialListItem } from './transport.model'

export interface IAdFormCreate {
	id?: number
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
	id?: number
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

export interface IAdModel {
	id: number
	user: IAdUser
	transport: number[]
	price: string
	parcel: IListItem
	description: string
	from_city: IListItem
	to_city: IListItem
	address: string
	ads_media: any[]
	send_date: string
	created_at: string
}

export interface AdFilterForm {
	from_city: PartialListItem
	to_city: PartialListItem
	send_date: string
}
