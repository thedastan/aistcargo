import { Avatar, Box, Flex, Stack, Text } from '@chakra-ui/react'
import { IoIosCamera } from 'react-icons/io'

import Spinner from '@/components/loader/spinner'
import FileInput from '@/components/ui/inputs/FileInput'

import { useAvatarUpdate, useProfile } from '@/hooks/useProfile'

const AvatarUpload = () => {
	const { mutate, isPending } = useAvatarUpdate()
	const { user } = useProfile()
	const handleFileChange = (e: React.ChangeEvent<any>) => {
		if (!!e.target?.files?.length) {
			const file = e.target?.files[0]

			mutate(file)
		}
	}
	return (
		<Flex
			flexDirection='column'
			alignItems='center'
			mb='5'
		>
			<Box
				w='72px'
				h='72px'
				position='relative'
			>
				{isPending && <Spinner />}
				<Avatar
					src={user?.image}
					w='72px'
					h='72px'
				/>

				<Box
					mt='3'
					position='absolute'
					bottom='-4.5px'
					right='-16px'
				>
					<Stack
						as='label'
						zIndex='2'
						position='relative'
						display='inline-block'
					>
						<FileInput
							handleChange={handleFileChange}
							accept={['.png', '.jpeg', '.jpg']}
							multi={true}
						/>
						<Text
							as='span'
							position='relative'
							display='inline-block'
							outline='none'
						>
							<Flex
								w='36px'
								h='36px'
								cursor='pointer'
								justifyContent='center'
								alignItems='center'
								bg='#FFFFFF'
								rounded='50%'
								_active={{ opacity: '.7' }}
								fontSize='22px'
							>
								<IoIosCamera color='#232D37' />
							</Flex>
						</Text>
					</Stack>
				</Box>
			</Box>
		</Flex>
	)
}

export default AvatarUpload
