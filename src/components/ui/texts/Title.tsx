import { ChakraProps, Heading } from '@chakra-ui/react'

interface Props extends ChakraProps {
	children: string
}
const Title = ({
	children,
	fontWeight = '600',
	fontSize = '20px',
	lineHeight = '27.24px',
	color = '#232D37',
	textAlign = 'center',
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
			textAlign={textAlign}
		>
			{children}
		</Heading>
	)
}

export default Title
