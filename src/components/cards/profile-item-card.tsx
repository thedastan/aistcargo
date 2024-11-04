import { Flex } from '@chakra-ui/react'

import Title from '../ui/texts/Title'

interface ProfileItemProps {
	title: string
	icon: () => JSX.Element
	onClick?: () => void
	isLogout?: boolean
}
export default function ProfileItem(props: ProfileItemProps) {
	return (
		<Flex
			onClick={() => props.onClick && props.onClick()}
			cursor='pointer'
			rounded='14px'
			h='60px'
			gap='13px'
			bg={'#F5F5F5'}
			px='5'
			py='18px'
			_active={{ opacity: '.8' }}
		>
			<props.icon />
			<Title
				fontSize='16px'
				lineHeight='22px'
				textAlign='start'
				color={props.isLogout ? '#F54135' : '#232D37'}
			>
				{props.title}
			</Title>
		</Flex>
	)
}
