'use client'

import {
	Box,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Stack
} from '@chakra-ui/react'
import { useState } from 'react'
import { PiEyeClosedFill, PiEyeFill } from 'react-icons/pi'

import InputTitle from '../texts/InputTitle'

export interface IInputComponentProps {
	name?: string
	placeholder?: string
	isGreen?: boolean
	type?: string
	value?: string
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	required?: boolean
	isReadOnly?: boolean
	LeftElement?: JSX.Element
	RightElement?: JSX.Element
	title?: string
	h?: string
}

const InputComponent = ({
	name,
	placeholder,
	value,
	handleChange,
	isGreen,
	type = 'text',
	required = true,
	isReadOnly,
	LeftElement,
	RightElement,
	title,
	h = '56px'
}: IInputComponentProps) => {
	const [show, setShow] = useState(false)
	return (
		<Stack
			mb='4'
			spacing='6px'
		>
			{!!title && (
				<InputTitle color={isGreen ? '#FFFFFF' : '#232D37'}>{title}</InputTitle>
			)}
			<InputGroup>
				{!!LeftElement && (
					<InputLeftElement
						minW='3rem'
						h='100%'
						display='flex'
						alignItems='center'
						opacity={!!value ? '1' : '.7'}
					>
						<Box>{LeftElement}</Box>
					</InputLeftElement>
				)}
				<Input
					onChange={handleChange}
					variant='none'
					value={value}
					name={name}
					type={show ? 'text' : type}
					rounded='16px'
					placeholder={placeholder}
					h={h}
					w='100%'
					border={`1px solid ${isGreen ? '#FFFFFF33' : '#1A1D201F'}`}
					bg={isGreen ? '#FFFFFF1A' : 'transparent'}
					fontSize='16px'
					px='14px'
					fontWeight={isGreen ? '500' : '400'}
					lineHeight='22px'
					color={isGreen ? '#FFFFFF' : '#232D37'}
					_placeholder={{
						opacity: '.7',
						fontWeight: '400',
						color: isGreen ? '#FFFFFF' : '#232D37',
						fontSize: '15px'
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
					>
						<Box>{RightElement}</Box>
					</InputRightElement>
				)}
			</InputGroup>
		</Stack>
	)
}

export default InputComponent
