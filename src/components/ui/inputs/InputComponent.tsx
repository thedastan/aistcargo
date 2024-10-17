'use client'

import {
	Box,
	Input,
	InputGroup,
	InputRightElement,
	Stack
} from '@chakra-ui/react'
import { useState } from 'react'
import { PiEyeClosedFill, PiEyeFill } from 'react-icons/pi'

import InputTitle from '../texts/InputTitle'

export interface IInputComponentProps {
	name?: string
	placeholder?: string
	isLight?: boolean
	type?: string
	value?: string
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	required?: boolean
	isReadOnly?: boolean
	RightElement?: JSX.Element
	title?: string
}

const InputComponent = ({
	name,
	placeholder,
	value,
	handleChange,
	isLight,
	type = 'text',
	required = true,
	isReadOnly,
	RightElement,
	title
}: IInputComponentProps) => {
	const [show, setShow] = useState(false)
	return (
		<Stack
			mb='4'
			spacing='6px'
		>
			{!!title && <InputTitle>{title}</InputTitle>}
			<InputGroup>
				<Input
					onChange={handleChange}
					variant='none'
					value={value}
					name={name}
					type={show ? 'text' : type}
					rounded='16px'
					placeholder={placeholder}
					h='56px'
					w='100%'
					border='1px solid #1A1D201F'
					bg='transparent'
					fontSize='16px'
					px='14px'
					fontWeight='400'
					lineHeight='22px'
					color='#232D37'
					_placeholder={{
						opacity: '.7'
					}}
					isRequired={required}
					isReadOnly={isReadOnly}
					autoFocus={false}
				/>
				{type === 'password' && (
					<InputRightElement
						w='3rem'
						h='100%'
						display='flex'
						alignItems='center'
					>
						<Box
							onClick={() => setShow(!show)}
							fontSize='24px'
							color='#A8A8A8'
							cursor='pointer'
						>
							{show ? <PiEyeFill /> : <PiEyeClosedFill />}
						</Box>
					</InputRightElement>
				)}

				{!!RightElement && (
					<InputRightElement
						minW='3rem'
						h='100%'
						display='flex'
						alignItems='center'
						opacity={!!value ? '1' : '.5'}
					>
						<Box>{RightElement}</Box>
					</InputRightElement>
				)}
			</InputGroup>
		</Stack>
	)
}

export default InputComponent
