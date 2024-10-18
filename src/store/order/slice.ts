import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface OrderState {
	is_anonymous: boolean
}

const initialState: OrderState = {
	is_anonymous: false
}

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setAddress(state) {
			state.is_anonymous = false
		}
	}
})

export const OrderReducer = orderSlice.reducer
