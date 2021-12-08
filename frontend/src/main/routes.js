import React, { Component } from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CourseView from '../course/CourseView'
import UserView from '../user/UserView'
import ContactView from '../contact/ContactView'
import FeedbackView from '../feedback/FeedbackView'
import AdminView from '../admin/AdminView'
import Modal from '../common/modal/Modal'
import { setModalVisibility } from '../common/modal/modalActions'
import If from '../common/operators/If'
import { setCourse } from '../course/courseActions'
import { setUser } from '../user/userActions'
import { setContact } from '../contact/contactActions'
import { setFeedback } from '../feedback/feedbackActions'
import { setAdmin } from '../admin/adminActions'

class Dashboard extends Component {
    render() {
        return (
            <div className='content-wrapper'>
                <Switch>
                    <Route path='/' element={<CourseView setStateValue={this.props.setCourse} setModalVisibility={this.props.setModalVisibility} />} />
                    <Route path='/users' element={<UserView setStateValue={this.props.setUser} setModalVisibility={this.props.setModalVisibility} />} />
                    <Route path='/contacts' element={<ContactView setStateValue={this.props.setContact} setModalVisibility={this.props.setModalVisibility} />} />
                    <Route path='/feedbacks' element={<FeedbackView setStateValue={this.props.setFeedback} setModalVisibility={this.props.setModalVisibility} />} />
                    <Route path='/admins' element={<AdminView setStateValue={this.props.setAdmin} setModalVisibility={this.props.setModalVisibility} />} />
                </Switch>
                <If test={this.props.modalVisibility}>
                    <Modal />
                </If>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    modalVisibility: state.modal.modalVisibility,
})
const mapDispatchToProps = dispatch => bindActionCreators({
    setModalVisibility,
    setCourse,
    setUser,
    setContact,
    setFeedback,
    setAdmin,
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)