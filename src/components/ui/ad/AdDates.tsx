import { Box, Flex } from '@chakra-ui/react'

import MiniText from '../texts/MiniText'
import Title from '../texts/Title'

interface AdDatesProps {
	created_date: string
	send_date: string
}
const AdDates = ({ created_date, send_date }: AdDatesProps) => {
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
					{send_date}
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
					{created_date}
				</Title>
			</Flex>
		</Box>
	)
}

export default AdDates
