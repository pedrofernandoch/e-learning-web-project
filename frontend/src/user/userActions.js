import { SET_USER_TO_INITIAL_STATE, SET_CURRENT_USER } from '../utils/actionTypes'

export function setUserToInitialState() {
    return {
        type: SET_USER_TO_INITIAL_STATE,
    }
}

export function setUser(user) {
    const userData = {...user}
    if ('tableData' in userData) delete userData.tableData
    delete userData.registerDate
    return {
        type: SET_CURRENT_USER,
        currentUser: userData
    }
}