import { Box, Flex, Stack, useDisclosure } from '@chakra-ui/react'
import moment from 'moment'
import 'moment/locale/ru'
import { GoChevronRight } from 'react-icons/go'

import { getFullName } from '@/hooks/useProfile'

import ImagesSliderDetail from '../swiper/AdsImages'
import AdCard from '../ui/ad/AdCard'
import AdDates from '../ui/ad/AdDates'
import PhoneTitle from '../ui/ad/PhoneTitle'
import TransportsData from '../ui/ad/TransportsData'
import EditAdButtons from '../ui/buttons/EditAdButtons'
import DrawerModal from '../ui/drawer'
import BoldText from '../ui/texts/BoldText'
import MiniText from '../ui/texts/MiniText'

import { IAdModel } from '@/models/ad.model'

interface OrderCardProps {
	ad: IAdModel
	isEdit: boolean
}

const OrderCard = ({ ad, isEdit }: OrderCardProps) => {
	const { isOpen, onClose, onOpen } = useDisclosure()

	const send_date_short = moment(ad.send_date).format('D-MMM')
	const transport =
		typeof ad.transport === 'number' ? [ad.transport] : ad.transport

	return (
		<Box>
			{!!isEdit && (
				<EditAdButtons
					ad={ad}
					transport={transport.map(id => String(id))}
				/>
			)}
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

					<GoChevronRight
						color='#232D37'
						fontSize='20px'
					/>
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
						color='#24B23E'
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
				{!!ad?.ads_media && (
					<ImagesSliderDetail
						images={ad.ads_media.filter(item => !!item.image)}
					/>
				)}
				<AdDates
					created_date={ad.created_at}
					send_date={ad.send_date}
				/>
			</DrawerModal>
		</Box>
	)
}

export default OrderCard
