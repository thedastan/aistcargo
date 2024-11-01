import {
	Box,
	Flex,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Radio,
	RadioGroup,
	useDisclosure,
	useOutsideClick
} from '@chakra-ui/react'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'

import { useDebounce } from '@/hooks/useDebounce'

import InputComponent from '../inputs/InputComponent'
import Description from '../texts/Description'

import { IListItem, PartialListItem } from '@/models/transport.model'

interface SearchSelectProps extends PropsWithChildren {
	onChange: (e: IListItem) => void
	data: IListItem[]
	value?: PartialListItem
}
const SearchSelect = (props: SearchSelectProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [search_data, setSearchData] = useState(props.data)
	const [search, setSearch] = useState('')
	const ref = useRef<any>(null)
	const debounce = useDebounce(search, 300)
	useOutsideClick({
		ref: ref,
		handler: () => onClose()
	})

	useEffect(() => {
		if (debounce) {
			setSearchData(state =>
				state.filter(el => el.name.toLowerCase().includes(debounce))
			)
		} else setSearchData(props.data)
	}, [debounce])

	return (
		<div ref={ref}>
			<Popover
				isOpen={isOpen}
				onOpen={() => {}}
				onClose={onClose}
				placement='bottom'
				closeOnBlur={false}
			>
				<PopoverTrigger>
					<Box onClick={onOpen}>{props.children}</Box>
				</PopoverTrigger>
				<PopoverContent
					w={`${ref.current?.offsetWidth}px`}
					border='none'
					maxH='260px'
					rounded='13px'
					bg='#FFFFFF'
					boxShadow={'0px 15px 23px 5px rgba(0, 0, 0, 0.15)'}
					px='1'
					py='2'
					overflowY='auto'
					className='unscroll'
				>
					<Box px='1'>
						<InputComponent
							h='40px'
							placeholder='Поиск'
							handleChange={e => setSearch(e.target.value)}
							value={search}
							LeftElement={
								<IoIosSearch
									color='#292D32'
									fontSize='20px'
								/>
							}
						/>
					</Box>
					{!!search_data?.length && (
						<RadioGroup
							onChange={e => {
								props.onChange(JSON.parse(e) as IListItem)
								onClose()
							}}
							value={props.value ? JSON.stringify(props.value) : ''}
						>
							{search_data.map((el, idx) => (
								<Radio
									key={idx}
									value={JSON.stringify(el)}
									flexDirection='row-reverse'
									justifyContent='space-between'
									w='100%'
									minH='35px'
									colorScheme='green'
									pr='10px'
									rounded='10px'
									pl='4'
									bg='#0000000A'
									// _checked={{ bg: '#0000000A' }}
								>
									{el.name}
								</Radio>
							))}
						</RadioGroup>
					)}

					{!search_data?.length && (
						<Flex
							justifyContent='center'
							py='3'
						>
							<Description color='#20283F'>Не найдено</Description>
						</Flex>
					)}
				</PopoverContent>
			</Popover>
		</div>
	)
}

export default SearchSelect
