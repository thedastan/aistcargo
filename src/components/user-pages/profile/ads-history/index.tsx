'use client'

import { Box } from '@chakra-ui/react'

import InterfaceShape from '@/components/layout-templates/interface-template'
import AdsSimpleGrid from '@/components/ui/ad/AdsSimpleGrid'

import { useAdsHistory } from '@/hooks/useAds'

const AdsHistory = () => {
	const { data, isLoading } = useAdsHistory()
	return (
		<InterfaceShape title='История объявлений'>
			<Box>
				<AdsSimpleGrid
					data={data}
					isLoading={isLoading}
				/>
			</Box>
		</InterfaceShape>
	)
}

export default AdsHistory
