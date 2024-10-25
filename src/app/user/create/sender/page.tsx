import { Metadata } from 'next'

import CreateComponentSender from '@/components/user-pages/create/sender'

import { NO_INDEX_PAGE } from '@/constants/seo/seo.constants'

export const metadata: Metadata = {
	title: 'Создание посылки',
	...NO_INDEX_PAGE
}
export default function SenderCreatePage() {
	return <CreateComponentSender />
}
