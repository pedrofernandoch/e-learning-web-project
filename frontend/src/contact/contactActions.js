import { SET_CONTACT_TO_INITIAL_STATE, SET_CURRENT_CONTACT } from '../utils/actionTypes'

export function setContactToInitialState() {
    return {
        type: SET_CONTACT_TO_INITIAL_STATE,
    }
}

export function setContact(contact) {
    const contactData = {...contact}
    delete contactData.tableData
    return {
        type: SET_CURRENT_CONTACT,
        currentContact: contactData
    }
}