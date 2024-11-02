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
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'

import Spinner from '@/components/loader/spinner'
import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import InputTitle from '@/components/ui/texts/InputTitle'
import Title from '@/components/ui/texts/Title'

import { PADDING_Y } from '@/config/_variables.config'

import { useProfile, useProfileUpdate } from '@/hooks/useProfile'

import AvatarUpload from './AvatarUpload'
import { EnumGender, GenderTypes, IProfileUpdate } from '@/models/profile.model'

const options = [
	{
		name: 'Мужской',
		gender: EnumGender.MAN
	},
	{
		name: 'Женский',
		gender: EnumGender.WOMAN
	}
]

const ProfileForm = () => {
	const [value, setValue] = useState<IProfileUpdate>({
		first_name: '',
		last_name: '',
		email: '',
		birth_date: ''
	})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}

	const { back } = useRouter()
	const { user, isLoading } = useProfile()

	const {
		getRootProps,
		getRadioProps,
		setValue: setRadioValue
	} = useRadioGroup({
		name: 'framework-2',
		defaultValue: value.sex,
		onChange: (sex: GenderTypes) => setValue({ ...value, sex })
	})

	const group = getRootProps()

	const { isPending, mutate } = useProfileUpdate()
	const onsubmit = () => {
		mutate(value)
	}

	useEffect(() => {
		if (user) {
			const gender = String(user.sex) as GenderTypes
			const birth_date = user.birth_date
				? moment(user.birth_date).format('YYYY-MM-DD')
				: ''
			setValue({
				...value,
				first_name: user.first_name || '',
				last_name: user.last_name || '',
				birth_date: birth_date,
				email: user.email || '',
				sex: gender
			})
			if (gender) {
				setRadioValue(gender)
			}
		}
	}, [user])
	return (
		<Container pb={PADDING_Y}>
			{(isPending || isLoading) && <Spinner />}
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
					<AvatarUpload />
					<InputComponent
						handleChange={handleChange}
						value={value.first_name}
						title='Имя'
						placeholder='Введите имя'
						name='first_name'
					/>
					<InputComponent
						handleChange={handleChange}
						value={value.last_name}
						title='Фамилия'
						placeholder='Введите фамилию'
						name='last_name'
					/>
					<InputComponent
						handleChange={handleChange}
						value={value.email}
						title='Почта'
						placeholder='example@gmail.com'
						name='email'
						type='email'
					/>
					<InputComponent
						handleChange={handleChange}
						value={value.birth_date}
						title='День рождения'
						placeholder='ДД.ММ.ГГ'
						name='birth_date'
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

			<DefButton
				mt='5'
				onClick={onsubmit}
			>
				Сохранить
			</DefButton>
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
