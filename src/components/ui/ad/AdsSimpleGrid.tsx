import { SimpleGrid } from '@chakra-ui/react'

import OrderCard from '@/components/cards/order-card'
import OrderSkeleton from '@/components/cards/order-skeleton'

import EmptyText from '../texts/EmptyText'

import { IAdModel } from '@/models/ad.model'

interface AdsSimpleGridProps {
	isLoading: boolean
	data: IAdModel[] | undefined
	isEdit?: boolean
}

const AdsSimpleGrid = ({ data, isLoading, isEdit }: AdsSimpleGridProps) => {
	return (
		<>
			{!isLoading && !data?.length && <EmptyText />}
			{isLoading && <OrderSkeleton />}
			<SimpleGrid
				spacing='9px 10px'
				columns={2}
			>
				{data?.map(el => (
					<OrderCard
						ad={el}
						key={el.id}
						isEdit={!!isEdit}
					/>
				))}
			</SimpleGrid>
		</>
	)
}

export default AdsSimpleGrid
