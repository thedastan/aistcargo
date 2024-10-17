import {
	Box,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay
} from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

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
				maxH='745px'
				mx='auto'
				borderTopRadius='26px'
				pb='30px'
			>
				<DrawerHeader>
					<Title
						mt='15px'
						textAlign='center'
						color='#0E121E'
					>
						{title}
					</Title>
				</DrawerHeader>

				<DrawerBody
					className='unscroll'
					px={4}
					mt='18px'
					overflow='auto'
					h='100%'
				>
					<Box></Box>
					{children}
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}

export default DrawerModal
