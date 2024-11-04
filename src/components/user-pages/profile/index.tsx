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
import { SlArrowRight } from 'react-icons/sl'

import ProfileChangePassword from '@/components/auth-pages/reset-password/profile-change-password'
import ProfileItem from '@/components/cards/profile-item-card'
import Navbar from '@/components/navbar'
import MiniText from '@/components/ui/texts/MiniText'
import Title from '@/components/ui/texts/Title'

import ProfileHourSvg from '@/assets/svg/ProfileHourSvg'
import ProfileLogoutSvg from '@/assets/svg/ProfileLogoutSvg'
import ProfilePenSvg from '@/assets/svg/ProfilePenSvg'

import { USER_PAGES } from '@/config/pages/user-url.config'

import { getFullName, useProfile } from '@/hooks/useProfile'

import { removeFromStorage } from '@/services/auth-token.services'

const Profile = () => {
	const { user, isLoading } = useProfile()
	const logout = () => {
		removeFromStorage()
		window.location.reload()
	}

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
				<Link href={USER_PAGES.AD_MANAGEMENT}>
					<ProfileItem
						icon={ProfilePenSvg}
						title='Управление объявлениями'
					/>
				</Link>
				<Link href={USER_PAGES.ADS_HISTORY}>
					<ProfileItem
						icon={ProfileHourSvg}
						title='История объявлений'
					/>
				</Link>
				<ProfileChangePassword />
				<ProfileItem
					icon={ProfileLogoutSvg}
					title='Выйти из кабинета'
					onClick={logout}
					isLogout={true}
				/>
			</Stack>

			<Navbar />
		</Container>
	)
}

export default Profile
