'use client'

import { Box, Flex } from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/navigation'

import InterfaceShape from '@/components/layout-templates/interface-template'
import Spinner from '@/components/loader/spinner'
import AdCard from '@/components/ui/ad/AdCard'
import AdDates from '@/components/ui/ad/AdDates'
import PhoneTitle from '@/components/ui/ad/PhoneTitle'
import DefButton from '@/components/ui/buttons/DefButton'
import MiniText from '@/components/ui/texts/MiniText'
import Title from '@/components/ui/texts/Title'

import EditSvg from '@/assets/svg/EditSvg'

import { useAdCreate } from '@/hooks/useAds'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getFullName, useProfile } from '@/hooks/useProfile'

import { EnumRole, getUserRole } from '@/services/role.service'

const PreviewAdComponent = () => {
	const { ad, images } = useAppSelector(s => s.storage)
	const { user } = useProfile()
	const role = getUserRole()
	const { back } = useRouter()

	const { isPending, mutate } = useAdCreate(!!ad?.id, images)
	const current_date = moment().format('YYYY-MM-DD')

	const onsubmit = () => {
		if (ad) {
			mutate({
				...ad,
				from_city: ad.from_city.id,
				to_city: ad.to_city.id,
				parcel: ad.parcel.id,
				transport: role === EnumRole.TRAVELER ? ad.transport[0] : ad.transport
			})
		}
	}

	return (
		<InterfaceShape title='Предпросмотр'>
			{isPending && <Spinner />}
			{!ad?.from_city?.id ? (
				<Title
					fontSize='18px'
					lineHeight='22px'
					fontWeight='500'
					mt='80px'
				>
					Вы ничего не создали, пожалуйста вернитесь и проверьте правильно ли вы
					заполнили данные
				</Title>
			) : (
				<Box pt='10px'>
					<PhoneTitle
						withoutAvatar={true}
						full_name={getFullName(user?.first_name, user?.last_name)}
						phone={ad.phone ? ad.phone : '-'}
					/>
					<AdCard
						address={ad.address}
						from_city={`${ad?.from_city.name}`}
						to_city={`${ad?.to_city.name}`}
						parcel_type={`${ad?.parcel.name}`}
						transport={ad.transport.map(id => +id)}
						description={ad.description}
						price={ad.price}
					/>
					<AdDates
						send_date={ad?.send_date}
						created_date={current_date}
					/>

					<Flex
						onClick={back}
						my='44px'
						alignItems='center'
						gap='2'
						w='133px'
						mx='auto'
						cursor='pointer'
						_active={{ opacity: '.8' }}
					>
						<MiniText
							fontSize='14px'
							lineHeight='19.07px'
						>
							Редактировать
						</MiniText>
						<EditSvg />
					</Flex>

					<DefButton onClick={onsubmit}>
						{ad?.id ? 'Обновить' : 'Опубликовать'}
					</DefButton>
				</Box>
			)}
		</InterfaceShape>
	)
}

export default PreviewAdComponent
