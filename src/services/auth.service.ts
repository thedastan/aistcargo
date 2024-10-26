import { PUBLIC_API } from '@/api/interceptors'

import { getAccessToken, saveTokenStorage } from './auth-token.services'
import { EnumRole, saveUserRole } from './role.service'
import { IAuthForm, IAuthResponse, ISendotpForm } from '@/models/auth.model'

export const authService = {
	async auth(data: IAuthForm) {
		const response = await PUBLIC_API.post<IAuthResponse>(
			`account/token/access/`,
			data
		)
		saveUserRole(EnumRole.SENDER)
		if (response.data.access) saveTokenStorage(response.data)
	},

	async sendOtpCode(data: ISendotpForm) {
		const response = await PUBLIC_API.post<IAuthResponse>(
			`account/otp/send/`,
			data
		)
		if (response.data.access) saveTokenStorage(response.data)
	},

	async verify(otp: string) {
		const response = await PUBLIC_API.post<IAuthResponse>(
			`account/otp/verify/`,
			{ otp }
		)
		saveUserRole(EnumRole.SENDER)
		if (response.data.access) saveTokenStorage(response.data)
	},

	// update token
	async getNewTokens() {
		const response = await PUBLIC_API.post<IAuthResponse>(
			'account/token/refresh/',
			{
				refresh: getAccessToken()
			}
		)
		if (response.data.access) saveTokenStorage(response.data)
		return response
	}
}
