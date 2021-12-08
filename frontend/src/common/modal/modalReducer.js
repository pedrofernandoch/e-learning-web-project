import { SET_MODAL_VISIBILITY,  SET_MODAL_TO_INITIAL_STATE } from '../../utils/actionTypes'

const INITIAL_STATE = {
    modalTitle: '', modalVisibility: false, modalCrudType: '', entity: '', entityId: '', model: ''
}

export default function modalReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_MODAL_VISIBILITY:
            return {
                ...state,
                modalVisibility: action.modalVisibility,
                modalTitle: action.modalTitle,
                modalCrudType: action.modalCrudType,
                entity: action.entity,
                model: action.model,
                entityId: action.entityId
            }
        case SET_MODAL_TO_INITIAL_STATE:
            return INITIAL_STATE
        default:
            return state
    }
}