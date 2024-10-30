import { PUBLIC_API } from '@/api/interceptors'

import { IListItem } from '@/models/transport.model'

class OtherService {
	async getCity() {
		const response = await PUBLIC_API.get<IListItem[]>('account/city/')

		return response.data
	}

	async getParcelTypes() {
		const response = await PUBLIC_API.get<IListItem[]>('sender/parcel/type/')

		return response.data
	}
	async getTransportTypes() {
		const response = await PUBLIC_API.get<IListItem[]>('sender/transport/type/')

		return response.data
	}
}

export const otherService = new OtherService()
