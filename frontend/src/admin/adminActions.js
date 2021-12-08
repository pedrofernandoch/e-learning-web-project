import { SET_ADMIN_TO_INITIAL_STATE, SET_CURRENT_ADMIN } from '../utils/actionTypes'

export function setAdminToInitialState() {
    return {
        type: SET_ADMIN_TO_INITIAL_STATE,
    }
}

export function setAdmin(admin) {
    const adminData = {...admin}
    delete adminData.tableData
    return {
        type: SET_CURRENT_ADMIN,
        currentAdmin: adminData
    }
}