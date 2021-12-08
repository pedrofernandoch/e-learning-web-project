import TextField from '@mui/material/TextField'
import { baseApiUrl } from '../utils/systemConstans'
import axios from 'axios'

const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
    <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
)

const promiseOptions = (inputValue, fieldToShow) => {
    return new Promise(resolve => {
        const url = `users?search=${inputValue}`
        axios.get(`${baseApiUrl}/${url}`)
            .then(payload => {
                resolve(payload.data.map(obj => {
                    const option = { value: obj, label: obj[fieldToShow] || `It does not have ${fieldToShow}`}
                    return option
                }))
            })
    })
}

const defaultAsyncSelectOption = [{ value: {}, label: '- Clean selection -' }]


export {
    renderTextField, promiseOptions, defaultAsyncSelectOption
}