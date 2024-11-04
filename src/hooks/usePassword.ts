import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ToastError } from '@/config/helpers'

import { IChangePassword, IResetPassword } from '@/models/reset-password'
import { passwordService } from '@/services/password.service'

export function usePasswordChange(onClose: () => void) {
	const { mutate, isPending } = useMutation({
		mutationKey: [`change-password`],
		mutationFn: (payload: IChangePassword) =>
			passwordService.changePassword(payload),
		onSuccess() {
			onClose()
			toast.success('Пароль изменён')
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { mutate, isPending }
}

export function usePasswordReset(onClose: () => void) {
	const { mutate, isPending } = useMutation({
		mutationKey: [`reset-password`],
		mutationFn: (payload: IResetPassword) =>
			passwordService.resetPassword(payload),
		onSuccess() {
			onClose()
			toast.success('Пароль изменён')
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { reset: mutate, isLoading: isPending }
}
