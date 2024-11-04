import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import { ToastError } from '@/config/helpers'
import { USER_PAGES } from '@/config/pages/user-url.config'

import { storageActions } from '@/store/slices/storage-slice'

import { useFilesUpload } from './useMedia'
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

export function useAdCreate(isUpdate: boolean, files: File[]) {
	const { push } = useRouter()
	const queryClient = useQueryClient()
	const dispatch = useDispatch()
	const KEY = getFilterDataKey()
	const onSuccess = () => {
		push(USER_PAGES.AD_MANAGEMENT)
		dispatch(storageActions.resetFrom())
		queryClient.invalidateQueries({ queryKey: [KEY] })
		toast.success(isUpdate ? 'Объявление обновлено' : 'Объявление добавлено')
	}
	const { upload, isLoading } = useFilesUpload(onSuccess)

	const { mutate, isPending } = useMutation({
		mutationKey: [`create-${KEY}`],
		mutationFn: (data: IAdCreatePayload) =>
			data.id ? adService.updateAd(data) : adService.createAd(data),
		onSuccess(id) {
			if (!!files.length) {
				upload({ id, files })
			} else onSuccess()

			onSuccess()
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { mutate, isPending: isPending || isLoading }
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
