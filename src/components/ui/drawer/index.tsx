import {
	Box,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay
} from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

import { open_sans } from '@/constants/fonts/fonts'

import Title from '../texts/Title'

interface IModalProps extends PropsWithChildren {
	isOpen: boolean
	onClose: () => void
	title: string
}

function DrawerModal({ isOpen, onClose, children, title }: IModalProps) {
	return (
		<Drawer
			placement={'bottom'}
			onClose={onClose}
			isOpen={isOpen}
			autoFocus={false}
		>
			<DrawerOverlay bg='#000000B2' />
			<DrawerContent
				// maxH='80vh'
				maxH='595px'
				mx='auto'
				borderTopRadius='26px'
			>
				<DrawerHeader
					pb='5'
					pt='6px'
				>
					<Box
						bg='#E7E7E7'
						h='6px'
						w='100px'
						rounded='21px'
						mx='auto'
					/>
					<Title
						mt='6'
						textAlign='center'
						color='#0E121E'
					>
						{title}
					</Title>
				</DrawerHeader>

				<DrawerBody
					className='unscroll'
					px={4}
					overflow='auto'
					h='100%'
					pb='30px'
				>
					{children}
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}

export default DrawerModal
