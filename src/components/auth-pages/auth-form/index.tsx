'use client'

import { Checkbox, Flex, Text, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'

import AuthTemplate from '@/components/layout-templates/auth-template'
import InputComponent from '@/components/ui/inputs/InputComponent'
import PhoneInputComponent from '@/components/ui/inputs/PhoneInputComponent'
import InputTitle from '@/components/ui/texts/InputTitle'

import { PUBLIC_PAGES } from '@/config/pages/public-url.config'

import PinInputComponent from './PinInput'
import { IAuthForm } from '@/models/auth.model'

const AuthForm = ({ isRegister }: { isRegister?: boolean }) => {
	const [agreeTerms, setAgree] = useState(false)
	const { isOpen, onClose, onOpen } = useDisclosure()
	const [value, setValue] = useState<IAuthForm>({
		phone: '',
		password: ''
	})

	const onsubmit = () => {
		if (value.phone.trim().length > 10) {
			if (isRegister && !agreeTerms) {
				toast.error('Необходимо принять условия пользовательского соглашения')
			} else toast.info('в разработке..') // mutate(update)
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
				path: isRegister ? PUBLIC_PAGES.AUTH : PUBLIC_PAGES.REGISTER
			}}
		>
			<PhoneInputComponent
				handleChange={phone => setValue({ ...value, phone })}
				value={value.phone}
			/>

			<InputComponent
				handleChange={e => setValue({ ...value, password: e.target.value })}
				value={value.password}
				name='password'
				placeholder='Напишите пароль'
				title='Пароль'
				type='password'
			/>

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
				value={value}
			/>
		</AuthTemplate>
	)
}

export default AuthForm
