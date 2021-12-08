import React, { forwardRef } from 'react'
import ArrowDownward from '@mui/icons-material/ArrowDownward'
import Check from '@mui/icons-material/Check'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import Clear from '@mui/icons-material/Clear'
import FilterList from '@mui/icons-material/FilterList'
import FirstPage from '@mui/icons-material/FirstPage'
import LastPage from '@mui/icons-material/LastPage'
import Remove from '@mui/icons-material/Remove'
import SaveAlt from '@mui/icons-material/SaveAlt'
import Search from '@mui/icons-material/Search'
import ViewColumn from '@mui/icons-material/ViewColumn'
import AddBox from '@mui/icons-material/AddBox'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import Edit from '@mui/icons-material/Edit'
import RefreshIcon from '@mui/icons-material/Refresh'
import { exportCsv } from '../common/export/export'
import { baseApiUrl } from './systemConstans'
import axios from 'axios'

const fileName = 'E-Learning_Data'
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}

const my_localization = {
  pagination: {
    labelDisplayedRows: '{from}-{to} of {count}',
  }
}

const options = {
  columnsButton: true,
  filtering: true,
  exportButton: { csv: true, pdf: false },
  pageSizeOptions: [5, 10, 20, 50],
  maxBodyHeight: '700px',
  debounceInterval: 1000
}

const getUrl = (query, allData = false, model) => {
  let url = `${baseApiUrl}/${model}?`
  if (query.orderBy) url += 'sort=' + query.orderBy.field + ',' + query.orderDirection + '&'
  if (allData) {
    url += 'per_page=all'
    url += '&page=' + 1
  } else {
    url += 'per_page=' + query.pageSize
    url += '&page=' + (query.page + 1)
  }
  url += '&search=' + query.search
  url += '&filters=' + query.filters.map(filter => {
    if (filter.column.field.includes('Date')) filter.value = filter.value.replaceAll('/', '-')
    return `${filter.column.field}:${filter.value}`
  })
  return url
}

const exportData = (columns, query, model) => {
  const url = getUrl(query, true, model)
  axios.get(url)
    .then(result => {
      exportCsv(columns, result.data.data, fileName)
    })
}

const addIcon = () => <AddBox style={{ color: '#ca0096' }} />
const editIcon = () => <Edit />
const deleteIcon = () => <DeleteOutline />
const refreshIcon = () => <RefreshIcon />

const beautifyData = (data) => data.forEach((value, index, array) => {
  if (value.registerDate) array[index].registerDate = value.registerDate.substring(0, 10).replaceAll('-', '/')
})

export {
  exportData, getUrl, addIcon, editIcon, deleteIcon, refreshIcon, my_localization, tableIcons, options, beautifyData
}