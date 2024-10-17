import { redirect } from 'next/navigation'

import { PUBLIC_PAGES } from '@/config/pages/public-url.config'

export default function Home() {
	return redirect(PUBLIC_PAGES.AUTH)
}
