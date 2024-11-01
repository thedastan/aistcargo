'use client'

import { Box, Flex } from '@chakra-ui/react'
import moment from 'moment'

import InterfaceShape from '@/components/layout-templates/interface-template'
import AdCard from '@/components/ui/ad/AdCard'
import AdDates from '@/components/ui/ad/AdDates'
import PhoneTitle from '@/components/ui/ad/PhoneTitle'
import DefButton from '@/components/ui/buttons/DefButton'
import MiniText from '@/components/ui/texts/MiniText'

import EditSvg from '@/assets/svg/EditSvg'

import { useAppSelector } from '@/hooks/useAppSelector'

const PreviewAdComponent = () => {
	const { ad } = useAppSelector(s => s.storage)

	const current_date = moment().format('DD.MM.YYYY')
	return (
		<InterfaceShape title='Предпросмотр'>
			<Box pt='10px'>
				<PhoneTitle withoutAvatar={true} />
				<AdCard />
				<AdDates />

				<Flex
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

				<DefButton>Опубликовать</DefButton>
			</Box>
		</InterfaceShape>
	)
}

export default PreviewAdComponent
