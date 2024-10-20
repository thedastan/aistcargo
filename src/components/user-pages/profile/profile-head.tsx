import { Avatar, Box, Container, Flex } from '@chakra-ui/react'
import { PiBellSimple } from 'react-icons/pi'

import InputTitle from '@/components/ui/texts/InputTitle'
import Title from '@/components/ui/texts/Title'

const ProfileHead = () => {
	return (
		<Container>
			<Flex
				h='50px'
				justifyContent='space-between'
				alignItems='center'
			>
				<Flex gap='4'>
					<Avatar
						w='50px'
						h='50px'
					/>

					<Box>
						<Title>Аэлита Ажыбаева</Title>
						<InputTitle lineHeight='19.07px'>Отправитель</InputTitle>
					</Box>
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
