import React, { Component } from 'react'
import { Field } from 'redux-form'
import Grid from '@mui/material/Grid'
import { renderTextField  } from '../utils/fieldRendering'

class AdminForm extends Component {

    render() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <Field component={renderTextField} name="name" label="Name" margin="dense" fullWidth/>
                </Grid>
                <Grid item xs={4}>
                    <Field component={renderTextField} name="email" label="Email" margin="dense" fullWidth/>
                </Grid>
                <Grid item xs={3}>
                    <Field component={renderTextField} name="password" label="Password" margin="dense" type="password" fullWidth/>
                </Grid>
            </Grid>
        )
    }
}

export default AdminForm