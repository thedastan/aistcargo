'use client'

import { Box, Container, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { IoMdCheckmark } from 'react-icons/io'

import OrderCard from '@/components/cards/order-card'
import Navbar from '@/components/navbar'

import { THEME_COLOR } from '@/config/_variables.config'

import { useFIlterAds } from '@/hooks/useAds'

import ProfileHead from '../profile/profile-head'

import Filter from './filter'
import { transports } from '@/models/transport.model'

const Home = () => {
	const [active, setActive] = useState(0)
	const { data, isLoading } = useFIlterAds()
	return (
		<Box py='5'>
			<ProfileHead />

			<Flex
				mt='6'
				overflowX='auto'
				className='unscroll'
				w='100%'
			>
				<Flex
					h='40px'
					gap='10px'
					px='4'
				>
					<Filter />
					<FIlterButtonCard
						handleClick={() => setActive(0)}
						isActive={active === 0}
						name={'Все'}
					/>
					{transports.map(el => (
						<FIlterButtonCard
							key={el.id}
							handleClick={() => setActive(el.id)}
							isActive={active === el.id}
							name={el.name}
						/>
					))}
				</Flex>
			</Flex>
			<Container>
				<SimpleGrid
					mt='10px'
					spacing='9px 10px'
					columns={2}
				>
					{[1, 2, 3, 4, 5, 6].map(el => (
						<OrderCard key={el} />
					))}
				</SimpleGrid>
			</Container>

			<Navbar />
		</Box>
	)
}

interface FIlterButtonCardProps {
	isActive: boolean
	handleClick: () => void
	name: string
}
function FIlterButtonCard({
	handleClick,
	isActive,
	name
}: FIlterButtonCardProps) {
	return (
		<Flex
			onClick={handleClick}
			bg={isActive ? THEME_COLOR : '#F5F5F5'}
			border={`1px solid ${isActive ? THEME_COLOR : '#232D3714'}`}
			px='4'
			alignItems='center'
			py='10px'
			rounded='8px'
			cursor='pointer'
			_active={{ opacity: '.8' }}
			gap='2'
		>
			<Text
				whiteSpace='nowrap'
				fontWeight='400'
				fontSize='14px'
				lineHeight='19.07px'
				color={isActive ? '#FFFFFF' : 'rgba(35, 45, 55, .5)'}
			>
				{name}
			</Text>
			{isActive && (
				<IoMdCheckmark
					fontSize='16px'
					color='#FFFFFF'
				/>
			)}
		</Flex>
	)
}

export default Home
