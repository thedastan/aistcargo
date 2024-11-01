'use client'

import {
	Box,
	Container,
	Flex,
	Radio,
	Stack,
	useRadio,
	useRadioGroup
} from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { HiTruck } from 'react-icons/hi2'
import { IoMdCube } from 'react-icons/io'
import { toast } from 'sonner'

import Spinner from '@/components/loader/spinner'
import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import InputTitle from '@/components/ui/texts/InputTitle'

import { PADDING_Y } from '@/config/_variables.config'

import { useFullHeight } from '@/hooks/useFullHeight'
import { useProfile, useProfileUpdate } from '@/hooks/useProfile'

import { EnumRole, RoleTypes, saveUserRole } from '@/services/role.service'

const options = [
	{
		name: 'Отправитель',
		role: EnumRole.SENDER,
		icon: IoMdCube
	},
	{
		name: 'Попутчик',
		role: EnumRole.TRAVELER,
		icon: HiTruck
	}
]

const RegisterForm = () => {
	const { clientHeight } = useFullHeight()

	const [value, setValue] = useState({
		password: '',
		first_name: '',
		last_name: '',
		role: EnumRole.SUPER_ADMIN
	})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}

	const { isLoading, user } = useProfile()
	const { isPending, mutate } = useProfileUpdate(true)

	const {
		getRootProps,
		getRadioProps,
		setValue: setRadioValue
	} = useRadioGroup({
		name: 'framework',
		defaultValue: value.role,
		onChange: (role: RoleTypes) => {
			setValue({ ...value, role })
		}
	})

	const group = getRootProps()

	const onsubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!!Number(value.role)) {
			mutate(value)
			saveUserRole(value.role)
		} else {
			toast('Выберите роли')
		}
	}

	useEffect(() => {
		if (user) {
			setValue({
				...value,
				first_name: user.first_name || '',
				last_name: user.last_name || '',
				role: String(user.role) as RoleTypes
			})
			setRadioValue(String(user.role))
		}
	}, [user])
	return (
		<Container>
			{(isPending || isLoading) && <Spinner />}
			<form onSubmit={onsubmit}>
				<Flex
					minH={clientHeight + 'px'}
					flexDirection='column'
					justifyContent='space-between'
					py={PADDING_Y}
				>
					<Box>
						<InputComponent
							handleChange={handleChange}
							value={value.password}
							name='password'
							placeholder='Напишите пароль'
							title='Пароль'
							type='password'
						/>
						<InputComponent
							handleChange={handleChange}
							value={value.first_name}
							name='first_name'
							placeholder='Введите имя'
							title='Имя'
						/>
						<InputComponent
							handleChange={handleChange}
							value={value.last_name}
							name='last_name'
							placeholder='Введите фамилию'
							required={false}
							title='Фамилия'
						/>

						<Stack
							{...group}
							spacing='4'
						>
							<InputTitle>Выберите роли</InputTitle>
							{options.map(value => {
								const radio = getRadioProps({
									value: value.role,
									icon: value.icon
								})
								return (
									<RadioCard
										key={value.role}
										{...radio}
									>
										{value.name}
									</RadioCard>
								)
							})}
						</Stack>
					</Box>

					<DefButton type='submit'>Зарегистрироваться</DefButton>
				</Flex>
			</form>
		</Container>
	)
}

function RadioCard(props: any) {
	const { getRadioProps, getInputProps } = useRadio(props)

	const input = getInputProps()
	const checkbox = getRadioProps()

	return (
		<Box as='label'>
			<input {...input} />
			<Box
				{...checkbox}
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				cursor='pointer'
				rounded='16px'
				bg='#F5F5F5'
				fontWeight='600'
				fontSize='14px'
				lineHeight='19.07px'
				h='60px'
				color='rgba(35, 45, 55, .7)'
				_checked={{
					color: '#2FBF53',
					border: '1px solid #2FBF53'
				}}
				px={6}
				py='15px'
			>
				<Flex
					gap='10px'
					alignItems='center'
				>
					<props.icon fontSize='25px' />
					{props.children}
				</Flex>

				<Radio
					isChecked={input.checked}
					colorScheme='green'
					border='1px solid #232D37'
				/>
			</Box>
		</Box>
	)
}

export default RegisterForm
