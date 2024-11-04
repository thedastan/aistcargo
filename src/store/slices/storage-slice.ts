import { PayloadAction, createSlice } from '@reduxjs/toolkit';



import { IAdFormCreate } from '@/models/ad.model';


export const default_ad_value: IAdFormCreate = {
	from_city: {},
	to_city: {},
	parcel: {},
	send_date: '',
	transport: [],
	address: '',
	description: '',
	price: ''
}

interface StorageState {
	ad: IAdFormCreate
	files: File[]
}

const initialState: StorageState = {
	ad: { ...default_ad_value },
	files: []
}

export const storageSlice = createSlice({
	name: 'storage',
	initialState,
	reducers: {
		setAdValues(state, action: PayloadAction<IAdFormCreate>) {
			state.ad = action.payload
		},
		setFiles(state, action: PayloadAction<File[]>) {
			state.files = action.payload
		},
		resetFrom(state) {
			state.ad = { ...default_ad_value }
			state.files = []
		}
	}
})

export const StorageReducer = storageSlice.reducer
export const storageActions = storageSlice.actions