'use client'

import { Box, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { HiOutlineLocationMarker } from 'react-icons/hi'

import InterfaceShape from '@/components/layout-templates/interface-template'
import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import PhoneInputComponent from '@/components/ui/inputs/PhoneInputComponent'
import TextAreaComponent from '@/components/ui/inputs/TextAreaComponent'
import RouteSelect from '@/components/ui/select/RouteSelect'
import SearchSelect from '@/components/ui/select/SearchSelect'
import TypeofTransport from '@/components/ui/select/TypeofTransport'
import UploadPhotos from '@/components/ui/upload-photos'

import CurrencySom from '@/assets/svg/CurrencySom'

const CreateComponentSender = () => {
	const [step, setStep] = useState<0 | 1>(0)

	const onsubmit = () => {
		if (step) {
			// submit
		} else setStep(1)
	}

	const onBack = () => setStep(0)
	return (
		<Box>
			<InterfaceShape
				title='Создание посылки'
				UpperContent={
					<Box>
						{!step ? (
							<>
								<RouteSelect />
								<InputComponent
									title='Адрес доставки'
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
								<TypeofTransport onChange={arr => console.log(arr)} />
								<InputComponent
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
						<SearchSelect />

						<UploadPhotos
							text='Загрузить фото. Png, Jpeg,'
							images={[]}
							setImages={() => {}}
						/>

						<TextAreaComponent
							title='Описание'
							value=''
							placeholder='Введите текст...'
						/>
					</Box>
				) : (
					<Box mb='6'>
						<InputComponent
							title='Цена (в сомах)'
							placeholder='Цена / Договорная'
							RightElement={<CurrencySom />}
						/>
						<PhoneInputComponent />
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
					<DefButton onClick={onsubmit}>Далее</DefButton>
				</Flex>
			</InterfaceShape>
		</Box>
	)
}

export default CreateComponentSender
