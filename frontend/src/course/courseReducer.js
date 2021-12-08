import { SET_COURSE_TO_INITIAL_STATE, SET_CURRENT_COURSE } from '../utils/actionTypes'

const INITIAL_STATE = {
    currentCourse: {}
}

export default function courseReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_CURRENT_COURSE:
            return { ...state, currentCourse: action.currentCourse }
        case SET_COURSE_TO_INITIAL_STATE:
            return INITIAL_STATE
        default:
            return state
    }
}