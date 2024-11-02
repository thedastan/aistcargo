import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import { ToastError } from '@/config/helpers'
import { USER_PAGES } from '@/config/pages/user-url.config'

import { storageActions } from '@/store/slices/storage-slice'

import { AdFilterForm, IAdCreatePayload } from '@/models/ad.model'
import { adService } from '@/services/ad.service'

export function useFIlterAds(transport: number, filter?: AdFilterForm) {
	const { data, isLoading } = useQuery({
		queryKey: ['all-ads', filter],
		queryFn: () => adService.getFilterAds(filter)
	})

	const result = !transport
		? data
		: data?.filter(el => el.transport.includes(transport))

	return { data: result, isLoading }
}

export function useAdCreate(isUpdate?: boolean) {
	const { push } = useRouter()
	const queryClient = useQueryClient()
	const dispatch = useDispatch()
	const { mutate, isPending } = useMutation({
		mutationKey: ['create-ad'],
		mutationFn: (data: IAdCreatePayload) =>
			data.id ? adService.updateAd(data) : adService.createAd(data),
		onSuccess() {
			push(USER_PAGES.HOME)
			queryClient.invalidateQueries({ queryKey: ['all-ads'] })
			toast.success(isUpdate ? 'Объявление обновлено' : 'Объявление добавлено')
			dispatch(storageActions.resetFrom())
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { mutate, isPending }
}

export function useActiveAds() {
	const { data, isLoading } = useQuery({
		queryKey: ['active-ads'],
		queryFn: () => adService.getActiveAds()
	})

	return { data, isLoading }
}

export function useAdsHistory() {
	const { data, isLoading } = useQuery({
		queryKey: ['history-ads'],
		queryFn: () => adService.getCompletedAds()
	})

	return { data, isLoading }
}
