import { Button, ChakraProps } from '@chakra-ui/react'

interface DefButtonProps extends ChakraProps {
	children: string | JSX.Element
	onClick?: () => void
	type?: 'button' | 'submit'
	disabled?: boolean
	isLight?: boolean
	rounded?: string
}
const DefButton = ({
	onClick,
	type = 'button',
	disabled,
	isLight,
	children,
	...props
}: DefButtonProps) => {
	return (
		<Button
			onClick={onClick}
			type={type}
			variant='none'
			w='100%'
			border='none'
			bg={
				isLight ? '#F5F5F5' : 'linear-gradient(90deg, #FF7B00 0%, #FF4A00 100%)'
			}
			h='54px'
			rounded='100px'
			color={isLight ? '#232D37' : '#FFFFFF'}
			fontSize='16px'
			fontWeight='600'
			isDisabled={disabled}
			px='2'
			lineHeight='22px'
			{...props}
		>
			{children}
		</Button>
	)
}

export default DefButton
