import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ToastError } from '@/config/helpers'

import { IAuthForm } from '@/models/auth.model'
import { authService } from '@/services/auth.service'

export function useVerify(success: () => void, error?: () => void) {
	const { mutate, isPending } = useMutation({
		mutationKey: ['verify'],
		mutationFn: (code: string) => authService.verify(code),
		onSuccess() {
			success()
			toast.success('Вы успешно зарегистрировались. Подождите...')
		},
		onError(e) {
			ToastError(e)
			error && error()
		}
	})

	return { mutate, isPending }
}

export function useOtpSent(isAuthTypeEmail: boolean, success: () => void) {
	const { mutate, isPending } = useMutation({
		mutationKey: ['otp-send'],
		mutationFn: (data: IAuthForm) => authService.sendOtpCode(data),
		onSuccess() {
			success()
			toast.success(
				`На ${!isAuthTypeEmail ? 'ваш номер' : 'вашу почту'} отправили смс код. Проверьте`
			)
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { mutate, isPending }
}
