import { Box, Flex, Stack, useDisclosure } from '@chakra-ui/react'
import { GoChevronRight } from 'react-icons/go'

import CarSvg from '@/assets/svg/CarSvg'

import AdCard from '../ui/ad/AdCard'
import AdDates from '../ui/ad/AdDates'
import PhoneTitle from '../ui/ad/PhoneTitle'
import DrawerModal from '../ui/drawer'
import BoldText from '../ui/texts/BoldText'
import MiniText from '../ui/texts/MiniText'

const OrderCard = () => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	return (
		<>
			<Box
				px='14px'
				py='5'
				bg='#EBF0EB'
				rounded='20px'
			>
				<Flex
					onClick={onOpen}
					justifyContent='space-between'
					alignItems='center'
					cursor='pointer'
				>
					<Flex
						gap='2'
						alignItems='center'
					>
						<Flex
							justifyContent='center'
							alignItems='center'
							bg='#FFFFFF'
							border='1px solid #F4F4F4'
							rounded='50%'
							w='42px'
							h='42px'
							fontSize='20px'
						>
							<CarSvg />
						</Flex>
						<MiniText
							lineHeight='19.07px'
							fontSize='14px'
						>
							Машина
						</MiniText>
					</Flex>
					<GoChevronRight
						color='#232D37'
						fontSize='20px'
					/>
				</Flex>

				<Flex
					justifyContent='space-between'
					alignItems='center'
					gap='2'
					mt='14px'
				>
					<BoldText>Коробка M</BoldText>
					<MiniText>10кг</MiniText>
				</Flex>

				<Stack
					mt='5'
					spacing='2px'
				>
					<MiniText>Откуда</MiniText>
					<BoldText
						fontWeight='600'
						fontSize='14px'
					>
						Бишкек, Кыргызстан
					</BoldText>
				</Stack>
				<Stack
					mt='6px'
					spacing='2px'
				>
					<MiniText>Куда</MiniText>
					<BoldText
						fontSize='14px'
						fontWeight='600'
					>
						Москва, Россия
					</BoldText>
				</Stack>

				<Box mt='5'>
					<BoldText
						fontWeight='600'
						color='#43995C'
						lineHeight='24.51px'
					>
						Договорная
					</BoldText>

					<Flex
						justifyContent='space-between'
						alignItems='center'
						mt='6px'
					>
						<MiniText>Дата отправки:</MiniText>
						<MiniText
							fontSize='14px'
							lineHeight='19.07px'
						>
							14 Сен
						</MiniText>
					</Flex>
				</Box>
			</Box>

			<DrawerModal
				isOpen={isOpen}
				onClose={onClose}
				title='Детали'
			>
				{/* <PhoneTitle />
				<AdCard />
				<AdDates /> */}
			</DrawerModal>
		</>
	)
}

export default OrderCard
