export interface IAdUpdatePayload {
	id: number
	value: any
}

export interface IAdFormCreate {
	from_city: string
	to_city: string
	address: string
	parcel: string
	description?: string
	transport: null | number | string[]
	send_date: string
	price?: string
	phone?: string
}
