'use client'

import {
	Avatar,
	Box,
	Container,
	Flex,
	SkeletonText,
	Stack
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SlArrowRight } from 'react-icons/sl'

import Navbar from '@/components/navbar'
import MiniText from '@/components/ui/texts/MiniText'
import Title from '@/components/ui/texts/Title'

import ProfileHourSvg from '@/assets/svg/ProfileHourSvg'
import ProfileLockSvg from '@/assets/svg/ProfileLockSvg'
import ProfileLogoutSvg from '@/assets/svg/ProfileLogoutSvg'
import ProfilePenSvg from '@/assets/svg/ProfilePenSvg'

import { AUTH_PAGES } from '@/config/pages/auth-url.config'
import { PUBLIC_PAGES } from '@/config/pages/public-url.config'
import { USER_PAGES } from '@/config/pages/user-url.config'

import { getFullName, useProfile } from '@/hooks/useProfile'

import { removeFromStorage } from '@/services/auth-token.services'

const Profile = () => {
	const { user, isLoading } = useProfile()
	return (
		<Container py='5'>
			<Title
				textAlign='start'
				fontSize='24px'
				lineHeight='32px'
			>
				Профиль
			</Title>
			<Box
				mt='6'
				bg='#F5F5F5'
				rounded='20px'
				py='5'
				px='18px'
			>
				<Link href={USER_PAGES.PROFILE_EDIT}>
					<Flex
						justifyContent='space-between'
						alignItems='center'
					>
						<Flex gap='4'>
							<Avatar
								src={user?.image}
								w='60px'
								h='60px'
							/>

							{isLoading ? (
								<Flex
									flexDirection='column'
									justifyContent='center'
									py='6px'
								>
									<SkeletonText
										w='200px'
										noOfLines={2}
										spacing='3'
										skeletonHeight='2.5'
									/>
								</Flex>
							) : (
								<Flex
									flexDirection='column'
									justifyContent='space-between'
									py='6px'
								>
									<Title
										fontSize='18px'
										lineHeight='24px'
										textAlign='start'
									>
										{getFullName(user?.first_name, user?.last_name)}
									</Title>
									{!!user?.role_label && (
										<MiniText
											mt='1'
											fontSize='14px'
											lineHeight='19.07px'
										>
											{user.role_label}
										</MiniText>
									)}
								</Flex>
							)}
						</Flex>

						<SlArrowRight
							color='#232D37'
							fontSize='20px'
							opacity='.7'
						/>
					</Flex>
				</Link>
			</Box>
			<Stack
				spacing='10px'
				mt='5'
			>
				<ProfileItem
					icon={ProfilePenSvg}
					path={USER_PAGES.AD_MANAGEMENT}
					title='Управление объявлениями'
				/>
				<ProfileItem
					icon={ProfileHourSvg}
					path={USER_PAGES.ADS_HISTORY}
					title='История объявлений'
				/>
				<ProfileItem
					icon={ProfileLockSvg}
					path={PUBLIC_PAGES.RESET_PASSWORD}
					title='Изменить пароль'
				/>
				<ProfileItem
					icon={ProfileLogoutSvg}
					path={''}
					title='Выйти из кабинета'
					isLogout={true}
				/>
			</Stack>

			<Navbar />
		</Container>
	)
}

interface ProfileItemProps {
	title: string
	icon: () => JSX.Element
	path: string
	isLogout?: boolean
}
function ProfileItem(props: ProfileItemProps) {
	const { push } = useRouter()
	const logout = () => {
		if (props.isLogout) {
			removeFromStorage()
			window.location.reload()
		}

		push(props.path)
	}
	return (
		<Flex
			onClick={logout}
			rounded='14px'
			h='60px'
			gap='13px'
			bg={'#F5F5F5'}
			px='5'
			py='18px'
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

export default Profile
