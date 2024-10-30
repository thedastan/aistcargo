import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IAdFormCreate } from '@/models/ad.model'
import { EnumRole, RoleTypes } from '@/services/role.service'

export const default_ad_value: IAdFormCreate = {
	from_city: '',
	to_city: '',
	parcel: '',
	send_date: '',
	transport: null,
	address: '',
	description: '',
	price: ''
}

export interface IImageFile {
	base64: any
	file: File
}

interface StorageState {
	role: RoleTypes
	values_ad: IAdFormCreate
	images: IImageFile[]
}

const initialState: StorageState = {
	role: EnumRole.SUPER_ADMIN,
	values_ad: { ...default_ad_value },
	images: []
}

export const storageSlice = createSlice({
	name: 'storage',
	initialState,
	reducers: {
		setRole(state, action: PayloadAction<RoleTypes>) {
			state.role = action.payload
		},

		setAdValues(state, action: PayloadAction<IAdFormCreate>) {
			state.values_ad = action.payload
		},

		setBase64List(state, action: PayloadAction<IImageFile[]>) {
			state.images = action.payload
		},

		resetFrom(state) {
			state.values_ad = { ...default_ad_value }
		}
	}
})

export const StorageReducer = storageSlice.reducer
export const storageActions = storageSlice.actions
