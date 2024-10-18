import { Metadata } from 'next'

import ResetPasswordForm from '@/components/auth-pages/reset-password'

import { NO_INDEX_PAGE } from '@/constants/seo/seo.constants'

export const metadata: Metadata = {
	title: 'Забыли пароль?',
	...NO_INDEX_PAGE
}
export default function AuthPage() {
	return <ResetPasswordForm />
}
