import { Flex, useDisclosure } from '@chakra-ui/react'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { VscSettings } from 'react-icons/vsc'
import { toast } from 'sonner'

import DefButton from '@/components/ui/buttons/DefButton'
import DrawerModal from '@/components/ui/drawer'
import InputComponent from '@/components/ui/inputs/InputComponent'
import RouteSelect from '@/components/ui/select/RouteSelect'

import { THEME_COLOR } from '@/config/_variables.config'

import { AdFilterForm } from '@/models/ad.model'

interface FilterProps {
	onChange: Dispatch<SetStateAction<AdFilterForm | undefined>>
	filterValid: boolean
}
const Filter = ({ onChange, filterValid }: FilterProps) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const [value, setValue] = useState<AdFilterForm>({
		to_city: {},
		from_city: {},
		send_date: ''
	})
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}

	const onsubmit = () => {
		if (value.from_city?.id || value.to_city?.id || value.send_date) {
			onChange(value)
			onClose()
		} else {
			toast.info('Чтобы применить фильтры, заполните хотя бы одну полю')
		}
	}

	const onReset = () => {
		setValue({
			to_city: {},
			from_city: {},
			send_date: ''
		})
		onChange(undefined)
	}
	return (
		<>
			<Flex
				onClick={onOpen}
				bg={filterValid ? THEME_COLOR : '#F5F5F5'}
				border={`1px solid #232D3714`}
				px='10px'
				alignItems='center'
				py='6px'
				h='100%'
				rounded='8px'
				cursor='pointer'
				_active={{ opacity: '.8' }}
			>
				<VscSettings
					color={filterValid ? '#FFFFFF' : '#000000'}
					fontSize='26px'
				/>
			</Flex>

			<DrawerModal
				isOpen={isOpen}
				onClose={onClose}
				title='Фильтр'
			>
				<InputComponent
					handleChange={handleChange}
					value={value.send_date}
					name='send_date'
					title='Дата выезда (до:)'
					placeholder='Указать дату'
					type='date'
				/>

				<RouteSelect
					onChange={(e, key) => setValue({ ...value, [key]: e })}
					value={{ from_city: value.from_city, to_city: value.to_city }}
					isLight={true}
				/>

				<DefButton
					mt='15px'
					isLight={true}
					onClick={onReset}
				>
					Очистить
				</DefButton>
				<DefButton
					mt='2.5'
					onClick={onsubmit}
				>
					Применить фильтры
				</DefButton>
			</DrawerModal>
		</>
	)
}

export default Filter
