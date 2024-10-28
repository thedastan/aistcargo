import { Flex, Stack } from '@chakra-ui/react'
import Link from 'next/link'
import { BiSolidPlane } from 'react-icons/bi'
import { FaChevronRight } from 'react-icons/fa6'
import { HiTruck } from 'react-icons/hi'
import { IconType } from 'react-icons/lib'
import { RiCarFill } from 'react-icons/ri'

import DrawerModal from '@/components/ui/drawer'
import Title from '@/components/ui/texts/Title'

import AirplaneSvg from '@/assets/svg/AirplaneSvg'
import CarSvg from '@/assets/svg/CarSvg'
import TruckSvg from '@/assets/svg/TruckSvg'

import { USER_PAGES } from '@/config/pages/user-url.config'

interface TransportModalProps {
	isOpen: boolean
	onClose: () => void
}

const TransportModal = ({ isOpen, onClose }: TransportModalProps) => {
	return (
		<DrawerModal
			title='Стать попутчиком'
			isOpen={isOpen}
			onClose={onClose}
		>
			<Stack
				spacing='9px'
				pb='2'
			>
				<ButtonCard
					icon={CarSvg}
					name='Машина'
				/>
				<ButtonCard
					icon={AirplaneSvg}
					name='Самолёт'
				/>
				<ButtonCard
					icon={TruckSvg}
					name='Грузовик'
				/>
			</Stack>
		</DrawerModal>
	)
}

interface ButtonCardProps {
	name: string
	icon: () => JSX.Element
}
function ButtonCard(props: ButtonCardProps) {
	return (
		<Link href={USER_PAGES.CREATE_TRAVELER}>
			<Flex
				justifyContent='space-between'
				alignItems='center'
				bg='#F3F8F3'
				rounded='100px'
				px='4'
				py='10px'
			>
				<Flex
					alignItems='center'
					gap='3'
				>
					<Flex
						justifyContent='center'
						alignItems='center'
						rounded='50%'
						w='42px'
						h='42px'
						bg='#FFFFFF'
						border='1px solid #F4F4F4'
						fontSize='24px'
					>
						<props.icon />
					</Flex>
					<Title
						fontSize='18px'
						lineHeight='24.51px'
						textAlign='start'
					>
						{props.name}
					</Title>
				</Flex>

				<FaChevronRight
					color='#000000'
					fontSize='14px'
				/>
			</Flex>
		</Link>
	)
}

export default TransportModal
