import { SET_FEEDBACK_TO_INITIAL_STATE, SET_CURRENT_FEEDBACK } from '../utils/actionTypes'

const INITIAL_STATE = {
    currentFeedback: {}
}

export default function feedbackReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_CURRENT_FEEDBACK:
            return { ...state, currentFeedback: action.currentFeedback }
        case SET_FEEDBACK_TO_INITIAL_STATE:
            return INITIAL_STATE
        default:
            return state
    }
}