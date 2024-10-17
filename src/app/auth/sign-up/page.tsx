import { Metadata } from 'next'

import RegisterForm from '@/components/auth-pages/register-form'

import { NO_INDEX_PAGE } from '@/constants/seo/seo.constants'

export const metadata: Metadata = {
	title: 'Регистрация',
	...NO_INDEX_PAGE
}
export default function RegisterPage() {
	return <RegisterForm />
}
