import { Metadata } from 'next'

import SenderMain from '@/components/user-pages/home'

import { NO_INDEX_PAGE } from '@/constants/seo/seo.constants'

export const metadata: Metadata = {
	title: 'Отправитель',
	...NO_INDEX_PAGE
}
export default function SenderHomePage() {
	return <SenderMain />
}
