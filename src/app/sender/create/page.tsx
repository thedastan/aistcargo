import { Metadata } from 'next'

import CreateComponent from '@/components/user-pages/create'

import { NO_INDEX_PAGE } from '@/constants/seo/seo.constants'

export const metadata: Metadata = {
	title: 'Создание посылки',
	...NO_INDEX_PAGE
}
export default function SenderCreatePage() {
	return <CreateComponent />
}
