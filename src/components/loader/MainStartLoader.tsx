import { Box, Center, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'

import { unbounded } from '@/constants/fonts/fonts'

import Logo from '@/assets/img/logo.png'

const MainStartLoader = () => {
	return (
		<Box
			maxH='100vh'
			overflow='hidden'
		>
			<Center overflow='hidden'>
				<Flex
					justifyContent='center'
					bg='#24B23E'
					alignItems='end'
					mx='auto'
					className='main-anim-loader'
				>
					<Flex
						flexDirection='column'
						alignItems='center'
						position='relative'
						overflow='hidden'
					>
						<Image
							src={Logo}
							alt='Logo'
							width={313}
							height={195}
						/>
					</Flex>
				</Flex>
			</Center>

			<Flex
				mt='11.8px'
				justifyContent='center'
				gap='1'
				className={unbounded.className}
				fontWeight='500'
				fontSize='34.03px'
				lineHeight='42.2px'
			>
				<Text color='#FF8400'>AIST</Text>
				<Text color='#24B23E'>CARGO</Text>
			</Flex>
		</Box>
	)
}

export default MainStartLoader
