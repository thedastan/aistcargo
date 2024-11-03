import { Box, Flex } from '@chakra-ui/react'
import moment from 'moment'

import MiniText from '../texts/MiniText'
import Title from '../texts/Title'

interface AdDatesProps {
	created_date: string
	send_date: string
}
const AdDates = ({ created_date, send_date }: AdDatesProps) => {
	moment.locale('ru', {
		months: [
			'января',
			'февраля',
			'марта',
			'апреля',
			'мая',
			'июня',
			'июля',
			'августа',
			'сентября',
			'октября',
			'ноября',
			'декабря'
		]
	})
	const send_date_LL = moment(send_date).format('D-MMMM')
	const created_at_LL = moment(created_date).format('D-MMMM')
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
					{send_date_LL}
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
					{created_at_LL}
				</Title>
			</Flex>
		</Box>
	)
}

export default AdDates
