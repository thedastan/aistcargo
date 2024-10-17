import { ChakraProps, Heading } from '@chakra-ui/react'

interface Props extends ChakraProps {
	children: string
}
const BoldText = ({
	children,
	fontWeight = '700',
	fontSize = '18px',
	lineHeight = '22px',
	color = '#232D37',
	...props
}: Props) => {
	return (
		<Heading
			as='h1'
			{...props}
			color={color}
			fontWeight={fontWeight}
			lineHeight={lineHeight}
			fontSize={fontSize}
		>
			{children}
		</Heading>
	)
}

export default BoldText
