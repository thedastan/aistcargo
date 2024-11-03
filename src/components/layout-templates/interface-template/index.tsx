'use client'

import { Box, Container, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { BsChevronLeft } from 'react-icons/bs'

import Title from '@/components/ui/texts/Title'

import {
	INTERFACE_WIDTH,
	PADDING_Y,
	THEME_COLOR
} from '@/config/_variables.config'

interface InterfaceShapeProps extends PropsWithChildren {
	title: string
	UpperContent?: JSX.Element
	backFn?: () => void
}

const InterfaceShape = ({
	children,
	title,
	UpperContent,
	backFn
}: InterfaceShapeProps) => {
	const { back } = useRouter()

	const onBack = () => {
		if (backFn) backFn()
		else back()
	}
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
					<BsChevronLeft
						onClick={onBack}
						color='#FFFFFF'
						fontSize='22px'
						cursor='pointer'
					/>
					<Title
						lineHeight='32.68px'
						fontSize='24px'
						color='#FFFFFF'
					>
						{title}
					</Title>
					<Box opacity='0'>
						<BsChevronLeft fontSize='22px' />
					</Box>
				</Flex>

				{!!UpperContent && (
					<Box
						mt='2'
						pb='14px'
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
