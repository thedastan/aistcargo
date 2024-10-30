import { Box, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'

import ModalComponent from '../modal/ModalComponent'
import InputTitle from '../texts/InputTitle'

import AddPhotoButton from './AddPhotoButton'

interface UploadPhotosProps {
	text: string
}
const UploadPhotos = ({ text }: UploadPhotosProps) => {
	const [fileList, setFileList] = useState<File[]>([])
	const onDelete = (index: number) => {
		setFileList(state => state.filter((_, idx) => index !== idx))
	}

	return (
		<Box mb='4'>
			<InputTitle mb='6px'>Медиа</InputTitle>
			{!fileList.length ? (
				<AddPhotoButton
					handleChange={setFileList}
					text={text}
				/>
			) : (
				<SimpleGrid
					columns={{ sm: 5, base: 4 }}
					spacing='11px'
				>
					{fileList?.map((el, idx) => (
						<ImageCard
							key={idx + 1}
							file={el}
							onDelete={() => onDelete(idx)}
						/>
					))}
					<AddPhotoButton
						handleChange={setFileList}
						isMini={true}
					/>
				</SimpleGrid>
			)}
		</Box>
	)
}

interface ImageCardProps {
	onDelete: () => void
	file: File
}

function ImageCard({ onDelete, file }: ImageCardProps) {
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
		<Box position='relative'>
			{!!base64 && (
				<Image
					src={String(base64)}
					width={80}
					height={80}
					alt='Image'
				/>
			)}
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
