'use client'

import { Box } from '@chakra-ui/react'
import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
	dehydrate
} from '@tanstack/react-query'
import { PropsWithChildren, useEffect, useState } from 'react'
import { Toaster } from 'sonner'

import { INTERFACE_WIDTH } from '@/config/_variables.config'

import { PersistProvider } from '@/store/persist-provider'

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
	const dehydratedState = dehydrate(client)

	useEffect(() => {
		setHeight(document.documentElement.clientHeight)
	}, [])

	return (
		<QueryClientProvider client={client}>
			<HydrationBoundary state={dehydratedState}>
				<PersistProvider>
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
				</PersistProvider>
			</HydrationBoundary>
		</QueryClientProvider>
	)
}
