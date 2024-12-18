import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import { ToastError } from '@/config/helpers'
import { USER_PAGES } from '@/config/pages/user-url.config'

import { storageActions } from '@/store/slices/storage-slice'

import { AdFilterForm, IAdCreatePayload } from '@/models/ad.model'
import { adService } from '@/services/ad.service'
import { TitlesRole, getUserRole } from '@/services/role.service'

function getFilterDataKey() {
	const role = getUserRole()
	return `${TitlesRole[role]}-ads`
}

export function useFIlterAds(transport: number, filter?: AdFilterForm) {
	const KEY = getFilterDataKey()
	const { data, isLoading } = useQuery({
		queryKey: [KEY, filter],
		queryFn: () => adService.getFilterAds(filter)
	})

	const result = !transport
		? data
		: data?.filter(el => {
				if (typeof el.transport === 'number') {
					return el.transport === transport
				} else {
					return el.transport.includes(transport)
				}
			})

	return { data: result, isLoading }
}

interface AdPayload {
	files?: File[]
	ad: IAdCreatePayload
}

export function useAdCreate(isUpdate: boolean) {
	const { push } = useRouter()
	const queryClient = useQueryClient()
	const dispatch = useDispatch()

	const { mutate, isPending } = useMutation({
		mutationKey: [`create-ad`],
		mutationFn: (payload: AdPayload) =>
			adService.mutate(payload.ad, payload.files),
		onSuccess() {
			push(USER_PAGES.AD_MANAGEMENT)
			dispatch(storageActions.resetFrom())
			queryClient.invalidateQueries({ queryKey: ['active-ads'] })
			toast.success(isUpdate ? 'Объявление обновлено' : 'Объявление добавлено')
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

export function useRemoveAd(onClose: () => void) {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: [`remove-ad`],
		mutationFn: (id: number) => adService.deleteAd(id),
		onSuccess() {
			onClose()
			queryClient.invalidateQueries({ queryKey: ['active-ads'] })
			toast.success('удалено')
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { remove: mutate, isPending }
}
