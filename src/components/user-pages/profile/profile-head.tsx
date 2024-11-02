import { Avatar, Box, Container, Flex, SkeletonText } from '@chakra-ui/react'
import { PiBellSimple } from 'react-icons/pi'

import InputTitle from '@/components/ui/texts/InputTitle'
import Title from '@/components/ui/texts/Title'

import { getFullName, useProfile } from '@/hooks/useProfile'

const ProfileHead = () => {
	const { user, isLoading } = useProfile()
	return (
		<Container>
			<Flex
				h='50px'
				justifyContent='space-between'
				alignItems='center'
			>
				<Flex gap='4'>
					<Avatar
						src={user?.image || ''}
						w='50px'
						h='50px'
					/>

					{isLoading ? (
						<SkeletonText
							py='10px'
							w='150px'
							noOfLines={2}
							spacing='2'
							skeletonHeight='2.5'
						/>
					) : (
						<Box>
							<Title textAlign='start'>
								{getFullName(user?.first_name, user?.last_name)}
							</Title>
							{!!user && (
								<InputTitle lineHeight='19.07px'>{user.role_label}</InputTitle>
							)}
						</Box>
					)}
				</Flex>

				<PiBellSimple
					color='#000000'
					fontSize='26px'
				/>
			</Flex>
		</Container>
	)
}

export default ProfileHead
