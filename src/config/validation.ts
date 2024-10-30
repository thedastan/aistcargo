import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import { storageActions } from '@/store/storage/slice'

import { USER_PAGES } from './pages/user-url.config'
import { IAdFormCreate } from '@/models/ad.model'

export function useValidate(type: 'sender' | 'traveler', value: IAdFormCreate) {
	const { push } = useRouter()
	const dispatch = useDispatch()
	const onsubmit = (
		{ isSenderHalf, setStep } = { isSenderHalf: false, setStep: () => {} }
	) => {
		const sender_valid = !!value.from_city && !!value.to_city && !!value.parcel

		const submit = () => {
			dispatch(storageActions.setAdValues(value))
			push(USER_PAGES.PREVIEW_PACKAGE)
		}

		const toastError = () => toast.error('Заполните поле пожалуйста')
		console.log(value)
		if (type === 'sender') {
			if (isSenderHalf) {
				if (sender_valid && !!value.address) setStep()
				else toastError()
			} else {
				if (
					sender_valid &&
					!!value.send_date &&
					!!value.address &&
					typeof value.transport === 'object' &&
					value.transport?.length
				) {
					submit()
				} else toastError()
			}
		} else {
			if (sender_valid && !!value.send_date) {
				submit()
			} else toastError()
		}
	}

	return { onsubmit }
}
