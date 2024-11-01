import { Flex, Stack } from '@chakra-ui/react'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'

import DrawerModal from '@/components/ui/drawer'
import Title from '@/components/ui/texts/Title'

import { USER_PAGES } from '@/config/pages/user-url.config'

import { default_ad_value, storageActions } from '@/store/slices/storage-slice'

import { ITransportType, transports } from '@/models/transport.model'

interface TransportModalProps {
	isOpen: boolean
	onClose: () => void
}

const TransportModal = ({ isOpen, onClose }: TransportModalProps) => {
	const dispatch = useDispatch()

	const setTransportId = (transport: number) => {
		dispatch(storageActions.setAdValues({ ...default_ad_value, transport }))
	}
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
				{transports.map(el => (
					<ButtonCard
						onClick={setTransportId}
						key={el.id}
						{...el}
					/>
				))}
			</Stack>
		</DrawerModal>
	)
}

interface ButtonCardProps extends ITransportType {
	onClick: (id: number) => void
}
function ButtonCard(props: ButtonCardProps) {
	return (
		<Link
			href={USER_PAGES.CREATE_TRAVELER}
			onClick={() => props.onClick(props.id)}
		>
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
