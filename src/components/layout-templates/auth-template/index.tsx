'use client'

import { Box, Center, Container, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, PropsWithChildren } from 'react'

import DefButton from '@/components/ui/buttons/DefButton'
import InputTitle from '@/components/ui/texts/InputTitle'
import Title from '@/components/ui/texts/Title'

import { unbounded } from '@/constants/fonts/fonts'

import Logo from '@/assets/img/Auth-logo.svg'

import { PADDING_Y } from '@/config/_variables.config'

import { useFullHeight } from '@/hooks/useFullHeight'

interface AuthTemplateProps extends PropsWithChildren {
	title: string
	onsubmit: () => void
	button_name?: string
	footer?: {
		question: string
		btn_name: string
		path: string
	}
	subtitle?: boolean
}

const AuthTemplate = ({
	onsubmit,
	title,
	children,
	button_name = 'Далее',
	subtitle = true,
	footer
}: AuthTemplateProps) => {
	const { clientHeight } = useFullHeight()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		onsubmit()
	}
	return (
		<Flex
			minH={clientHeight + 'px'}
			flexDirection='column'
			justifyContent='space-between'
			pb={PADDING_Y}
		>
			<Box>
				<Center overflow='hidden'>
					<Flex
						minW='1038px'
						mt='-781px'
						justifyContent='center'
						alignItems='end'
						h='1001px'
						rounded='50%'
						bg='#24B23E'
						mx='auto'
						pb='17.94px'
					>
						<Image
							src={Logo}
							alt='Logo'
						/>
					</Flex>
				</Center>

				<Flex
					mt='11.8px'
					justifyContent='center'
					gap='1'
					className={unbounded.className}
					fontWeight='500'
					fontSize='34.03px'
					lineHeight='42.2px'
				>
					<Text color='#FF8400'>AIST</Text>
					<Text color='#24B23E'>CARGO</Text>
				</Flex>

				{!!subtitle && (
					<InputTitle
						textAlign='center'
						mt='20px'
						px='4'
					>
						Соединяем отправителей, и тех, кто по пути
					</InputTitle>
				)}
			</Box>

			<Container mt='70px'>
				<Title mb='25px'>{title}</Title>

				<form onSubmit={handleSubmit}>
					<Box>{children}</Box>

					<DefButton
						type='submit'
						mt='40px'
					>
						{button_name}
					</DefButton>
				</form>

				{!!footer && (
					<Flex
						gap='5px'
						mt='18px'
						justifyContent='center'
					>
						<InputTitle>{footer.question}</InputTitle>
						<Link href={footer.path}>
							<InputTitle fontWeight='700'>{footer.btn_name}</InputTitle>
						</Link>
					</Flex>
				)}
			</Container>
		</Flex>
	)
}

export default AuthTemplate
