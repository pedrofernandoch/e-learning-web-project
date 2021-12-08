import { SET_FEEDBACK_TO_INITIAL_STATE, SET_CURRENT_FEEDBACK } from '../utils/actionTypes'

export function setFeedbackToInitialState() {
    return {
        type: SET_FEEDBACK_TO_INITIAL_STATE,
    }
}

export function setFeedback(feedback) {
    const feedbackData = {...feedback}
    delete feedbackData.tableData
    return {
        type: SET_CURRENT_FEEDBACK,
        currentFeedback: feedbackData
    }
}