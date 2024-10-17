import { Metadata } from 'next'

import AuthForm from '@/components/auth-pages/auth-form'

import { NO_INDEX_PAGE } from '@/constants/seo/seo.constants'

export const metadata: Metadata = {
	title: 'Вход',
	...NO_INDEX_PAGE
}
export default function AuthPage() {
	return <AuthForm />
}
