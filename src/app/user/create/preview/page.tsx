import { Metadata } from 'next'

import PreviewAdComponent from '@/components/user-pages/create/preview'

import { NO_INDEX_PAGE } from '@/constants/seo/seo.constants'

export const metadata: Metadata = {
	title: 'Предпросмотр',
	...NO_INDEX_PAGE
}
export default function PreviewPage() {
	return <PreviewAdComponent />
}
