import {
	Box,
	Flex,
	HStack,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Text
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import PinInput from 'react-pin-input'

import Spinner from '@/components/loader/spinner'
import Description from '@/components/ui/texts/Description'
import Title from '@/components/ui/texts/Title'

import { INTERFACE_WIDTH } from '@/config/_variables.config'
import { SENDER_PAGES } from '@/config/pages/sender-url.config'

import { useOtpSent, useVerify } from '@/hooks/useAuth'

import { IAuthForm } from '@/models/auth.model'

interface PinInputProps {
	onClose: () => void
	value: IAuthForm
	isOpen: boolean
}

const countdown_count = 30

const PinInputComponent = ({ value, isOpen, onClose }: PinInputProps) => {
	const [code, setCode] = useState('')
	const { push } = useRouter()
	const [countdown, setCountdown] = useState(countdown_count)
	const [isAgain, setAgain] = useState(false)
	const { isPending: isLoading, mutate: verify } = useVerify(
		() => push(SENDER_PAGES.HOME),
		() => setCode('')
	)

	const countdownStart = () => setAgain(true)
	const countdownStop = () => {
		setAgain(false)
		setCountdown(countdown_count)
	}

	const { isPending, mutate } = useOtpSent(() => countdownStart())

	const sendOtpCode = () => {
		mutate(value)
	}

	const timer = `00:${
		String(countdown).length > 1 ? countdown : '0' + countdown
	}`

	useEffect(() => {
		setTimeout(() => {
			if (isAgain) {
				setCountdown(countdown - 1)
				if (countdown < 1) countdownStop()
			}
		}, 1000)
	}, [countdown, isAgain])

	useEffect(() => {
		if (isOpen) countdownStart()
		else countdownStop()
	}, [isOpen])

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {}}
			size='full'
		>
			<ModalContent
				justifyContent='center'
				transition='0'
				bg='linear-gradient(180deg, #0E1E2B 0%, #3F485F 100%)'
			>
				<ModalHeader
					px='4'
					mt='3'
				>
					<Flex
						color='#FFFFFF'
						justifyContent='space-between'
						alignItems='center'
					>
						<BsChevronLeft
							onClick={onClose}
							color='#FFFFFF'
							fontSize='22px'
						/>
						<Text
							fontWeight='500'
							lineHeight='27px'
							fontSize='18px'
						>
							Вход
						</Text>
						<Box opacity='0'>
							<BsChevronLeft />
						</Box>
					</Flex>
				</ModalHeader>
				<ModalBody
					mt='87px'
					maxW={INTERFACE_WIDTH}
					w='100%'
					mx='auto'
					padding='0'
				>
					<Box>
						{(isPending || isLoading) && <Spinner />}
						<Box textAlign='center'>
							<Title>Введите код</Title>
							<Description mt='18px'>Мы отправили код на ваш номер</Description>
							<Description fontWeight='500'>{value.phone}</Description>
						</Box>
						<HStack
							mx='auto'
							mt={5}
							justifyContent='center'
						>
							<PinInput
								length={5}
								secret
								secretDelay={1000}
								// onChange={(value, index) => setCode(value)}
								type='numeric'
								inputMode='number'
								style={{ padding: '10px' }}
								onComplete={value => verify(value)}
								autoSelect={true}
								regexCriteria={/^[0-9]*$/}
							/>
						</HStack>
						{!true && (
							<Description
								color='#F54135'
								mt='26px'
								textAlign='center'
							>
								Неправильный код, попробуйте еще раз
							</Description>
						)}

						<Flex
							justifyContent='center'
							gap='5px'
							mt='29px'
							mx='auto'
						>
							<Text
								fontSize='14px'
								lineHeight='17.5px'
								fontWeight='600'
								color='#FFFFFF'
								opacity='.6'
							>
								{isAgain ? 'Отправить код снова' : 'Я не получил код'}
							</Text>
							<Box
								onClick={() => !isAgain && sendOtpCode()}
								cursor='pointer'
								fontWeight='600'
								fontSize='14px'
								lineHeight='17.5px'
								color='#FFFFFF'
								textDecoration='underline'
								_active={{ opacity: '.7' }}
							>
								<Text>{isAgain ? timer : 'Запросить'}</Text>
							</Box>
						</Flex>
					</Box>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export default PinInputComponent
