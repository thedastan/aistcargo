'use client'

import {
	Box,
	Container,
	Flex,
	HStack,
	Radio,
	Stack,
	useRadio,
	useRadioGroup
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'

import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import InputTitle from '@/components/ui/texts/InputTitle'
import Title from '@/components/ui/texts/Title'

import { PADDING_Y } from '@/config/_variables.config'

const options = [
	{
		name: 'Мужской',
		gender: '0'
	},
	{
		name: 'Женский',
		gender: '1'
	}
]

const ProfileForm = () => {
	const [value, setValue] = useState({})
	const { back } = useRouter()

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'framework-2',
		defaultValue: options[0].gender,
		onChange: (gender: '0' | '1') => setValue({ ...value, gender })
	})

	const group = getRootProps()
	return (
		<Container pb={PADDING_Y}>
			<Flex
				justifyContent='space-between'
				alignItems='center'
				pt='20px'
			>
				<BsChevronLeft
					onClick={back}
					fontSize='22px'
					color='#232D37'
					cursor='pointer'
				/>
				<Title
					lineHeight='32.68px'
					fontSize='24px'
				>
					Редактирование
				</Title>
				<BsChevronLeft
					opacity='0'
					fontSize='22px'
				/>
			</Flex>
			<Box
				mt='6'
				bg='#F5F5F5'
				rounded='20px'
				px='18px'
				py='25.5px'
			>
				<Stack>
					<InputComponent
						title='Имя'
						placeholder='Введите имя'
						name='first_name'
					/>
					<InputComponent
						title='Фамилия'
						placeholder='Введите фамилию'
						name='last_name'
					/>
					<InputComponent
						title='Почта'
						placeholder='example@gmail.com'
						name='email'
						type='email'
					/>
					<InputComponent
						title='День рождения'
						placeholder='ДД.ММ.ГГ'
						name='date'
						type='date'
					/>
				</Stack>

				<Stack spacing='6px'>
					<InputTitle>Пол</InputTitle>

					<HStack
						{...group}
						spacing='2'
					>
						{options.map(value => {
							const radio = getRadioProps({
								value: value.gender
							})
							return (
								<RadioCard
									key={value.gender}
									{...radio}
								>
									{value.name}
								</RadioCard>
							)
						})}
					</HStack>
				</Stack>
			</Box>

			<DefButton mt='5'>Сохранить</DefButton>
		</Container>
	)
}

function RadioCard(props: any) {
	const { getRadioProps, getInputProps } = useRadio(props)

	const input = getInputProps()
	const checkbox = getRadioProps()

	return (
		<Box
			as='label'
			w='100%'
		>
			<input {...input} />
			<Box
				{...checkbox}
				display='flex'
				justifyContent='center'
				alignItems='center'
				cursor='pointer'
				rounded='16px'
				w='100%'
				bg='#F5F5F5'
				fontWeight='600'
				fontSize='14px'
				lineHeight='19.07px'
				color='#232D37'
				border='1px solid #232D371F'
				opacity='.7'
				h='60px'
				// color='rgba(35, 45, 55, .7)'
				_checked={{
					bg: '#FFFFFF',
					opacity: '1',
					border: '1px solid #2FBF53'
				}}
				px={6}
				py='15px'
				gap='6'
			>
				<Flex>{props.children}</Flex>

				<Radio
					isChecked={input.checked}
					colorScheme='green'
					border='1px solid #232D37'
				/>
			</Box>
		</Box>
	)
}

export default ProfileForm
