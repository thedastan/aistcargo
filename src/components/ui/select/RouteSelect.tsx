import {
	Box,
	Divider,
	Input,
	InputGroup,
	InputRightElement,
	Stack
} from '@chakra-ui/react'
import { IoChevronDownOutline } from 'react-icons/io5'

import { useCity } from '@/hooks/useLists'

import InputTitle from '../texts/InputTitle'

import SearchSelect from './SearchSelect'
import { IListItem, PartialListItem } from '@/models/transport.model'

interface RouteSelectProps {
	onChange: (e: IListItem, key: string) => void
	value: {
		from_city: PartialListItem
		to_city: PartialListItem
	}
}
const RouteSelect = ({ onChange, value }: RouteSelectProps) => {
	const { data } = useCity()
	return !data ? null : (
		<Stack mb='4'>
			<InputTitle color='#FFFFFF'>Маршрут</InputTitle>
			<Stack
				rounded='16px'
				overflow='hidden'
				bg='#FFFFFF1A'
				border='1px solid #FFFFFF33'
			>
				<SearchSelect
					data={data}
					onChange={e => onChange(e, 'from_city')}
					value={value.from_city}
				>
					<RouteInput
						value={value.from_city?.name}
						placeholder='Откуда'
					/>
				</SearchSelect>

				<Box px='6'>
					<Divider
						h='1px'
						bg='#FFFFFF'
						opacity='.2'
					/>
				</Box>

				<SearchSelect
					data={data}
					onChange={e => onChange(e, 'to_city')}
					value={value.to_city}
				>
					<RouteInput
						value={value.to_city?.name}
						placeholder='Куда'
					/>
				</SearchSelect>
			</Stack>
		</Stack>
	)
}

interface RouteInputProps {
	value?: string
	placeholder: string
}

function RouteInput(props: RouteInputProps) {
	return (
		<InputGroup>
			<Input
				placeholder={props.placeholder}
				type='text'
				value={props.value || ''}
				_placeholder={{ color: 'rgba(255, 255, 255, .4)', fontWeight: '400' }}
				fontWeight='500'
				fontSize='16px'
				lineHeight='22px'
				bg='transparent'
				h='52px'
				color='#FFFFFF'
				border='none'
				px='5'
				_focus={{ boxShadow: 'none' }}
				isReadOnly={true}
				readOnly={true}
			/>
			<InputRightElement
				alignItems='center'
				h='100%'
			>
				<IoChevronDownOutline
					color='#FFFFFF'
					fontSize='15px'
				/>
			</InputRightElement>
		</InputGroup>
	)
}

export default RouteSelect
