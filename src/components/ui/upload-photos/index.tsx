import { Box, SimpleGrid } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

import ImageCreateCard from '@/components/cards/Image-create-card'

import { storageActions } from '@/store/slices/storage-slice'

import { useAppSelector } from '@/hooks/useAppSelector'

import InputTitle from '../texts/InputTitle'

import AddPhotoButton from './AddPhotoButton'

const UploadPhotos = () => {
	const dispatch = useDispatch()
	const { files } = useAppSelector(state => state.storage)

	const onDelete = (index: number) => {
		dispatch(storageActions.setFiles(files.filter((_, idx) => index !== idx)))
	}

	const handleChange = (e: React.ChangeEvent<any>) => {
		const fileList: FileList | null = e.target?.files
		console.log('fileList:', fileList)
		if (fileList && fileList.length > 0) {
			dispatch(storageActions.setFiles([...files, ...Array.from(fileList)]))
		}
	}

	return (
		<Box mb='4'>
			<InputTitle mb='6px'>Медиа</InputTitle>
			{!files.length ? (
				<AddPhotoButton handleChange={handleChange} />
			) : (
				<SimpleGrid
					columns={{ sm: 5, base: 4 }}
					spacing='11px'
				>
					{files?.map((file, idx) => (
						<ImageCreateCard
							key={idx + 1}
							file={file}
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

export default UploadPhotos
