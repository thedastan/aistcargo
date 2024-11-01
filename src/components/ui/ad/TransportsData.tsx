import { Box, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import MiniText from '../texts/MiniText'

import { ITransportType, transports } from '@/models/transport.model'

const TransportsData = (props: { transport: string[] }) => {
	const [filter, setFilter] = useState<ITransportType[]>([])
	function getFilter() {
		const result: ITransportType[] = []
		transports.reduce((acc: any, el) => {
			props.transport.reduce((init: any, id) => {
				if (Number(id) === el.id) {
					result.push(el)
				}
			}, '')
		}, [])

		setFilter(result)
	}

	// const [first] = filter

	useEffect(() => {
		getFilter()
	}, [])
	return !filter.length ? null : (
		<>
			{filter.length === 1 ? (
				<Box>
					{filter.map((el, idx) => (
						<Flex
							key={idx}
							gap='3'
							alignItems='center'
						>
							<Flex
								justifyContent='center'
								alignItems='center'
								w='42px'
								h='42px'
								rounded='50%'
								bg='#FFFFFF'
							>
								<el.icon />
							</Flex>
							<MiniText
								fontSize='14px'
								lineHeight='19px'
							>
								{el.name}
							</MiniText>
						</Flex>
					))}
				</Box>
			) : (
				<Flex alignItems='center'>
					{filter.map((el, idx) => (
						<Flex
							key={el.id}
							justifyContent='center'
							alignItems='center'
							w='42px'
							ml={idx ? '-2' : '0'}
							h='42px'
							rounded='50%'
							bg='#FFFFFF'
							border='1px solid #232D3714'
						>
							<el.icon />
						</Flex>
					))}
				</Flex>
			)}
		</>
	)
}

export default TransportsData
