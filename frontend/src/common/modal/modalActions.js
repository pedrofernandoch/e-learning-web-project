import { SET_MODAL_VISIBILITY,  SET_MODAL_TO_INITIAL_STATE } from '../../utils/actionTypes'

export function setModalVisibility(modalVisibility, modalTitle, modalCrudType, model, id) {
    return {
        type: SET_MODAL_VISIBILITY,
        modalVisibility: modalVisibility,
        modalTitle: modalTitle ? modalTitle : '',
        modalCrudType: modalCrudType ? modalCrudType : '',
        model: model ? model : '',
        entityId: id ? id : ''
    }
}

export function setModalToInitialState(){
    return {
        type: SET_MODAL_TO_INITIAL_STATE
    }
}