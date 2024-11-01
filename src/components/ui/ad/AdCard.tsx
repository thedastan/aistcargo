import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import { GoDotFill } from 'react-icons/go'
import { GoDot } from 'react-icons/go'
import { GrLocation } from 'react-icons/gr'

import BoldText from '../texts/BoldText'
import Description from '../texts/Description'
import MiniText from '../texts/MiniText'

import TransportsData from './TransportsData'

interface AdCardProps {
	transport: string[]
	price?: string
	parcel_type: string
	description?: string
	to_city: string
	from_city: string
	address?: string
}
const AdCard = (props: AdCardProps) => {
	// const [transportData, setTransport] = useState(props.transport)

	return (
		<Box
			mt='5'
			bg='#F5F5F5'
			rounded='20px'
			px='5'
			py='6'
		>
			<Flex
				justifyContent='space-between'
				alignItems='center'
			>
				<TransportsData transport={props.transport} />

				<Text
					fontWeight='600'
					lineHeight='21.79px'
					fontSize='16px'
					color='#43995C'
				>
					{props.price ? props.price + ' c' : 'Договорная'}
				</Text>
			</Flex>

			<Box mt='6'>
				<BoldText mb='10px'>{props.parcel_type}</BoldText>
				{!!props.description && (
					<Description color='#232D37'>{props.description}</Description>
				)}
			</Box>

			<Flex
				gap='14px'
				mt='6'
			>
				<Flex
					mt='25px'
					w='8px'
					flexDirection='column'
					justifyContent='space-between'
					alignItems='center'
					h='70px'
				>
					<GoDotFill fontSize='20px' />
					<Box
						maxH='40px'
						h='100%'
						borderLeft='1px dashed #232D37'
						w='1px'
						mr='-1px'
						opacity='.5'
					/>
					<GoDot fontSize='20px' />
				</Flex>
				<Box
					maxW='100%'
					w='100%'
				>
					<MiniText>Откуда</MiniText>
					<BoldText
						mt='1'
						fontWeight='600'
						fontSize='16px'
					>
						{props.from_city}
					</BoldText>

					<Divider
						w='100%'
						h='1px'
						bg='#232D37'
						opacity='.1'
						my='10px'
					/>

					<MiniText>Куда</MiniText>
					<BoldText
						mt='1'
						fontWeight='600'
						fontSize='16px'
					>
						{props.to_city}
					</BoldText>
				</Box>
			</Flex>

			{!!props.address && (
				<Flex
					mt='6'
					gap='10px'
					alignItems='center'
				>
					<GrLocation
						color='#43995C'
						fontSize='20px'
					/>

					<BoldText
						fontWeight='600'
						fontSize='16px'
						color='#43995C'
					>
						{props.address}
					</BoldText>
				</Flex>
			)}
		</Box>
	)
}

export default AdCard
