import { Box, Flex } from '@chakra-ui/react'

import MiniText from '../texts/MiniText'
import Title from '../texts/Title'

const AdDates = () => {
	return (
		<Box
			mt='5'
			bg='#F5F5F5'
			rounded='20px'
			px='5'
			py='6'
		>
			<Flex
				alignItems='center'
				justifyContent='space-between'
			>
				<MiniText
					fontSize='14px'
					lineHeight='19.07px'
				>
					Дата отправки:
				</MiniText>
				<Title
					fontSize='16px'
					lineHeight='21.79px'
				>
					14.09.2034
				</Title>
			</Flex>

			<Flex
				mt='20px'
				alignItems='center'
				justifyContent='space-between'
			>
				<MiniText
					fontSize='14px'
					lineHeight='19.07px'
				>
					Дата создания:
				</MiniText>
				<Title
					fontSize='16px'
					lineHeight='21.79px'
				>
					12.09.2034
				</Title>
			</Flex>
		</Box>
	)
}

export default AdDates
