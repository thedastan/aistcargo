'use client'

import { Checkbox, Flex, Text, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

import AuthTemplate from '@/components/layout-templates/auth-template'
import Spinner from '@/components/loader/spinner'
import InputComponent from '@/components/ui/inputs/InputComponent'
import PhoneInputComponent from '@/components/ui/inputs/PhoneInputComponent'
import InputTitle from '@/components/ui/texts/InputTitle'

import { AUTH_PAGES } from '@/config/pages/auth-url.config'
import { PUBLIC_PAGES } from '@/config/pages/public-url.config'

import { useLogin, useOtpSent } from '@/hooks/useAuth'

import PinInputComponent from './PinInput'
import { EnumOtpCode } from '@/models/auth.enum'
import { IAuthForm, ISendotpForm } from '@/models/auth.model'

const AuthForm = ({ isRegister }: { isRegister?: boolean }) => {
	const [agreeTerms, setAgree] = useState(false)
	const { isOpen, onClose, onOpen } = useDisclosure()
	const [value, setValue] = useState<IAuthForm>({
		phone: '',
		password: ''
	})

	const { auth, isPending } = useLogin()

	const { mutate, isPending: isPending2 } = useOtpSent(onOpen)
	const register_value: ISendotpForm = {
		phone: value.phone,
		type: EnumOtpCode.REGISTER
	}

	const onsubmit = () => {
		if (value.phone.trim().length > 10) {
			if (!isRegister) auth(value)
			if (isRegister) {
				!agreeTerms
					? toast.error(
							'Необходимо принять условия пользовательского соглашения'
						)
					: mutate(register_value)
			}
		} else {
			toast.error('заполните поле')
		}
	}

	return (
		<AuthTemplate
			onsubmit={onsubmit}
			title={isRegister ? 'Регистрация' : 'Вход'}
			footer={{
				btn_name: isRegister ? 'Войти' : 'Создать аккаунт',
				question: isRegister
					? 'У вас уже есть аккаунт?'
					: 'У вас нет учетной записи? ',
				path: isRegister ? AUTH_PAGES.AUTH : AUTH_PAGES.REGISTER
			}}
		>
			{(isPending || isPending2) && <Spinner />}
			<PhoneInputComponent
				handleChange={phone => setValue({ ...value, phone })}
				value={value.phone}
			/>

			{!isRegister && (
				<InputComponent
					handleChange={e => setValue({ ...value, password: e.target.value })}
					value={value.password}
					name='password'
					placeholder='Напишите пароль'
					title='Пароль'
					type='password'
				/>
			)}

			{!isRegister && (
				<Flex
					justifyContent='end'
					mt='-1'
				>
					<Link href={PUBLIC_PAGES.RESET_PASSWORD}>
						<InputTitle>Забыли пароль?</InputTitle>
					</Link>
				</Flex>
			)}

			{!!isRegister && (
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
			)}
			<PinInputComponent
				isOpen={isOpen}
				onClose={onClose}
				value={register_value}
			/>
		</AuthTemplate>
	)
}

export default AuthForm
