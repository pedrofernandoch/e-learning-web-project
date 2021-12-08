import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'
import ModalReducer from '../common/modal/modalReducer'
import CourseReducer from '../course/courseReducer'
import UserReducer from '../user/userReducer'
import ContactReducer from '../contact/contactReducer'
import FeedbackReducer from '../feedback/feedbackReducer'
import AdminReducer from '../admin/adminReducer'

const rootReducer = combineReducers({
    modal: ModalReducer,
    course: CourseReducer,
    user: UserReducer,
    contact: ContactReducer,
    feedback: FeedbackReducer,
    admin: AdminReducer,
    toastr: toastrReducer,
    form: formReducer,
})

export default rootReducer