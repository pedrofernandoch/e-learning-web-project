import { SET_CONTACT_TO_INITIAL_STATE, SET_CURRENT_CONTACT } from '../utils/actionTypes'

const INITIAL_STATE = {
    currentContact: {}
}

export default function contactReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_CURRENT_CONTACT:
            return { ...state, currentContact: action.currentContact }
        case SET_CONTACT_TO_INITIAL_STATE:
            return INITIAL_STATE
        default:
            return state
    }
}