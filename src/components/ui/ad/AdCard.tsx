import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import { GoDotFill } from 'react-icons/go'
import { GoDot } from 'react-icons/go'
import { GrLocation } from 'react-icons/gr'

import CarSvg from '@/assets/svg/CarSvg'

import BoldText from '../texts/BoldText'
import Description from '../texts/Description'
import MiniText from '../texts/MiniText'

const AdCard = () => {
	return (
		<Box
			mt='5'
			bg='#F5F5F5'
			rounded='20px'
			px='5'
			py='6'
		>
			<Flex
				justifyContent='space-between'
				alignItems='center'
			>
				<Flex
					gap='3'
					alignItems='center'
				>
					<Flex
						justifyContent='center'
						alignItems='center'
						w='42px'
						h='42px'
						rounded='50%'
						bg='#FFFFFF'
					>
						<CarSvg />
					</Flex>
					<MiniText
						fontSize='14px'
						lineHeight='19px'
					>
						Машина
					</MiniText>
				</Flex>

				<Text
					fontWeight='600'
					lineHeight='21.79px'
					fontSize='16px'
					color='#43995C'
				>
					Договорная
				</Text>
			</Flex>

			<Box mt='6'>
				<BoldText mb='10px'>Коробка M (65x40x25 см до 15 кг)</BoldText>
				<Description color='#232D37'>
					Беру строго хорошо упакованные грузы/посылки
				</Description>
			</Box>

			<Flex
				gap='14px'
				mt='6'
			>
				<Flex
					mt='25px'
					w='8px'
					flexDirection='column'
					justifyContent='space-between'
					alignItems='center'
					h='70px'
				>
					<GoDotFill fontSize='20px' />
					<Box
						maxH='40px'
						h='100%'
						borderLeft='1px dashed #232D37'
						w='1px'
						mr='-1px'
						opacity='.5'
					/>
					<GoDot fontSize='20px' />
				</Flex>
				<Box
					maxW='100%'
					w='100%'
				>
					<MiniText>Откуда</MiniText>
					<BoldText
						mt='1'
						fontWeight='600'
						fontSize='16px'
					>
						Бишкек, Кыргызстан
					</BoldText>

					<Divider
						w='100%'
						h='1px'
						bg='#232D37'
						opacity='.1'
						my='10px'
					/>

					<MiniText>Куда</MiniText>
					<BoldText
						mt='1'
						fontWeight='600'
						fontSize='16px'
					>
						Москва, Россия
					</BoldText>
				</Box>
			</Flex>

			<Flex
				mt='6'
				gap='10px'
				alignItems='center'
			>
				<GrLocation
					color='#43995C'
					fontSize='20px'
				/>

				<BoldText
					fontWeight='600'
					fontSize='16px'
					color='#43995C'
				>
					Лебедевская 34/2
				</BoldText>
			</Flex>
		</Box>
	)
}

export default AdCard
