'use client'

import { Flex, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import AuthTemplate from '@/components/layout-templates/auth-template'
import Spinner from '@/components/loader/spinner'
import InputComponent from '@/components/ui/inputs/InputComponent'
import PhoneInputComponent from '@/components/ui/inputs/PhoneInputComponent'
import InputTitle from '@/components/ui/texts/InputTitle'

import { AUTH_PAGES } from '@/config/pages/auth-url.config'

import { useOtpSent } from '@/hooks/useAuth'
import { usePasswordReset } from '@/hooks/usePassword'

import PinInputComponent from '../auth-form/PinInput'

import { EnumOtpCode } from '@/models/auth.enum'
import { IAuthForm } from '@/models/auth.model'

const ResetPasswordForm = () => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const { push } = useRouter()
	const [value, setValue] = useState<IAuthForm>({
		phone: '',
		password: ''
	})

	const { isPending, mutate } = useOtpSent(onOpen)
	const onsubmit = () => {
		if (value.phone.trim().length > 10 && !!value.password.trim()) {
			mutate({ phone: value.phone, type: EnumOtpCode.RESET_PASSWORD })
		} else {
			toast.error('заполните поле')
		}
	}

	const { isLoading, reset } = usePasswordReset(() => push(AUTH_PAGES.AUTH))
	const onReset = (code: string) => {
		reset({ password: value.password, otp: code })
	}

	return (
		<AuthTemplate
			onsubmit={onsubmit}
			title='Забыли пароль?'
			subtitle={false}
			footer={{
				btn_name: 'Создать аккаунт',
				question: 'У вас нет учетной записи? ',
				path: AUTH_PAGES.REGISTER
			}}
		>
			{isPending && <Spinner />}
			<PhoneInputComponent
				handleChange={phone => setValue({ ...value, phone })}
				value={value.phone}
				title='Номер вашего телефона'
			/>

			<InputComponent
				handleChange={e => setValue({ ...value, password: e.target.value })}
				value={value.password}
				name='password'
				placeholder='Придумайте новый пароль'
				title='Новый пароль'
				type='password'
			/>

			{/* <Flex
				justifyContent='end'
				mt='-1'
			>
				<InputTitle
					color='#2B59FF'
					cursor='pointer'
					_active={{ opacity: '.7' }}
				>
					Через почту
				</InputTitle>
			</Flex> */}

			<PinInputComponent
				isOpen={isOpen}
				onsubmit={onReset}
				isLoading={isLoading}
				value={{ phone: value.phone, type: EnumOtpCode.RESET_PASSWORD }}
			/>
		</AuthTemplate>
	)
}

export default ResetPasswordForm
