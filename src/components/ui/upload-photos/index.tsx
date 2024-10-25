import { Box, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'
import { FaTrash } from 'react-icons/fa'

import Spinner from '@/components/loader/spinner'

// import { useImagesUpload } from '@/hooks/useMedia'
import ModalComponent from '../modal/ModalComponent'
import InputTitle from '../texts/InputTitle'

import AddPhotoButton from './AddPhotoButton'

interface UploadPhotosProps {
	setImages: Dispatch<SetStateAction<string[]>>
	images: string[]
	text: string
}
const UploadPhotos = ({ images, setImages, text }: UploadPhotosProps) => {
	const onDelete = (index: number) => {
		setImages(state => state.filter((_, idx) => index !== idx))
	}
	// const { mutate, isPending } = useImagesUpload(setImages)
	const handleChange = (files: File[]) => {
		// mutate(files)
	}
	return (
		<Box mb='4'>
			<InputTitle mb='6px'>Медиа</InputTitle>
			{/* {isPending && <Spinner />} */}
			{!images.length ? (
				<AddPhotoButton
					handleChange={handleChange}
					text={text}
				/>
			) : (
				<SimpleGrid
					columns={{ sm: 5, base: 4 }}
					spacing='11px'
				>
					{images?.map((el, idx) => (
						<ImageCard
							key={idx + 1}
							image={el}
							onDelete={() => onDelete(idx)}
						/>
					))}
					<AddPhotoButton
						handleChange={handleChange}
						isMini={true}
					/>
				</SimpleGrid>
			)}
		</Box>
	)
}

interface ImageCardProps {
	onDelete: () => void
	image: string
}

function ImageCard({ onDelete, image }: ImageCardProps) {
	const { isOpen, onClose, onOpen } = useDisclosure()
	return (
		<Box position='relative'>
			<Image
				src={image}
				width={80}
				height={80}
				alt='Image'
			/>
			<Box
				onClick={onOpen}
				cursor='pointer'
				position='absolute'
				bottom='6px'
				right='10px'
			>
				<FaTrash
					color='#FF877D'
					fontSize='16px'
				/>
			</Box>
			<ModalComponent
				title='Вы уверены, что хотите удалить фото?'
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={onDelete}
			/>
		</Box>
	)
}

export default UploadPhotos
