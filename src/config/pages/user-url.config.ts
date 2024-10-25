class USER {
	private root = '/user'

	HOME = this.root

	CREATE_SENDER = `${this.root}/create/sender`
	CREATE_TRAVELER = `${this.root}/create/traveler`
	PREVIEW_PACKAGE = `${this.root}/create/preview`

	PROFILE = `${this.root}/profile`
	PROFILE_EDIT = `${this.PROFILE}/form-edit`
	AD_MANAGEMENT = `${this.PROFILE}/ad-management`
	ADS_HISTORY = `${this.PROFILE}/ads-history`
}
export const USER_PAGES = new USER()
