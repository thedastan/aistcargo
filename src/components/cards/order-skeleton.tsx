import {
	Box,
	Flex,
	SimpleGrid,
	Skeleton,
	SkeletonCircle,
	SkeletonText
} from '@chakra-ui/react'

const OrderSkeleton = () => {
	return (
		<SimpleGrid
			spacing='9px 10px'
			columns={2}
		>
			{[1, 2, 3, 4].map(el => (
				<Box
					key={el}
					h='280px'
					rounded='20px'
					px='14px'
					py='5'
				>
					<Flex
						alignItems='center'
						gap='2'
					>
						<SkeletonCircle
							w='42px'
							h='42px'
							// endColor='#24B23E'
						/>
						<Skeleton
							w='69px'
							h='10px'
							// endColor='#24B23E'
						/>
					</Flex>
					<SkeletonText
						mt='5'
						skeletonHeight='2'
						// endColor='#24B23E'
					/>
					<SkeletonText
						w='50%'
						noOfLines={2}
						mt='5'
						skeletonHeight='2'
						// endColor='#24B23E'
					/>
					<SkeletonText
						mt='5'
						skeletonHeight='2'
						// endColor='#24B23E'
					/>
					<Flex
						mt='5'
						gap='2'
						// justifyContent='space-between'
					>
						<Skeleton
							w='40px'
							height='2'
							// endColor='#24B23E'
						/>
						<Skeleton
							w='40px'
							height='2'
							// endColor='#24B23E'
						/>
					</Flex>
				</Box>
			))}
		</SimpleGrid>
	)
}

export default OrderSkeleton
