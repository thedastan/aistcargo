import { Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

import FileInput from '@/components/ui/inputs/FileInput'

import AddPhotoSvg from '@/assets/svg/AddPhotoSvg'

import MiniText from '../texts/MiniText'

interface AddPhotoButtonProps {
	handleChange: (files: File[]) => void
	isMini?: boolean
	text?: string
}

const AddPhotoButton = ({
	handleChange,
	isMini = false,
	text
}: AddPhotoButtonProps) => {
	const handleFileChange = (e: React.ChangeEvent<any>) => {
		if (!!e.target?.files) handleChange(Array.from(e.target.files))
	}
	return (
		<>
			{isMini && (
				<Stack
					as='label'
					maxW='80px'
					rounded='6px'
					maxH='80px'
					zIndex='2'
					position='relative'
					display='inline-block'
				>
					<FileInput
						handleChange={handleFileChange}
						accept={['.png', '.jpeg', '.jpg']}
						multi={true}
					/>
					<Text
						as='span'
						w='100%'
						h='100%'
						position='relative'
						display='inline-block'
						cursor='pointer'
					>
						<Flex
							w='100%'
							h='100%'
							outline='none'
							justifyContent='center'
							alignItems='center'
							rounded='6px'
							bg='#F4F5F7'
							_active={{ opacity: '.7' }}
						>
							<AiOutlinePlus
								color='#1C1C1C'
								fontSize='26px'
							/>
						</Flex>
					</Text>
				</Stack>
			)}

			{!isMini && (
				<Stack
					as='label'
					w='100%'
					rounded='16px'
					h='84'
					zIndex='2'
					position='relative'
					display='inline-block'
				>
					<FileInput
						handleChange={handleFileChange}
						accept={['.png', '.jpeg', '.jpg']}
						multi={true}
					/>
					<Text
						as='span'
						w='100%'
						h='100%'
						position='relative'
						display='inline-block'
						cursor='pointer'
					>
						<Flex
							w='100%'
							alignItems='center'
							px='4'
							gap='10px'
							py='15.5px'
							h='84px'
							outline='none'
							rounded='16px'
							bg='transparent'
							border='1px dashed #1A1D2029'
							_active={{ opacity: '.7' }}
						>
							<Flex
								w='52px'
								h='52px'
								rounded='50%'
								justifyContent='center'
								alignItems='center'
								bg='#F5F5F5'
							>
								<AddPhotoSvg />
							</Flex>
							{!!text && (
								<MiniText
									fontSize='16px'
									lineHeight='22px'
								>
									{text}
								</MiniText>
							)}
						</Flex>
					</Text>
				</Stack>
			)}
		</>
	)
}
export default AddPhotoButton
