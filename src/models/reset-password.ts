export interface IChangePassword {
	old_password: string
	password: string
}

export interface IResetPassword {
	otp: string
	password: string
}
