'use client'

import { Box, Container, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { IoMdCheckmark } from 'react-icons/io'

import OrderCard from '@/components/cards/order-card'
import Navbar from '@/components/navbar'

import { THEME_COLOR } from '@/config/_variables.config'

import ProfileHead from '../profile/profile-head'

const data = ['Все', 'Самолёт', 'Машина', 'Грузовик']

const SenderMain = () => {
	const [active, setActive] = useState(data[0])
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
					{data.map((el, idx) => (
						<Flex
							onClick={() => setActive(el)}
							bg={active === el ? THEME_COLOR : '#F5F5F5'}
							border={`1px solid ${active === el ? THEME_COLOR : '#232D3714'}`}
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
								color={active === el ? '#FFFFFF' : 'rgba(35, 45, 55, .5)'}
							>
								{el}
							</Text>
							{active === el && (
								<IoMdCheckmark
									fontSize='16px'
									color='#FFFFFF'
								/>
							)}
						</Flex>
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

export default SenderMain
