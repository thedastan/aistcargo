import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import { ToastError } from '@/config/helpers'
import { USER_PAGES } from '@/config/pages/user-url.config'

import { storageActions } from '@/store/slices/storage-slice'

import { IAdCreatePayload } from '@/models/ad.model'
import { adService } from '@/services/ad.service'

export function useFIlterAds() {
	const { data, isLoading } = useQuery({
		queryKey: ['all-ads'],
		queryFn: () => adService.getFilterAds()
	})

	return { data, isLoading }
}

export function useAdCreate() {
	const { push } = useRouter()
	const queryClient = useQueryClient()
	const dispatch = useDispatch()
	const { mutate, isPending } = useMutation({
		mutationKey: ['update-profile'],
		mutationFn: (data: IAdCreatePayload) => adService.createAd(data),
		onSuccess() {
			push(USER_PAGES.HOME)
			queryClient.invalidateQueries({ queryKey: ['all-ads'] })
			toast.success('Объявление добавлено')
			dispatch(storageActions.resetFrom())
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { mutate, isPending }
}
