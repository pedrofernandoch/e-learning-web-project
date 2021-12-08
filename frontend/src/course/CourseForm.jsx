import React, { Component } from 'react'
import { Field } from 'redux-form'
import Grid from '@mui/material/Grid'
import { renderTextField  } from '../utils/fieldRendering'

class CourseForm extends Component {

    render() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Field component={renderTextField} name="name" label="Name" margin="dense" fullWidth/>
                </Grid>
                <Grid item xs={2}>
                    <Field component={renderTextField} name="fees" label="Fees" margin="dense" fullWidth/>
                </Grid>
                <Grid item xs={4}>
                    <Field component={renderTextField} name="resource" label="Resource URL" margin="dense" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <Field component={renderTextField} name="description" label="Description" margin="dense" fullWidth multiline maxRows={6}/>
                </Grid>
            </Grid>
        )
    }
}

export default CourseForm