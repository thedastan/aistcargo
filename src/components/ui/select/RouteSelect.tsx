import { Box, Divider, Select, Stack } from '@chakra-ui/react'

import { open_sans } from '@/constants/fonts/fonts'

import InputTitle from '../texts/InputTitle'

interface RouteSelectProps {}
const RouteSelect = (props: RouteSelectProps) => {
	return (
		<Stack
			spacing='10px'
			mb='4'
		>
			<InputTitle color='#FFFFFF'>Маршрут</InputTitle>
			<Stack
				rounded='16px'
				overflow='hidden'
				bg='#FFFFFF1A'
				border='1px solid #FFFFFF33'
			>
				<Select
					placeholder='Откуда'
					value=''
					_placeholder={{ color: 'rgba(255, 255, 255, .4)', fontWeight: '400' }}
					fontWeight='500'
					fontSize='16px'
					lineHeight='22px'
					bg='transparent'
					h='52px'
					color='#FFFFFF'
					border='none'
					px='2'
					_focus={{ boxShadow: 'none' }}
					className='green-select'
				>
					<option value='Bishkek'>Bishkek</option>
				</Select>
				<Box px='6'>
					<Divider
						h='1px'
						bg='#FFFFFF'
						opacity='.2'
					/>
				</Box>

				<Select
					placeholder='Куда'
					value=''
					_placeholder={{ color: 'rgba(255, 255, 255, .4)', fontWeight: '400' }}
					fontWeight='500'
					fontSize='16px'
					lineHeight='22px'
					bg='transparent'
					h='52px'
					color='#FFFFFF'
					border='none'
					px='2'
					_focus={{ boxShadow: 'none' }}
					className='green-select'
				>
					<option value='Osh'>Osh</option>
				</Select>
			</Stack>
		</Stack>
	)
}

export default RouteSelect
