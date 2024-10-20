import { Metadata } from 'next'

import Profile from '@/components/user-pages/profile'

import { NO_INDEX_PAGE } from '@/constants/seo/seo.constants'

export const metadata: Metadata = {
	title: 'Профиль',
	...NO_INDEX_PAGE
}
export default function ProfilePage() {
	return <Profile />
}
