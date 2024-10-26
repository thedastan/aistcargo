import {
	Box,
	Checkbox,
	CheckboxGroup,
	Flex,
	Popover,
	PopoverContent,
	PopoverTrigger,
	useDisclosure,
	useOutsideClick
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'
import { PiCubeFocus } from 'react-icons/pi'

import { useDebounce } from '@/hooks/useDebounce'

import InputComponent from '../inputs/InputComponent'
import Description from '../texts/Description'

interface SearchSelectProps {
	title: string
	placeholder: string
	data: string[]
	icon?: JSX.Element
}
const SearchSelect = (props: SearchSelectProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [search_data, setSearchData] = useState(props.data)
	const [search, setSearch] = useState('')
	const ref = useRef<any>(null)
	const debounce = useDebounce(search, 300)
	// const { data, isLoading } = useProducts(debounce)
	useOutsideClick({
		ref: ref,
		handler: () => onClose()
	})

	useEffect(() => {
		if (debounce) {
			setSearchData(state =>
				state.filter(el => el.toLowerCase().includes(debounce))
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
					<Box onClick={onOpen}>
						<InputComponent
							title={props.title}
							placeholder={props.placeholder}
							isReadOnly={true}
							LeftElement={props.icon}
							RightElement={
								<FaChevronDown
									color='#292D32'
									fontSize='14px'
								/>
							}
						/>
					</Box>
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
						<CheckboxGroup>
							{search_data.map((el, idx) => (
								<Checkbox
									key={idx}
									flexDirection='row-reverse'
									justifyContent='space-between'
									minH='35px'
									colorScheme='green'
									pr='10px'
									rounded='10px'
									pl='4'
									_checked={{ bg: '#0000000A' }}
								>
									{el}
								</Checkbox>
							))}
						</CheckboxGroup>
					)}

					{!search_data?.length && (
						<Flex
							justifyContent='center'
							py='3'
						>
							<Description color='#20283F'>Не найдено</Description>
						</Flex>
					)}

					{/* {isLoading && (
						<Flex
							justifyContent='center'
							py='3'
						>
							<Spinner size='sm' />
						</Flex>
					)} */}
				</PopoverContent>
			</Popover>
		</div>
	)
}

export default SearchSelect
