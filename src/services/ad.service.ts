import { redirect } from 'next/navigation'

import { AUTH_PAGES } from '@/config/pages/auth-url.config'

import { PRIVATE_API } from '@/api/interceptors'

import { EnumRole, TitlesRole, getUserRole } from './role.service'
import { IAdCreatePayload, IAdUpdatePayload } from '@/models/ad.model'

class AdService {
	private BASE_URL = ''
	constructor() {
		const role = getUserRole()
		// if (!role || role === EnumRole.SUPER_ADMIN) {
		// 	redirect(AUTH_PAGES.REGISTER_CONFIRM)
		// } else {
		this.BASE_URL = `${TitlesRole[role]}/ad/`
		// }
	}

	async getFilterAds() {
		const role = getUserRole()
		const response = await PRIVATE_API.get<any>(this.BASE_URL + 'filter/')

		return response.data
	}

	async getActiveAds() {
		const response = await PRIVATE_API.get<any>(this.BASE_URL + 'active/')

		return response.data
	}

	async getCompletedAds() {
		const response = await PRIVATE_API.get<any>(this.BASE_URL + 'completed/')

		return response.data
	}

	async getDetailAd(id: number | string) {
		const response = await PRIVATE_API.get<any>(this.BASE_URL + `detail/${id}/`)

		return response.data
	}

	async createAd(data: IAdCreatePayload) {
		const response = await PRIVATE_API.post(this.BASE_URL + `create/`, data)

		return response.data
	}

	async updateAd(data: IAdUpdatePayload) {
		const response = await PRIVATE_API.put(
			this.BASE_URL + `detail/${data.id}/`,
			data.value
		)

		return response.data
	}

	async deleteAd(id: number) {
		const response = await PRIVATE_API.delete(this.BASE_URL + `detail/${id}/`)

		return response.data
	}
}

export const adService = new AdService()
