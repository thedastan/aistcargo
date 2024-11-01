import { Box, Flex, IconButton, useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { LiaTimesSolid } from 'react-icons/lia'

import ModalComponent from '../ui/modal/ModalComponent'

interface ImageCardProps {
	onDelete: () => void
	file: File
}

export default function ImageCreateCard({ onDelete, file }: ImageCardProps) {
	const [base64, setBase64] = useState<any>('')
	const { isOpen, onClose, onOpen } = useDisclosure()

	useEffect(() => {
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setBase64(reader.result)
			}
			reader.readAsDataURL(file)
		}
	}, [file])

	return (
		<Box
			position='relative'
			w='85px'
			h='80px'
		>
			{!!base64 && (
				<Box
					w='100%'
					h='100%'
					rounded='8px'
					overflow='hidden'
				>
					<Image
						src={String(base64)}
						width={80}
						height={80}
						alt='Image'
						className='full-image'
					/>
				</Box>
			)}
			<Flex
				position='absolute'
				top='0'
				right='0'
				w='100%'
				h='100%'
				justifyContent='center'
				alignItems='center'
			>
				<Flex
					onClick={onOpen}
					justifyContent='center'
					align='center'
					cursor='pointer'
					w='30px'
					h='30px'
					bg='#FFFFFF'
					border='1px solid #1A1D2014'
					padding='1'
					rounded='50%'
					_active={{ opacity: '.7' }}
				>
					<LiaTimesSolid
						color='#000000'
						fontSize='20px'
					/>
				</Flex>
			</Flex>
			<ModalComponent
				title='Вы уверены, что хотите удалить фото?'
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={onDelete}
			/>
		</Box>
	)
}
