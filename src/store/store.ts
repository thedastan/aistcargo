import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { FilesReducer } from './slices/files-slice'
import { StorageReducer } from './slices/storage-slice'

const rootReducer = combineReducers({
	storage: StorageReducer,
	files: FilesReducer
})

export const makeStore = () =>
	configureStore({
		reducer: rootReducer
	})

export const store = makeStore()

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']

export type TypeRootState = ReturnType<typeof rootReducer>
