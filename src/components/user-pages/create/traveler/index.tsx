'use client'

import { Box } from '@chakra-ui/react'

import InterfaceShape from '@/components/layout-templates/interface-template'
import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import TextAreaComponent from '@/components/ui/inputs/TextAreaComponent'
import RouteSelect from '@/components/ui/select/RouteSelect'
import SearchSelect from '@/components/ui/select/SearchSelect'

import CurrencySom from '@/assets/svg/CurrencySom'
import PackageCub from '@/assets/svg/PackageCub'

const package_data = [
	'Документ/Конверт A4 (до 0.5 кг)',
	'Коробка S (55x40x20 см до 10 кг)',
	'Коробка M (65x40x25 см до 15 кг)',
	'Коробка L (70x50x30 см до 23 кг)',
	'Сумка/Чемодан S (55x40x20 см до 10 кг)',
	'Сумка/Чемодан M (150 см до 15 кг)',
	'Сумка/Чемодан L (203 см до 23 кг)'
]
const CreateComponentTraveler = () => {
	const onsubmit = () => {}

	return (
		<Box>
			<InterfaceShape
				title='Стать попутчиком'
				UpperContent={
					<Box>
						<RouteSelect />
						<InputComponent
							title='Дата отправки'
							placeholder='Укажите дату'
							isGreen={true}
							type='date'
						/>
					</Box>
				}
			>
				<SearchSelect
					data={package_data}
					placeholder='Тип посылки'
					title='Тип посылки'
					icon={<PackageCub />}
				/>

				<InputComponent
					title='Цена (в сомах)'
					placeholder='Цена / Договорная'
					RightElement={<CurrencySom />}
				/>

				<TextAreaComponent
					title='Описание'
					value=''
					placeholder='Введите текст...'
				/>

				<DefButton
					mt='1'
					onClick={onsubmit}
				>
					Далее
				</DefButton>
			</InterfaceShape>
		</Box>
	)
}

export default CreateComponentTraveler
