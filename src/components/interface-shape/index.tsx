'use client'

import { Box, Container, Flex, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { FaChevronLeft } from 'react-icons/fa6'

import {
	INTERFACE_WIDTH,
	PADDING_Y,
	THEME_COLOR
} from '@/config/_variables.config'

interface InterfaceShapeProps extends PropsWithChildren {
	title: string
	UpperContent?: JSX.Element
}

const InterfaceShape = ({
	children,
	title,
	UpperContent
}: InterfaceShapeProps) => {
	const { back } = useRouter()

	return (
		<Box>
			{/* Header .. */}

			<Container
				maxW={INTERFACE_WIDTH}
				bg={THEME_COLOR}
				pb='30px'
				pt='20px'
				position='relative'
				px='5'
			>
				<Flex
					justifyContent='space-between'
					alignItems='center'
					pb={UpperContent ? '6' : '27px'}
				>
					<FaChevronLeft
						onClick={back}
						color='#FFFFFF'
						fontSize='21px'
						opacity='.9'
						cursor='pointer'
					/>
					<Heading
						lineHeight='32.68px'
						fontSize='24px'
						fontWeight='600'
						color='#FFFFFF'
					>
						{title}
					</Heading>
					<Box opacity='0'>
						<FaChevronLeft fontSize='21px' />
					</Box>
				</Flex>

				{!!UpperContent && (
					<Box
						mt='6'
						pb='30px'
					>
						{UpperContent}
					</Box>
				)}
			</Container>
			{/* Content .. */}
			<Container
				position='relative'
				zIndex='2'
				w='100%'
				mt='-30px'
				py={PADDING_Y}
				bg='#FFFFFF'
				borderTopRadius='30px'
				maxW={INTERFACE_WIDTH}
			>
				{children}
			</Container>
		</Box>
	)
}

export default InterfaceShape
