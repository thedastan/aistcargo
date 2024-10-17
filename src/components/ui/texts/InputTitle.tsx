import { ChakraProps, Text } from '@chakra-ui/react'
import React from 'react'

interface Props extends ChakraProps {
	children: string
}
const InputTitle = ({
	children,
	fontWeight = '400',
	fontSize = '14px',
	lineHeight = '21px',
	color = '#232D37',
	...props
}: Props) => {
	return (
		<Text
			color={color}
			fontWeight={fontWeight}
			lineHeight={lineHeight}
			fontSize={fontSize}
			{...props}
		>
			{children}
		</Text>
	)
}

export default InputTitle
