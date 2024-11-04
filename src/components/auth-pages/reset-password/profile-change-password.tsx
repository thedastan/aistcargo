import { useDisclosure } from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react'

import ProfileItem from '@/components/cards/profile-item-card'
import Spinner from '@/components/loader/spinner'
import DefButton from '@/components/ui/buttons/DefButton'
import DrawerModal from '@/components/ui/drawer'
import InputComponent from '@/components/ui/inputs/InputComponent'

import ProfileLockSvg from '@/assets/svg/ProfileLockSvg'

import { usePasswordChange } from '@/hooks/usePassword'

import { IChangePassword } from '@/models/reset-password'

const ProfileChangePassword = () => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const [value, setValue] = useState<IChangePassword>({
		old_password: '',
		password: ''
	})
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue({ ...value, [e.target.name]: e.target.value })
	}

	const { mutate, isPending } = usePasswordChange(() => {
		onClose()
		setValue({ old_password: '', password: '' })
	})
	const onsubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		mutate(value)
	}

	return (
		<>
			<ProfileItem
				onClick={onOpen}
				icon={ProfileLockSvg}
				title='Изменить пароль'
			/>

			<DrawerModal
				title='Изменить пароль'
				isOpen={isOpen}
				onClose={onClose}
			>
				{isPending && <Spinner />}

				<form onSubmit={onsubmit}>
					<InputComponent
						handleChange={handleChange}
						value={value.old_password}
						name='old_password'
						placeholder='Напишите ваш текущий пароль'
						type='password'
						title='Старый пароль'
					/>
					<InputComponent
						handleChange={handleChange}
						value={value.password}
						name='password'
						placeholder='Придумайте новый пароль'
						type='password'
						title='Новый пароль'
					/>
					<DefButton
						mt='36px'
						type='submit'
					>
						Сохранить
					</DefButton>
				</form>
			</DrawerModal>
		</>
	)
}

export default ProfileChangePassword
