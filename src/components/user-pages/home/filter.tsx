import { Flex, useDisclosure } from '@chakra-ui/react'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { VscSettings } from 'react-icons/vsc'

import DefButton from '@/components/ui/buttons/DefButton'
import DrawerModal from '@/components/ui/drawer'
import InputComponent from '@/components/ui/inputs/InputComponent'
import SearchSelect from '@/components/ui/select/SearchSelect'
import TypeofTransport from '@/components/ui/select/TypeofTransport'

import PackageCub from '@/assets/svg/PackageCub'

const data = [
	'Бишкек/Кыргызстан',
	'Екатеринбург/Россия',
	'Москва/Россия',
	'Санк-Петербург/Россия'
]

const Filter = () => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	return (
		<>
			<Flex
				onClick={onOpen}
				bg='#F5F5F5'
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
					color='#000000'
					fontSize='26px'
				/>
			</Flex>

			<DrawerModal
				isOpen={isOpen}
				onClose={onClose}
				title='Фильтр'
			>
				<InputComponent
					type='date'
					title='Дата выезда'
					placeholder='Укажите дату'
				/>

				<TypeofTransport
					onChange={values => values}
					isLight={true}
				/>

				<SearchSelect
					data={data}
					placeholder='Выберите город'
					title='Город'
					icon={<HiOutlineLocationMarker fontSize='22px' />}
				/>

				<DefButton mt='35px'>Применить фильтры</DefButton>
			</DrawerModal>
		</>
	)
}

export default Filter
