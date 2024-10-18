'use client'

import { Flex, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { toast } from 'sonner'

import AuthTemplate from '@/components/layout-templates/auth-template'
import InputComponent from '@/components/ui/inputs/InputComponent'
import PhoneInputComponent from '@/components/ui/inputs/PhoneInputComponent'
import InputTitle from '@/components/ui/texts/InputTitle'

import { PUBLIC_PAGES } from '@/config/pages/public-url.config'

import PinInputComponent from '../auth-form/PinInput'

import { IAuthForm } from '@/models/auth.model'

const ResetPasswordForm = () => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const [value, setValue] = useState<IAuthForm>({
		phone: '',
		password: ''
	})

	const onsubmit = () => {
		if (value.phone.trim().length > 10) {
			toast.info('в разработке..') // mutate(update)
		} else {
			toast.error('заполните поле')
		}
	}

	return (
		<AuthTemplate
			onsubmit={onsubmit}
			title='Забыли пароль?'
			subtitle={false}
			footer={{
				btn_name: 'Создать аккаунт',
				question: 'У вас нет учетной записи? ',
				path: PUBLIC_PAGES.REGISTER
			}}
		>
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

			<Flex
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
			</Flex>

			<PinInputComponent
				isOpen={isOpen}
				onClose={onClose}
				value={value}
			/>
		</AuthTemplate>
	)
}

export default ResetPasswordForm
