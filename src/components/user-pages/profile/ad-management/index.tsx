'use client'

import { Box, SimpleGrid } from '@chakra-ui/react'

import OrderCard from '@/components/cards/order-card'
import OrderSkeleton from '@/components/cards/order-skeleton'
import InterfaceShape from '@/components/layout-templates/interface-template'

import { useActiveAds } from '@/hooks/useAds'

const AdManagement = () => {
	const { data, isLoading } = useActiveAds()
	return (
		<InterfaceShape title='Управление'>
			<Box>
				{isLoading && <OrderSkeleton />}
				<SimpleGrid
					spacing='9px 10px'
					columns={2}
				>
					{data?.map(el => (
						<OrderCard
							ad={el}
							key={el.id}
							isEdit={true}
						/>
					))}
				</SimpleGrid>
			</Box>
		</InterfaceShape>
	)
}

export default AdManagement
