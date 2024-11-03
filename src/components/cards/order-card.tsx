import { Box, Flex, Stack, useDisclosure } from '@chakra-ui/react'
import moment from 'moment'
import 'moment/locale/ru'
import { useRouter } from 'next/navigation'
import { GoChevronRight } from 'react-icons/go'
import { useDispatch } from 'react-redux'

import EditSvg from '@/assets/svg/EditSvg'

import { USER_PAGES } from '@/config/pages/user-url.config'

import { storageActions } from '@/store/slices/storage-slice'

import { getFullName } from '@/hooks/useProfile'

import AdCard from '../ui/ad/AdCard'
import AdDates from '../ui/ad/AdDates'
import PhoneTitle from '../ui/ad/PhoneTitle'
import TransportsData from '../ui/ad/TransportsData'
import DrawerModal from '../ui/drawer'
import BoldText from '../ui/texts/BoldText'
import MiniText from '../ui/texts/MiniText'

import { IAdModel } from '@/models/ad.model'
import { EnumRole, getUserRole } from '@/services/role.service'

interface OrderCardProps {
	ad: IAdModel
	isEdit: boolean
}

const OrderCard = ({ ad, isEdit }: OrderCardProps) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const dispatch = useDispatch()
	const { push } = useRouter()
	const role = getUserRole()
	const send_date_short = moment(ad.send_date).format('D-MMM')

	const transport =
		typeof ad.transport === 'number' ? [ad.transport] : ad.transport

	const onClickIcon = () => {
		if (isEdit) {
			const send_date_input_format = moment(ad.send_date).format('YYYY-MM-DD')
			const ad_copy: any = {
				...ad,
				transport: transport.map(id => String(id)),
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
	}
	return (
		<>
			<Box
				px='14px'
				py='5'
				bg='#EBF0EB'
				rounded='20px'
				onClick={() => !isEdit && onOpen()}
				cursor='pointer'
			>
				<Flex
					justifyContent='space-between'
					alignItems='center'
				>
					<TransportsData transport={transport} />

					{isEdit ? (
						<Box
							onClick={onClickIcon}
							cursor='pointer'
						>
							<EditSvg />
						</Box>
					) : (
						<GoChevronRight
							color='#232D37'
							fontSize='20px'
						/>
					)}
				</Flex>

				<Box mt='14px'>
					<BoldText noOfLines={2}>{ad.parcel.name}</BoldText>
				</Box>

				<Stack
					mt='5'
					spacing='2px'
				>
					<MiniText>Откуда</MiniText>
					<BoldText
						fontWeight='600'
						fontSize='14px'
					>
						{ad.from_city.name}
					</BoldText>
				</Stack>
				<Stack
					mt='6px'
					spacing='2px'
				>
					<MiniText>Куда</MiniText>
					<BoldText
						fontSize='14px'
						fontWeight='600'
					>
						{ad.to_city.name}
					</BoldText>
				</Stack>

				<Box mt='5'>
					<BoldText
						fontWeight='600'
						color='#43995C'
						lineHeight='24.51px'
					>
						{ad.price ? `${ad.price} с` : 'Договорная'}
					</BoldText>

					<Flex
						justifyContent='space-between'
						alignItems='center'
						mt='6px'
					>
						<MiniText>Дата отправки:</MiniText>
						<MiniText
							fontSize='14px'
							lineHeight='19.07px'
						>
							{send_date_short}
						</MiniText>
					</Flex>
				</Box>
			</Box>

			<DrawerModal
				isOpen={isOpen}
				onClose={onClose}
				title='Детали'
			>
				{!!ad.user && (
					<PhoneTitle
						full_name={getFullName(ad.user.first_name, ad.user.last_name)}
						phone={ad.user.phone}
						avatar={ad.user.image}
					/>
				)}
				<AdCard
					from_city={ad.from_city.name}
					to_city={ad.to_city.name}
					parcel_type={ad.parcel.name}
					transport={transport}
					address={ad.address}
					description={ad.description}
					price={ad.price}
				/>
				<AdDates
					created_date={ad.created_at}
					send_date={ad.send_date}
				/>
			</DrawerModal>
		</>
	)
}

export default OrderCard
