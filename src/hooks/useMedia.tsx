import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ToastError } from '@/config/helpers'

import { IMediaPayload } from '@/models/ad.model'
import { mediaService } from '@/services/media.service'

export function useFilesUpload(onSuccess: () => void) {
	const { mutate, isPending } = useMutation({
		mutationKey: ['file-upload'],
		mutationFn: (data: IMediaPayload) => mediaService.upload(data),
		onSuccess() {
			onSuccess()
			toast.success('Файлы загрузились')
		},
		onError(e) {
			ToastError(e)
		}
	})

	return { upload: mutate, isLoading: isPending }
}
