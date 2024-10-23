import { Metadata } from 'next'

import AdManagement from '@/components/user-pages/profile/ad-management'

import { NO_INDEX_PAGE } from '@/constants/seo/seo.constants'

export const metadata: Metadata = {
	title: 'Управление',
	...NO_INDEX_PAGE
}
export default function ProfilePage() {
	return <AdManagement />
}
