import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { EnumRole, RoleTypes } from '@/services/role.service'

interface StorageState {
	role: RoleTypes
}

const initialState: StorageState = {
	role: EnumRole.SUPER_ADMIN
}

export const storageSlice = createSlice({
	name: 'storage',
	initialState,
	reducers: {
		setAddress(state, action: PayloadAction<RoleTypes>) {
			state.role = action.payload
		}
	}
})

export const StorageReducer = storageSlice.reducer
