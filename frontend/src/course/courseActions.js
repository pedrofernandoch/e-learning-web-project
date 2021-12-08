import { SET_COURSE_TO_INITIAL_STATE, SET_CURRENT_COURSE } from '../utils/actionTypes'

export function setCourseToInitialState() {
    return {
        type: SET_COURSE_TO_INITIAL_STATE,
    }
}

export function setCourse(course) {
    const courseData = {...course}
    delete courseData.tableData
    return {
        type: SET_CURRENT_COURSE,
        currentCourse: courseData
    }
}