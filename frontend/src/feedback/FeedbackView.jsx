import React, { Component } from 'react'
import TableView from '../table/TableView'

const feedbackColumns = [
    { title: "ID", field: "id" },
    { title: "User id", field: "userId", hidden: true },
    { title: "Feedback", field: "feedback" },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
]

class FeedbackView extends Component {

    render() {
        return (
            <TableView model="feedback" field="id" columns={feedbackColumns} functions={{
                setStateValue: this.props.setStateValue,
                setModalVisibility: this.props.setModalVisibility, }} />
        )
    }
}

export default FeedbackView