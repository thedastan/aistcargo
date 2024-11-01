import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ToastError } from '@/config/helpers'

import { IProfileUpdate } from '@/models/profile.model'
import { profileService } from '@/services/profile.service'

export function useProfile() {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => profileService.get()
	})

	return { user: data, isLoading }
}

export function useProfileUpdate(onSuccess?: () => void) {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['update-profile'],
		mutationFn: (data: IProfileUpdate) => profileService.update(data),
		onSuccess() {
			onSuccess && onSuccess()
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			toast.success('Профиль обновился')
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { mutate, isPending }
}

export function useAvatarUpdate() {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['avatar-update'],
		mutationFn: (file: File) => profileService.updateAvatar(file),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			toast.success('Ваши данные сохранены!')
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { mutate, isPending }
}

export function getFullName(
	firsName: string | undefined,
	lastName: string | undefined
) {
	return (
		`${firsName ? firsName : '' + (lastName ? ` ${lastName}` : '')}` || 'ФИО'
	)
}
