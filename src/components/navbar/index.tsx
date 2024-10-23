'use client'

import { Container, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlinePlus } from 'react-icons/ai'

import NavbarHomeSvg from '@/assets/svg/NavbarHomeSvg'
import NavbarUserSvg from '@/assets/svg/NavbarUserSvg'

import { INTERFACE_WIDTH, THEME_COLOR } from '@/config/_variables.config'
import { USER_PAGES } from '@/config/pages/user-url.config'

const navbar = [
	{
		path: USER_PAGES.HOME,
		icon: <NavbarHomeSvg />
	},
	{
		path: USER_PAGES.CREATE,
		icon: (
			<AiOutlinePlus
				color='#FFFFFF'
				fontSize='24px'
			/>
		)
	},
	{
		path: USER_PAGES.PROFILE,
		icon: <NavbarUserSvg />
	}
]

const Navbar = () => {
	const pathname = usePathname()
	return (
		<Flex
			position='fixed'
			bottom='4'
			left='0'
			w='100%'
		>
			<Container maxW={INTERFACE_WIDTH}>
				<Flex
					className='navbar'
					mx='auto'
					w='320px'
					h='60px'
					bg='#232D37'
					rounded='100px'
					padding='6px'
					gap='1'
				>
					{navbar.map((el, idx) => (
						<Link
							key={idx}
							href={el.path}
							style={{ width: pathname === el.path ? '34%' : '33%' }}
						>
							<Flex
								// w={pathname === el.path ? '34%' : '33%'}
								h='100%'
								bg={pathname === el.path ? THEME_COLOR : 'transparent'}
								rounded='30px'
								justifyContent='center'
								alignItems='center'
								className={pathname === el.path ? 'active' : ''}
								cursor='pointer'
								_active={{ opacity: '.8' }}
								transition='.2s'
							>
								{el.icon}
							</Flex>
						</Link>
					))}
				</Flex>
			</Container>
		</Flex>
	)
}

export default Navbar
