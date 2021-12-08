import React, { Component } from 'react'
import TableView from '../table/TableView'

const adminColumns = [
    { title: "ID", field: "id" },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Password", field: "password" },
]

class AdminView extends Component {

    render() {
        return (
            <TableView model="admin" field="name" columns={adminColumns} functions={{
                setStateValue: this.props.setStateValue,
                setModalVisibility: this.props.setModalVisibility }} />
        )
    }
}

export default AdminView