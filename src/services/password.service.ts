import { PRIVATE_API, PUBLIC_API } from '@/api/interceptors'

import { IChangePassword, IResetPassword } from '@/models/reset-password'

class PasswordService {
	private BASE_URL = 'account/password/'

	async changePassword(payload: IChangePassword) {
		const response = await PRIVATE_API.put(this.BASE_URL + 'change/', payload)

		return response.data
	}

	async resetPassword(payload: IResetPassword) {
		const response = await PUBLIC_API.post(this.BASE_URL + 'reset/', payload)

		return response.data
	}
}

export const passwordService = new PasswordService()
