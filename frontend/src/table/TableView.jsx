import React, { Component } from 'react'
import Content from '../common/components/Content'
import ContentHeader from '../common/components/ContentHeader'
import axios from 'axios'
import MaterialTable from "@material-table/core"
import { toastr } from 'react-redux-toastr'
import { tableIcons, addIcon, editIcon, deleteIcon, refreshIcon, beautifyData, exportData, getUrl, my_localization, options } from '../utils/materialTable'

class TableView extends Component {

    tableRef = React.createRef()

    // componentDidMount() {
    //     this.props.getData()
    // }

    getTableData = query =>
        new Promise((resolve, reject) => {
            axios.get(getUrl(query, false, this.props.model + 's'))
                .then(result => {
                    let tableData = []
                    if (result.data && Array.isArray(result.data)) {
                        if (this.props.model === 'contact' || 'feedback') {
                            tableData = result.data.map(entity => {
                                const user = { ...entity.user }
                                user.userId = user.id
                                delete user.id
                                delete entity.user
                                return { ...entity, ...user }
                            })
                        } else {
                            tableData = result.data
                        }
                    }
                    beautifyData(tableData)
                    resolve({
                        data: tableData,
                        page: result.data.page ? result.data.page - 1 : 0,
                        totalCount: result.data.count ? result.data.count : tableData.length,
                    })
                })
                .catch(e => {
                    if (e && e.response && e.response.data) {
                        toastr.error('Erro', e.response.data)
                    } else if (typeof e === 'string') {
                        toastr.error('Erro', e)
                    } else {
                        toastr.error('Erro', 'Oops.. Erro inesperado.')
                    }
                    resolve({
                        data: [],
                        page: 0,
                        totalCount: 0,
                    })
                })
        })

    exportToCsv = columns => exportData(columns, this.tableRef.current.state.query, this.props.model + 's')

    onAddClick = () => {
        this.props.functions.setModalVisibility(true, `Add ${this.props.model.substring(0, this.props.model.length)}`, 'create', this.props.model)
    }

    onEditClick = (event, rowData) => {
        this.props.functions.setStateValue(rowData)
        this.props.functions.setModalVisibility(true, `Edit ${this.props.model.substring(0, this.props.model.length)}`, 'edit', this.props.model, rowData.id)
    }

    onDeleteClick = (event, rowData) => {
        this.props.functions.setModalVisibility(true, `Remove ${this.props.model.substring(0, this.props.model.length)} "${rowData[this.props.field]}"`, 'delete', this.props.model, rowData.id)
    }

    onRefreshClick = () => this.tableRef.current.onQueryChange()

    render() {
        const actions = [
            {
                icon: refreshIcon,
                tooltip: 'Refresh',
                isFreeAction: true,
                onClick: this.onRefreshClick
            },
            {
                icon: addIcon,
                tooltip: `Add ${this.props.model.substring(0, this.props.model.length)}`,
                isFreeAction: true,
                onClick: this.onAddClick
            },
            {
                icon: editIcon,
                tooltip: `Edit ${this.props.model.substring(0, this.props.model.length)}`,
                onClick: this.onEditClick
            },
            {
                icon: deleteIcon,
                tooltip: `Remover ${this.props.model.substring(0, this.props.model.length)}`,
                onClick: this.onDeleteClick
            }
        ]
        return (
            <div>
                <ContentHeader title={this.props.model.charAt(0).toUpperCase() + this.props.model.slice(1) + 's'} />
                <Content>
                    <div>
                        <MaterialTable detailPanel={this.props.detailPanel} title="" columns={this.props.columns} icons={tableIcons}
                            tableRef={this.tableRef}
                            // data={this.props.data}
                            data={this.getTableData}
                            actions={actions}
                            options={{ ...options, exportCsv: this.exportToCsv }}
                            localization={my_localization}
                        />
                    </div >
                </Content>
            </div >
        )
    }
}

export default TableView