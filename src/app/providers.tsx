'use client'

import { Box } from '@chakra-ui/react'
import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
	dehydrate
} from '@tanstack/react-query'
import { PropsWithChildren, useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'

import MainStartLoader from '@/components/loader/MainStartLoader'

import { INTERFACE_WIDTH } from '@/config/_variables.config'

import { store } from '@/store/store'

export function Providers({ children }: PropsWithChildren) {
	const [innerHeight, setHeight] = useState(0)
	const [isLoading, setLoading] = useState(false)
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
		setTimeout(() => setLoading(true), 3000)
	}, [])

	if (!isLoading) return <MainStartLoader />
	return (
		<QueryClientProvider client={client}>
			<HydrationBoundary state={dehydratedState}>
				<Provider store={store}>
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
				</Provider>
			</HydrationBoundary>
		</QueryClientProvider>
	)
}
