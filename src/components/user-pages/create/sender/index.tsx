'use client'

import { Box, Flex } from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { HiOutlineLocationMarker } from 'react-icons/hi'

import InterfaceShape from '@/components/layout-templates/interface-template'
import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import PhoneInputComponent from '@/components/ui/inputs/PhoneInputComponent'
import TextAreaComponent from '@/components/ui/inputs/TextAreaComponent'
import ParcelTypesComponent from '@/components/ui/select/ParcelTypesComponent'
import RouteSelect from '@/components/ui/select/RouteSelect'
import TypeofTransport from '@/components/ui/select/TypeofTransport'
import UploadPhotos from '@/components/ui/upload-photos'

import CurrencySom from '@/assets/svg/CurrencySom'

import { useValidate } from '@/config/validation'

import { default_ad_value } from '@/store/slices/storage-slice'

import { useAppSelector } from '@/hooks/useAppSelector'
import { useProfile } from '@/hooks/useProfile'

import { IAdFormCreate } from '@/models/ad.model'
import { IListItem } from '@/models/transport.model'

const CreateComponentSender = () => {
	const [step, setStep] = useState<0 | 1>(0)
	const { user } = useProfile()
	const [value, setValue] = useState<IAdFormCreate>({
		...default_ad_value
	})

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}
	const { ad } = useAppSelector(s => s.storage)
	const { onsubmit } = useValidate('sender', value)

	const handleSubmit = () => {
		if (!step) {
			onsubmit({
				isSenderHalf: true,
				setStep: () => {
					setStep(1)
					if (user?.phone && Number(value.phone?.length) < 5) {
						setValue(state => {
							return { ...state, phone: user.phone }
						})
					}
				}
			})
		} else onsubmit()
	}

	const onBack = () => setStep(0)
	console.log(value)
	useEffect(() => {
		if (ad) setValue({ ...ad })
	}, [])

	// useEffect(() => {
	// 	if (ad) setValue({ ...ad })
	// 	if (user && !ad?.id) setValue({ ...value, phone: user.phone })
	// }, [user])
	return (
		<Box>
			<InterfaceShape
				title='Создание посылки'
				UpperContent={
					<Box>
						{!step ? (
							<>
								<RouteSelect
									value={{ from_city: value.from_city, to_city: value.to_city }}
									onChange={(e: IListItem, key: string) =>
										setValue({ ...value, [key]: e })
									}
								/>
								<InputComponent
									handleChange={handleChange}
									value={value.address}
									title='Адрес доставки'
									name='address'
									placeholder='Введите адрес получения'
									isGreen={true}
									LeftElement={
										<HiOutlineLocationMarker
											color='#FFFFFF'
											fontSize='22px'
										/>
									}
								/>
							</>
						) : (
							<>
								<TypeofTransport
									onChange={transport => setValue({ ...value, transport })}
									value={value.transport}
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
							</>
						)}
					</Box>
				}
			>
				{!step ? (
					<Box>
						<ParcelTypesComponent
							onChange={parcel => setValue({ ...value, parcel })}
							parcel={value.parcel}
						/>

						<UploadPhotos />

						<TextAreaComponent
							title='Описание'
							handleChange={handleChange}
							name='description'
							value={value.description}
							placeholder='Введите текст...'
						/>
					</Box>
				) : (
					<Box mb='6'>
						<InputComponent
							handleChange={handleChange}
							value={value.price}
							name='price'
							title='Цена (в сомах)'
							placeholder='Цена / Договорная'
							RightElement={<CurrencySom />}
						/>
						<PhoneInputComponent
							handleChange={phone => setValue({ ...value, phone })}
							value={value.phone}
						/>
					</Box>
				)}

				<Flex
					mt='1'
					gap='3'
				>
					{!!step && (
						<DefButton
							onClick={onBack}
							isLight={true}
						>
							Назад
						</DefButton>
					)}
					<DefButton onClick={handleSubmit}>Далее</DefButton>
				</Flex>
			</InterfaceShape>
		</Box>
	)
}

export default CreateComponentSender
