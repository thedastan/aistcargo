import { Metadata } from 'next'

import ProfileForm from '@/components/user-pages/profile/form-edit'

import { NO_INDEX_PAGE } from '@/constants/seo/seo.constants'

export const metadata: Metadata = {
	title: 'Редактирование',
	...NO_INDEX_PAGE
}
export default function ProfilePage() {
	return <ProfileForm />
}
