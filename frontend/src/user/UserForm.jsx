import React, { Component } from 'react'
import { Field } from 'redux-form'
import Grid from '@mui/material/Grid'
import { renderTextField  } from '../utils/fieldRendering'

class UserForm extends Component {

    render() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Field component={renderTextField} name="name" label="Name" margin="dense" fullWidth/>
                </Grid>
                <Grid item xs={6}>
                    <Field component={renderTextField} name="email" label="Email" margin="dense" fullWidth/>
                </Grid>
                <Grid item xs={6}>
                    <Field component={renderTextField} name="password" label="Password" margin="dense" type="password" fullWidth/>
                </Grid>
                <Grid item xs={6}>
                    <Field component={renderTextField} name="adress" label="Adress" margin="dense" fullWidth/>
                </Grid>
                <Grid item xs={6}>
                    <Field component={renderTextField} name="phone" label="Phone" margin="dense" fullWidth/>
                </Grid>
                <Grid item xs={6}>
                    <Field component={renderTextField} name="uploadPhoto" label="Photo URL" margin="dense" fullWidth/>
                </Grid>
            </Grid>
        )
    }
}

export default UserForm