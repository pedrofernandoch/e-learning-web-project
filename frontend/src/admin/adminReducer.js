import { SET_ADMIN_TO_INITIAL_STATE, SET_CURRENT_ADMIN } from '../utils/actionTypes'

const INITIAL_STATE = {
    currentAdmin: {}
}

export default function adminReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_CURRENT_ADMIN:
            return { ...state, currentAdmin: action.currentAdmin }
        case SET_ADMIN_TO_INITIAL_STATE:
            return INITIAL_STATE
        default:
            return state
    }
}