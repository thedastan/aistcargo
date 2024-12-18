import {
	Box,
	Flex,
	HStack,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	Text
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import PinInput from 'react-pin-input'

import Spinner from '@/components/loader/spinner'
import Description from '@/components/ui/texts/Description'
import Title from '@/components/ui/texts/Title'

import { INTERFACE_WIDTH } from '@/config/_variables.config'
import { AUTH_PAGES } from '@/config/pages/auth-url.config'

import { useOtpSent, useVerify } from '@/hooks/useAuth'

import { ISendotpForm } from '@/models/auth.model'

interface PinInputProps {
	onsubmit: (code: string) => void
	value: ISendotpForm
	isOpen: boolean
	isLoading: boolean
}

const countdown_count = 30

const PinInputComponent = ({
	value,
	isOpen,
	onsubmit,
	isLoading
}: PinInputProps) => {
	const [countdown, setCountdown] = useState(countdown_count)
	const [isAgain, setAgain] = useState(false)

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
			>
				<ModalBody
					mt='130px'
					maxW={INTERFACE_WIDTH}
					w='100%'
					mx='auto'
					padding='0'
				>
					{(isPending || isLoading) && <Spinner />}
					<Box textAlign='center'>
						<Title>Введите код</Title>
						<Description
							color='#232D37'
							mt='35px'
						>
							Мы отправили код на ваш номер
						</Description>
						<Description
							color='#232D37'
							fontWeight='500'
						>
							{value.phone}
						</Description>
					</Box>
					<HStack
						mx='auto'
						mt={5}
						justifyContent='center'
					>
						<PinInput
							length={4}
							secret
							secretDelay={1000}
							type='numeric'
							inputMode='number'
							style={{ padding: '10px' }}
							onComplete={onsubmit}
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
				</ModalBody>
				<ModalFooter pb='50px'>
					<Flex
						justifyContent='center'
						gap='5px'
						mt='29px'
						mx='auto'
					>
						<Text
							fontSize='16px'
							lineHeight='20px'
							fontWeight='400'
							color='#000000B2'
						>
							{isAgain ? 'Отправить код снова' : 'Я не получил код'}
						</Text>
						<Box
							onClick={() => !isAgain && sendOtpCode()}
							cursor='pointer'
							fontWeight='600'
							fontSize='16px'
							lineHeight='20px'
							color='#000000'
							textDecoration='underline'
							_active={{ opacity: '.7' }}
						>
							<Text>{isAgain ? timer : 'Запросить'}</Text>
						</Box>
					</Flex>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default PinInputComponent
