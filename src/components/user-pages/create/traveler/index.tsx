'use client'

import { Box } from '@chakra-ui/react'

import InterfaceShape from '@/components/layout-templates/interface-template'
import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import TextAreaComponent from '@/components/ui/inputs/TextAreaComponent'
import RouteSelect from '@/components/ui/select/RouteSelect'
import SearchSelect from '@/components/ui/select/SearchSelect'

import CurrencySom from '@/assets/svg/CurrencySom'

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
				<SearchSelect />

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
