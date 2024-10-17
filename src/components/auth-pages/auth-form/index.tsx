'use client'

import {
	Box,
	Center,
	Checkbox,
	Container,
	Flex,
	Text,
	useDisclosure
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

import DefButton from '@/components/ui/buttons/DefButton'
import InputComponent from '@/components/ui/inputs/InputComponent'
import PhoneInputComponent from '@/components/ui/inputs/PhoneInputComponent'
import InputTitle from '@/components/ui/texts/InputTitle'
import Title from '@/components/ui/texts/Title'

import { unbounded } from '@/constants/fonts/fonts'

import Logo from '@/assets/img/Auth-logo.svg'

import { PADDING_Y } from '@/config/_variables.config'

import { useFullHeight } from '@/hooks/useFullHeight'

import PinInputComponent from './PinInput'
import { IAuthForm } from '@/models/auth.model'

const AuthForm = () => {
	const [isAuthTypeEmail, setAuthType] = useState<boolean>(false)
	const [agreeTerms, setAgree] = useState(false)
	const { isOpen, onClose, onOpen } = useDisclosure()
	const [value, setValue] = useState<IAuthForm>({
		email: '',
		phone: ''
	})

	const onsubmit = () => {
		if (agreeTerms) {
			if (!isAuthTypeEmail && value.phone.trim().length > 10) {
				const update = { phone: value.phone, email: '' }
				// mutate(update)
				toast.info('в разработке..')
				setValue(update)
			} else if (!!isAuthTypeEmail) {
				if (value.email.includes('@')) {
					const update = { email: value.email, phone: '' }
					setValue(update)
					// mutate(update)
					toast.info('в разработке..')
				} else toast.error('Введите корректный email')
			} else {
				toast.error('заполните поле')
			}
		} else
			toast.error('Необходимо принять условия пользовательского соглашения')
	}

	const { clientHeight } = useFullHeight()
	return (
		<Flex
			minH={clientHeight + 'px'}
			flexDirection='column'
			justifyContent='space-between'
			pb={PADDING_Y}
		>
			<Box>
				<Center overflow='hidden'>
					<Flex
						minW='1038px'
						mt='-741px'
						justifyContent='center'
						alignItems='end'
						h='1001px'
						rounded='50%'
						bg='#45C069'
						mx='auto'
						pb='17.94px'
					>
						<Image
							src={Logo}
							alt='Logo'
						/>
					</Flex>
				</Center>

				<Flex
					mt='11.8px'
					justifyContent='center'
					gap='1'
					className={unbounded.className}
					fontWeight='500'
					fontSize='34.03px'
					lineHeight='42.2px'
				>
					<Text color='#FF8400'>AIST</Text>
					<Text color='#43995C'>CARGO</Text>
				</Flex>

				<InputTitle
					textAlign='center'
					mt='40px'
					px='4'
				>
					AistCargo - быстро и удобно передать посылку между доставщиком и
					отправителем
				</InputTitle>
			</Box>

			<Container mt='100px'>
				<Title mb='35px'>Регистрация/Авторизация</Title>

				{isAuthTypeEmail ? (
					<InputComponent
						handleChange={e => setValue({ ...value, email: e.target.value })}
						value={value.email}
						title='Email почта'
						name='email'
						type='email'
						placeholder='Напишите почту'
					/>
				) : (
					<PhoneInputComponent
						handleChange={phone => setValue({ ...value, phone })}
						value={value.phone}
					/>
				)}

				<Flex
					alignItems='center'
					gap='2'
				>
					<Checkbox
						onChange={e => setAgree(e.target.checked)}
						colorScheme='green'
						mt='2px'
					/>
					<Link href={agreeTerms ? '/Пользовательское-соглашение.pdf' : ''}>
						<Text
							color='#232D37'
							opacity={agreeTerms ? '1' : '.5'}
							textDecoration={agreeTerms ? 'underline' : 'none'}
							fontSize='12px'
							lineHeight='18px'
						>
							Принимаю пользовательское соглашение
						</Text>
					</Link>
				</Flex>

				<DefButton
					mt='58px'
					isLight={true}
					onClick={() => setAuthType(state => !state)}
				>
					{`Вход по ${isAuthTypeEmail ? 'номеру' : 'Email'}`}
				</DefButton>
				<DefButton
					mt='2'
					onClick={onsubmit}
				>
					Далее
				</DefButton>
			</Container>

			<PinInputComponent
				isAuthTypeEmail={isAuthTypeEmail}
				isOpen={isOpen}
				onClose={onClose}
				value={value}
			/>
		</Flex>
	)
}

export default AuthForm
