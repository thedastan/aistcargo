import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface FilesState {
	images: File[]
}

const initialState: FilesState = {
	images: []
}

export const storageSlice = createSlice({
	name: 'image-files',
	initialState,
	reducers: {
		setFiles(state, action: PayloadAction<File[]>) {
			state.images = action.payload
		},

		resetFiles(state) {
			state.images = []
		}
	}
})

export const FilesReducer = storageSlice.reducer
export const filesActions = storageSlice.actions
