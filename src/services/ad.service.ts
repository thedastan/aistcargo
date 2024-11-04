import { AxiosResponse } from 'axios'

import { PRIVATE_API } from '@/api/interceptors'

import { mediaService } from './media.service'
import { EnumRole, TitlesRole, getUserRole } from './role.service'
import { AdFilterForm, IAdCreatePayload, IAdModel } from '@/models/ad.model'

const FilterAdsRole = {
	[EnumRole.SUPER_ADMIN]: TitlesRole[EnumRole.SUPER_ADMIN],
	[EnumRole.SENDER]: TitlesRole[EnumRole.TRAVELER],
	[EnumRole.TRAVELER]: TitlesRole[EnumRole.SENDER]
}

class AdService {
	private BASE_URL = ''
	private BASE_URL_FILTER = ''
	constructor() {
		const role = getUserRole()

		this.BASE_URL = `${TitlesRole[role]}/ad/`
		this.BASE_URL_FILTER = `${FilterAdsRole[role]}/ad/`
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
			this.BASE_URL_FILTER + `filter/${filter_path}`
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

	async mutate(payload: IAdCreatePayload, files?: File[]) {
		function uploadImages({ data }: AxiosResponse<IAdModel>) {
			if (files && files.length > 0) {
				return mediaService.upload({ files, id: payload.id || data.id })
			}
		}

		return payload.id
			? PRIVATE_API.put<IAdModel>(
					this.BASE_URL + `update/${payload.id}/`,
					payload
				).then(uploadImages)
			: PRIVATE_API.post<IAdModel>(this.BASE_URL + `create/`, payload).then(
					uploadImages
				)
	}

	async updateAd(data: IAdCreatePayload) {
		const response = await PRIVATE_API.put<IAdModel>(
			this.BASE_URL + `update/${data.id}/`,
			data
		)

		return response.data.id
	}

	async deleteAd(id: number) {
		const response = await PRIVATE_API.delete(this.BASE_URL + `delete/${id}/`)

		return response.data
	}
}

export const adService = new AdService()
