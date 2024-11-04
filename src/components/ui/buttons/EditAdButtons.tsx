import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { FaTrash } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'

import EditSvg from '@/assets/svg/EditSvg'

import { USER_PAGES } from '@/config/pages/user-url.config'

import { storageActions } from '@/store/slices/storage-slice'

import { useRemoveAd } from '@/hooks/useAds'

import ModalComponent from '../modal/ModalComponent'

import { IAdModel } from '@/models/ad.model'
import { EnumRole, getUserRole } from '@/services/role.service'

interface EditAdButtonsProps {
	transport: string[]
	ad: IAdModel
}

const EditAdButtons = ({ ad, transport }: EditAdButtonsProps) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const dispatch = useDispatch()
	const { push } = useRouter()
	const role = getUserRole()

	const { remove, isPending } = useRemoveAd(onClose)

	const onEdit = () => {
		const send_date_input_format = moment(ad.send_date).format('YYYY-MM-DD')
		const ad_copy: any = {
			...ad,
			transport,
			send_date: send_date_input_format,
			phone: ad.user?.phone
		}
		delete ad_copy.user
		delete ad_copy.created_at
		delete ad_copy?.ads_media
		dispatch(storageActions.setAdValues(ad_copy))

		const path =
			role === EnumRole.TRAVELER
				? USER_PAGES.CREATE_TRAVELER
				: USER_PAGES.CREATE_SENDER
		push(path)
	}
	return (
		<Flex
			justifyContent='end'
			pr='4'
			mb='2'
			mt='4'
			gap='3'
		>
			<Box
				_active={{ opacity: '.7' }}
				cursor='pointer'
			>
				<FaTrash
					onClick={onOpen}
					color='#1C1C1C'
					opacity='.3'
					fontSize='22px'
				/>
				<ModalComponent
					title='Вы уверены, что хотите удалить заявку?'
					isOpen={isOpen}
					onClose={onClose}
					onSubmit={() => remove(ad.id)}
					isLoading={isPending}
				/>
			</Box>
			<Box
				onClick={onEdit}
				cursor='pointer'
			>
				<EditSvg />
			</Box>
		</Flex>
	)
}

export default EditAdButtons
