import { Box, SimpleGrid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import ImageCreateCard from '@/components/cards/Image-create-card'

import { storageActions } from '@/store/slices/storage-slice'

import InputTitle from '../texts/InputTitle'

import AddPhotoButton from './AddPhotoButton'

interface UploadPhotosProps {}
const UploadPhotos = (props: UploadPhotosProps) => {
	const dispatch = useDispatch()
	const [fileList, setFileList] = useState<File[]>([])
	const onDelete = (index: number) => {
		setFileList(state => state.filter((_, idx) => index !== idx))
	}

	useEffect(() => {
		dispatch(storageActions.setFiles(fileList))
	}, [fileList])
	return (
		<Box mb='4'>
			<InputTitle mb='6px'>Медиа</InputTitle>
			{!fileList.length ? (
				<AddPhotoButton handleChange={setFileList} />
			) : (
				<SimpleGrid
					columns={{ sm: 5, base: 4 }}
					spacing='11px'
				>
					{fileList?.map((el, idx) => (
						<ImageCreateCard
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

export default UploadPhotos
