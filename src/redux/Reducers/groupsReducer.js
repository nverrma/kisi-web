import { types } from "../constants";
const InitialState = {
	data: "",

}
const groups = (state = InitialState, action) => {
	switch (action.type) {
		case types.GROUP_DATA:
			return { ...state, data: action.payload.data }
		case types.GROUP_DATA_FAIL:
			return { ...state, data: action.payload }
		case types.GROUP_LOCKS_DATA:
			return { ...state, locks: action.payload.data }
		case types.GROUP_LOCKS_DATA_FAIL:
			return { ...state, locks: action.payload.data }
		case types.GROUP_LOCKS_DATA_DELETE:
			return { ...state, deletelock: action.payload.data , deleteFlag : true}
		case types.GROUP_LOCKS_DATA_DELETE_FAIL:
			return { ...state, deletelock: action.payload.data }
		case types.GROUP_PLACES:
			return { ...state, places: action.payload.data }
		case types.GROUP_LOCKS:
			return { ...state, locksdata : action.payload.data  }
		default:
			return state
	}
}

export default groups;