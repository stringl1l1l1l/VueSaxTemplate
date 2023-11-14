

const getters = {
  token: state => state.user.token,
  roles: state => state.roles,
  hasUserInfo: state => state.hasUserInfo,
  cityData: state => state.cityData
	// COMPONENT
		// vx-autosuggest
	// starredPages: state => state.navbarSearchAndPinList.data.filter((page) => page.highlightAction),
}

export default getters
