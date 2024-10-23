import { Metadata } from 'next'

import AdsHistory from '@/components/user-pages/profile/ads-history'

import { NO_INDEX_PAGE } from '@/constants/seo/seo.constants'

export const metadata: Metadata = {
	title: 'История объявлений',
	...NO_INDEX_PAGE
}
export default function ProfilePage() {
	return <AdsHistory />
}
