import { PRIVATE_API } from '@/api/interceptors'

import { TitlesRole, getUserRole } from './role.service'
import { AdFilterForm, IAdCreatePayload, IAdModel } from '@/models/ad.model'

class AdService {
	private BASE_URL = ''
	constructor() {
		const role = getUserRole()

		this.BASE_URL = `${TitlesRole[role]}/ad/`
	}

	async getFilterAds(filter?: AdFilterForm) {
		const from_city = filter?.from_city.id
			? `from_city=${filter.from_city.id}`
			: ''
		const to_city = filter?.to_city.id ? `to_city=${filter.to_city.id}` : ''
		const send_date = filter?.send_date ? `send_date=${filter.send_date}` : ''

		const arr = [from_city, to_city, send_date].filter(el => !!el)
		const filter_path = arr.length ? '?' + arr.join('&') : ''
		const response = await PRIVATE_API.get<IAdModel[]>(
			this.BASE_URL + `filter/${filter_path}`
		)

		return response.data
	}

	async getActiveAds() {
		const response = await PRIVATE_API.get<IAdModel[]>(
			this.BASE_URL + 'active/'
		)

		return response.data
	}

	async getCompletedAds() {
		const response = await PRIVATE_API.get<any>(this.BASE_URL + 'completed/')

		return response.data
	}

	async getDetailAd(id: number | string) {
		const response = await PRIVATE_API.get<IAdModel[]>(
			this.BASE_URL + `detail/${id}/`
		)

		return response.data
	}

	async createAd(data: IAdCreatePayload) {
		const response = await PRIVATE_API.post(this.BASE_URL + `create/`, data)

		return response.data
	}

	async updateAd(data: IAdCreatePayload) {
		const response = await PRIVATE_API.put(
			this.BASE_URL + `update/${data.id}/`,
			data
		)

		return response.data
	}

	async deleteAd(id: number) {
		const response = await PRIVATE_API.delete(this.BASE_URL + `detail/${id}/`)

		return response.data
	}
}

export const adService = new AdService()
