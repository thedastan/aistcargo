import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer
} from 'redux-persist'
// @ts-ignore
import storage from 'redux-persist/lib/storage'

import { SITE_NAME } from '@/constants/seo/seo.constants'

import { FilesReducer } from './slices/files-slice'
import { StorageReducer } from './slices/storage-slice'

const persistConfig = {
	key: SITE_NAME,
	storage,
	whitelist: ['storage']
}
const rootReducer = combineReducers({
	storage: persistReducer(persistConfig, StorageReducer),
	files: FilesReducer
})

export const makeStore = () =>
	configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
				}
			})
	})

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']

export type TypeRootState = ReturnType<typeof rootReducer>
