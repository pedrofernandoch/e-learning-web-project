import React, { Component } from 'react'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import If from '../operators/If'
import { baseApiUrl } from '../../utils/systemConstans'
import { setCourseToInitialState } from '../../course/courseActions'
import { setUserToInitialState } from '../../user/userActions'
import { setContactToInitialState } from '../../contact/contactActions'
import { setFeedbackToInitialState } from '../../feedback/feedbackActions'
import { setAdminToInitialState } from '../../admin/adminActions'
import { setModalVisibility, setModalToInitialState } from './modalActions'
import ModalForm from './ModalForm'

class Modal extends Component {

    setToInitalState = _ => {
        const { model, modalCrudType, setCourseToInitialState, setUserToInitialState,
            setContactToInitialState, setFeedbackToInitialState, setAdminToInitialState, setModalToInitialState } = this.props
        if (modalCrudType !== 'delete') {
            switch (model) {
                case 'course':
                    setCourseToInitialState()
                    break;
                case 'user':
                    setUserToInitialState()
                    break;
                case 'contact':
                    setContactToInitialState()
                    setUserToInitialState()
                    break;
                case 'feedback':
                    setFeedbackToInitialState()
                    setUserToInitialState()
                    break;
                case 'admin':
                    setAdminToInitialState()
                    break;
                default:
                    break;
            }
        }
        setModalToInitialState()
    }

    remove(id, model) {
        axios.delete(`${baseApiUrl}/${model}s/${id}`)
            .then(resp => {
                toastr.success('Success', 'Operation carried out successfully.')
            })
            .catch(e => {
                if (e && e.response && e.response.data) {
                    toastr.error('Error', e.response.data)
                } else if (typeof e === 'string') {
                    toastr.error('Error', e)
                } else {
                    toastr.error('Error', 'Oops.. Something went wrong.')
                }
            })
    }

    removeAndSetToInitialState = _ => {
        const { entityId, model, setModalToInitialState } = this.props
        this.remove(entityId, model)
        setModalToInitialState()
    }

    render() {
        const { modalVisibility, modalCrudType, modalTitle } = this.props
        return (
            <>
                <Dialog maxWidth={modalCrudType === 'delete' ? 'sm' : 'md'} open={modalVisibility} onClose={this.setToInitalState}>
                    <DialogTitle>{modalTitle}</DialogTitle>
                    <If test={modalCrudType === 'delete'}>
                        <DialogContent>
                            <DialogContentText>
                                By deleting this record it will no longer be available in the database permanently. Do you really want to delete?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.setToInitalState} style={{ color: '#363638' }}>Cancel</Button>
                            <Button onClick={this.removeAndSetToInitialState} style={{ color: '#ca0096' }}>Delete</Button>
                        </DialogActions>
                    </If>
                    <If test={modalCrudType !== 'delete'}>
                        <DialogContent>
                            <ModalForm modalCrudType={this.props.modalCrudType} model={this.props.model} setToInitalState={this.setToInitalState} />
                        </DialogContent>
                    </If>
                </Dialog>
            </>
        )
    }
}

const mapStateToProps = state => {
    const initialState = {
        modalVisibility: state.modal.modalVisibility,
        modalTitle: state.modal.modalTitle,
        modalCrudType: state.modal.modalCrudType,
        entityId: state.modal.entityId,
        model: state.modal.model,
    }
    return initialState
}
const mapDispatchToProps = dispatch => bindActionCreators({
    setModalVisibility,
    setModalToInitialState,
    setCourseToInitialState,
    setUserToInitialState,
    setContactToInitialState,
    setFeedbackToInitialState,
    setAdminToInitialState,
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Modal)