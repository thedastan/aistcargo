'use client'

import { Box } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useEffect, useState } from 'react'
import { Toaster } from 'sonner'

import { INTERFACE_WIDTH } from '@/config/_variables.config'

export function Providers({ children }: PropsWithChildren) {
	const [innerHeight, setHeight] = useState(0)

	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)

	useEffect(() => {
		setHeight(document.documentElement.clientHeight)
	}, [])

	return (
		<QueryClientProvider client={client}>
			<Box
				maxW={INTERFACE_WIDTH}
				mx='auto'
				minH={innerHeight ? innerHeight + 'px' : '100vh'}
				bg='#FFFFFF'
			>
				{children}
			</Box>
			<Toaster
				theme='light'
				position='top-center'
				duration={4000}
				toastOptions={{
					style: {
						background: '#FFFFFF',
						border: 'none',
						borderRadius: '12px',
						color: '#00000080',
						fontSize: '14px',
						fontWeight: '500',
						backgroundBlendMode: 'luminosity',
						minHeight: '60px'
					}
				}}
			/>
		</QueryClientProvider>
	)
}
