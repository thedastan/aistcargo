import { Button, Text } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

interface ModalButtonProps extends PropsWithChildren {
	onClick: () => void
	isDisabled?: boolean
	color?: string
}

const ModalButton = ({
	onClick,
	color,
	isDisabled,
	children
}: ModalButtonProps) => {
	return (
		<Text
			onClick={() => (!isDisabled ? onClick() : {})}
			color={color}
			bg='transparent'
			cursor='pointer'
			w='50px'
			variant='none'
			fontWeight='400'
			fontSize='16px'
			lineHeight='24px'
			_active={{ opacity: '.7' }}
		>
			{children}
		</Text>
	)
}

export default ModalButton
