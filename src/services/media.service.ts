import { PRIVATE_API } from '@/api/interceptors'

import { IMedia, IMediaPayload } from '@/models/ad.model'



class MediaService {
	private BASE_URL = 'sender/ad/create/media/'

	async getMediaFiles(payload: IMediaPayload) {
		const config = {
			headers: { 'Content-type': 'multipart/form-data' }
		}
		return Promise.all(
			payload.files.map(async file => {
				let formData = new FormData()
				// formData.append('jsonData', JSON.stringify({ ad: payload.id }))
				formData.append('ad', payload.id.toString())
				const response = await PRIVATE_API.post<IMedia>(
					this.BASE_URL,
					formData,
					config
				)
				return response.data.image
			})
		).then(image => {
			return image
		})
	}
}

export const mediaService = new MediaService()
