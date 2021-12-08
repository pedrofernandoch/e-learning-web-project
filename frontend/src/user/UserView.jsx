import React, { Component } from 'react'
import TableView from '../table/TableView'
import Avatar from 'react-avatar'

const userColumns = [
    { title: 'Photo', field: 'uploadPhoto', render: rowData =>  <Avatar round={true} size="70" src={rowData.uploadPhoto} /> },
    { title: "ID", field: "id" },
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Password", field: "password" },
    { title: "Adress", field: "adress" },
    { title: "Phone", field: "phone" },
    { title: "Register Date", field: "registerDate" }
]


class UserView extends Component {

    render() {
        return (
            <TableView model="user" columns={userColumns} field="name" functions={{
                setStateValue: this.props.setStateValue,
                setModalVisibility: this.props.setModalVisibility }} />
        )
    }
}

export default UserView