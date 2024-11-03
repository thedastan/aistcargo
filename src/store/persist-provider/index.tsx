import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Provider } from 'react-redux'
import { type Persistor, persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'

import MainStartLoader from '@/components/loader/MainStartLoader'
import Spinner from '@/components/loader/spinner'

// import { PersistGate } from 'redux-persist/integration/react'
import { AppStore, makeStore } from '../store'

export function PersistProvider({ children }: PropsWithChildren) {
	const [isLoading, setLoading] = useState(false)
	const storeRef = useRef<AppStore>()
	const persistorRef = useRef<Persistor>({} as Persistor)
	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore()
		persistorRef.current = persistStore(storeRef.current)
	}

	useEffect(() => {
		setTimeout(() => setLoading(true), 5000)
	}, [])

	if (!isLoading) return <MainStartLoader />
	return (
		<Provider store={storeRef.current}>
			<PersistGate
				persistor={persistorRef.current}
				loading={<Spinner />}
			>
				{children}
			</PersistGate>
		</Provider>
	)
}
