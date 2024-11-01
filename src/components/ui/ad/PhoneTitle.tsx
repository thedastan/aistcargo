import { Avatar, Box, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { BsTelephoneFill } from 'react-icons/bs'

import MiniText from '../texts/MiniText'
import Title from '../texts/Title'

interface PhoneTitleProps {
	withoutAvatar?: boolean
	avatar?: string
	phone: string
	full_name: string
}
const PhoneTitle = ({
	withoutAvatar,
	phone,
	avatar,
	full_name
}: PhoneTitleProps) => {
	return (
		<Flex
			justifyContent='space-between'
			alignItems='center'
		>
			<Flex
				alignItems='center'
				gap='3'
			>
				{withoutAvatar ? (
					<Flex
						justifyContent='center'
						alignItems='center'
						bg='#F5F5F5'
						w='42px'
						h='42px'
						rounded='50%'
						border='1px solid #F4F4F4'
					>
						<BsTelephoneFill
							color='#292D32'
							fontSize='20px'
						/>
					</Flex>
				) : (
					<Avatar
						src={avatar}
						w='50px'
						h='50px'
					/>
				)}
				<Flex
					flexDirection='column'
					gap='1'
				>
					<MiniText
						fontSize='14px'
						lineHeight='19.07px'
					>
						{full_name}
					</MiniText>
					<Link href={`tel:${phone}`}>
						<Title
							fontSize='18px'
							lineHeight='24px'
						>
							{phone}
						</Title>
					</Link>
				</Flex>
			</Flex>
			{!withoutAvatar && (
				<Box
					px='5'
					py='10.5px'
					bg='#43995C'
					rounded='1000px'
					fontSize='14px'
					lineHeight='19.07px'
					fontWeight='600'
					color='#FFFFFF'
					_active={{ opacity: '.7' }}
				>
					Откликнуться
				</Box>
			)}
		</Flex>
	)
}

export default PhoneTitle
