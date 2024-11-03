import moment from 'moment'
import { toast } from 'sonner'

import { SITE_NAME } from '@/constants/seo/seo.constants'

export function ToastError(e: any) {
	const key = Object.keys(e.response?.data)[0]
	toast.error(
		e.response?.data?.email ||
			e.response?.data?.detail ||
			e.response?.data?.non_field_errors ||
			e.response?.data?.message ||
			e.response?.data[key] ||
			'Произошла ошибка!'
	)
}

// non_field_errors
export const getPadTime = (time: number) => {
	return time.toString().padStart(2, '0')
}

export const sharePageLink = () => {
	if (typeof window !== 'undefined') {
		window.navigator.share({
			text: '',
			url: window.location.href,
			title: SITE_NAME
		})
	}
}

export function scrollToEnd() {
	window.scrollTo(0, document.body.scrollHeight)
}
