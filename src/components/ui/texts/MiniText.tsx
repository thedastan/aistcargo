import { ChakraProps, Text } from '@chakra-ui/react'
import React from 'react'

interface Props extends ChakraProps {
	children: string
}
const MiniText = ({
	children,
	fontWeight = '400',
	fontSize = '10px',
	lineHeight = '13.62px',
	color = '#232D37',
	opacity = '.7',
	...props
}: Props) => {
	return (
		<Text
			color={color}
			fontWeight={fontWeight}
			lineHeight={lineHeight}
			fontSize={fontSize}
			opacity={opacity}
			{...props}
		>
			{children}
		</Text>
	)
}

export default MiniText
