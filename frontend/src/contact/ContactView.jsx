import React, { Component } from 'react'
import TableView from '../table/TableView'

const contactColumns = [
    { title: "ID", field: "id" },
    { title: "User id", field: "userId", hidden: true },
    { title: "Message", field: "message" },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
]

class ContactView extends Component {

    render() {
        return (
            <TableView model="contact" field="id" columns={contactColumns} functions={{
                setStateValue: this.props.setStateValue,
                setModalVisibility: this.props.setModalVisibility }} />
        )
    }
}

export default ContactView