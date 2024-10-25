import { Box, Flex, Stack, Textarea } from '@chakra-ui/react'

import { open_sans } from '@/constants/fonts/fonts'

import InputTitle from '../texts/InputTitle'

export interface IInputComponentProps {
	name?: string
	placeholder?: string
	value?: string
	handleChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	required?: boolean
	title?: string
}

const TextAreaComponent = ({
	name,
	placeholder,
	value,
	handleChange,
	required = true,
	title
}: IInputComponentProps) => {
	return (
		<Stack
			mb='4'
			spacing='6px'
			className={open_sans.className}
		>
			{!!title && <InputTitle>{title}</InputTitle>}
			<Textarea
				onChange={handleChange}
				variant='none'
				value={value}
				name={name}
				rounded='16px'
				placeholder={placeholder}
				pt='4'
				h='108px'
				w='100%'
				border='1px solid #1A1D201F'
				bg='transparent'
				fontSize='16px'
				px='5'
				fontWeight='400'
				lineHeight='22px'
				color='#232D37'
				_placeholder={{
					opacity: '.7'
				}}
				isRequired={required}
				autoFocus={false}
			/>

			<Flex justifyContent='start'>
				<Box
					px='3.5px'
					py='1.5px'
					bg='#F5F5F5'
					rounded='5px'
					lineHeight='21px'
					fontWeight='600'
					fontSize='12px'
					color='#232D37'
				>
					{value?.length}/100
				</Box>
			</Flex>
		</Stack>
	)
}

export default TextAreaComponent
