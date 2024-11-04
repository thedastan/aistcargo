'use client'

import { Container, Flex, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

import NavbarHomeSvg from '@/assets/svg/NavbarHomeSvg'
import NavbarUserSvg from '@/assets/svg/NavbarUserSvg'

import { INTERFACE_WIDTH, THEME_COLOR } from '@/config/_variables.config'
import { USER_PAGES } from '@/config/pages/user-url.config'

import { storageActions } from '@/store/slices/storage-slice'

import TransportModal from '../user-pages/create/traveler/TransportModal'

import { EnumRole, getUserRole } from '@/services/role.service'

const Navbar = () => {
	const role = getUserRole()
	const pathname = usePathname()
	const dispatch = useDispatch()
	const { isOpen, onClose, onOpen } = useDisclosure()
	const onRedirect = (index: number) => {
		if (role === EnumRole.TRAVELER && index === 1) {
			onOpen()
		}
	}

	const navbar = [
		{
			path: USER_PAGES.HOME,
			icon: <NavbarHomeSvg />
		},
		{
			path: role === EnumRole.SENDER ? USER_PAGES.CREATE_SENDER : '',
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

	useEffect(() => {
		dispatch(storageActions.resetFrom())
	}, [pathname])
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
							href={el.path}
							onClick={() => onRedirect(idx)}
							key={idx}
							style={{ width: pathname === el.path ? '34%' : '33%' }}
						>
							<Flex
								w='100%'
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

			<TransportModal
				isOpen={isOpen}
				onClose={onClose}
			/>
		</Flex>
	)
}

export default Navbar
