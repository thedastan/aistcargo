'use client'

import { Box } from '@chakra-ui/react'
import { redirect } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'

import InterfaceShape from '@/components/layout-templates/interface-template'
import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import TextAreaComponent from '@/components/ui/inputs/TextAreaComponent'
import ParcelTypesComponent from '@/components/ui/select/ParcelTypesComponent'
import RouteSelect from '@/components/ui/select/RouteSelect'

import CurrencySom from '@/assets/svg/CurrencySom'

import { USER_PAGES } from '@/config/pages/user-url.config'
import { useValidate } from '@/config/validation'

import { default_ad_value } from '@/store/slices/storage-slice'

import { useAppSelector } from '@/hooks/useAppSelector'

import { IAdFormCreate } from '@/models/ad.model'
import { IListItem } from '@/models/transport.model'

const CreateComponentTraveler = () => {
	const { ad } = useAppSelector(s => s.storage)
	const [value, setValue] = useState<IAdFormCreate>({
		...default_ad_value
	})

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}

	const { onsubmit } = useValidate('traveler', value)
	useEffect(() => {
		if (ad) setValue({ ...ad })
	}, [])
	return !ad?.transport ? (
		redirect(USER_PAGES.HOME)
	) : (
		<Box>
			<InterfaceShape
				title='Стать перевозчиком'
				UpperContent={
					<Box>
						<RouteSelect
							value={{ from_city: value.from_city, to_city: value.to_city }}
							onChange={(e: IListItem, key: string) =>
								setValue({ ...value, [key]: e })
							}
						/>
						<InputComponent
							handleChange={handleChange}
							value={value.send_date}
							name='send_date'
							title='Дата отправки'
							placeholder='Укажите дату'
							isGreen={true}
							type='date'
						/>
					</Box>
				}
			>
				<ParcelTypesComponent
					onChange={parcel => setValue({ ...value, parcel })}
					parcel={value.parcel}
				/>

				<InputComponent
					handleChange={handleChange}
					value={value.price}
					title='Цена (в сомах)'
					name='price'
					placeholder='Цена / Договорная'
					RightElement={<CurrencySom />}
				/>

				<TextAreaComponent
					handleChange={handleChange}
					title='Описание'
					name='description'
					value={value.description}
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
