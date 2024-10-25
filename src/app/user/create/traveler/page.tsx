import { Metadata } from 'next'


import { NO_INDEX_PAGE } from '@/constants/seo/seo.constants'
import CreateComponentTraveler from '@/components/user-pages/create/traveler'

export const metadata: Metadata = {
	title: 'Стать попутчиком',
	...NO_INDEX_PAGE
}
export default function TravelerCreatePage() {
	return <CreateComponentTraveler />
}
