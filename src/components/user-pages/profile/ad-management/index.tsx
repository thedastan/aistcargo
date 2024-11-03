'use client'

import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

import InterfaceShape from '@/components/layout-templates/interface-template'
import AdsSimpleGrid from '@/components/ui/ad/AdsSimpleGrid'
import Title from '@/components/ui/texts/Title'

import { USER_PAGES } from '@/config/pages/user-url.config'

import { useActiveAds } from '@/hooks/useAds'

const AdManagement = () => {
	const { push } = useRouter()
	const { data, isLoading } = useActiveAds()
	return (
		<InterfaceShape
			title='Управление'
			backFn={() => push(USER_PAGES.PROFILE)}
		>
			<Box>
				<Title
					mb='14px'
					textAlign='start'
					fontSize='18px'
					lineHeight='24px'
				>
					Мои объявления
				</Title>
				<AdsSimpleGrid
					data={data}
					isLoading={isLoading}
					isEdit={true}
				/>
			</Box>
		</InterfaceShape>
	)
}

export default AdManagement
