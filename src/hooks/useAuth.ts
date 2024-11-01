import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { ToastError } from '@/config/helpers'
import { USER_PAGES } from '@/config/pages/user-url.config'

import { IAuthForm, ISendotpForm } from '@/models/auth.model'
import { authService } from '@/services/auth.service'
import { saveUserRole } from '@/services/role.service'

export function useLogin() {
	const { push } = useRouter()
	const { mutate, isPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IAuthForm) => authService.auth(data),
		onSuccess() {
			push(USER_PAGES.HOME)
			toast.success('Вы успешно вошли в систему')
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { auth: mutate, isPending }
}

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

export function useOtpSent(success: () => void) {
	const { mutate, isPending } = useMutation({
		mutationKey: ['otp-send'],
		mutationFn: (data: ISendotpForm) => authService.sendOtpCode(data),
		onSuccess() {
			success()
			toast.success(`На ваш номер отправили смс код. Напишите`)
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { mutate, isPending }
}
