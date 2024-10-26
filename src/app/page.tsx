import { redirect } from 'next/navigation'

import { AUTH_PAGES } from '@/config/pages/auth-url.config'

export default function Home() {
	return redirect(AUTH_PAGES.AUTH)
}
