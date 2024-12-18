import {
	Box,
	CheckboxGroup,
	Flex,
	Radio,
	Stack,
	UseRadioProps,
	useCheckbox,
	useCheckboxGroup
} from '@chakra-ui/react'
import Image, { StaticImageData } from 'next/image'

import Description from '../texts/Description'
import InputTitle from '../texts/InputTitle'

import { transports } from '@/models/transport.model'

interface TypeofTransportProps {
	onChange: (arr: string[]) => void
	isLight?: boolean
	value?: string[]
}
const TypeofTransport = ({
	onChange,
	isLight,
	value
}: TypeofTransportProps) => {
	const { getCheckboxProps } = useCheckboxGroup({
		defaultValue: value,
		onChange
	})
	return (
		<Stack
			spacing='10px'
			mb='4'
		>
			<InputTitle color={isLight ? '#232D37' : '#FFFFFF'}>
				Тип транспорта
			</InputTitle>
			<CheckboxGroup>
				<Flex gap='2'>
					{transports.map((item, idx) => {
						const checkbox = getCheckboxProps({
							value: String(item.id)
						})
						return (
							<CheckboxCard
								key={idx}
								{...item}
								isLight={!!isLight}
								params={checkbox}
							/>
						)
					})}
				</Flex>
			</CheckboxGroup>
		</Stack>
	)
}

interface TransportCardProps {
	isLight: boolean
	params: UseRadioProps
	image: StaticImageData
	name: string
}
function CheckboxCard(props: TransportCardProps) {
	const { getCheckboxProps, getInputProps } = useCheckbox(props.params)
	const checkbox = getCheckboxProps()
	const input = getInputProps()
	return (
		<Box
			as='label'
			w='100%'
		>
			<input {...input} />
			<Box
				{...checkbox}
				display='flex'
				flexDirection='column'
				justifyContent='space-between'
				alignItems='start'
				cursor='pointer'
				rounded='16px'
				w='100%'
				bg={props.isLight ? '#232D371A' : '#FFFFFF1F'}
				border='1px solid #232D371F'
				h='112px'
				_checked={{
					bg: props.isLight ? '#24B23E' : '#FFFFFF',
					opacity: '1',
					border: '1px solid #2FBF53'
				}}
				pb='12px'
				pt='10px'
				overflow='hidden'
			>
				<Flex
					justifyContent='space-between'
					alignItems='start'
					w='100%'
				>
					<Box ml='-2'>
						<Image
							src={props.image}
							alt='Image'
							height={60}
						/>
					</Box>
					<Radio
						isChecked={input.checked}
						colorScheme={props.isLight ? 'green' : 'orange'}
						border={props.isLight ? '1px solid #232D37' : '1px solid #FFFFFF'}
						px='10px'
					/>
				</Flex>
				<Description
					pl='12px'
					color={
						props.isLight
							? input.checked
								? '#FFFFFF'
								: '#232D37'
							: input.checked
								? '#232D37'
								: '#FFFFFF'
					}
				>
					{props.name}
				</Description>
			</Box>
		</Box>
	)
}

export default TypeofTransport
