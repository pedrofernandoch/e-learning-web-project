import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import logo from '../../assets/amdocsGif.gif'

export default function Copyright() {
  return (
    <>
      <Typography variant="body2" color="textSecondary" align="center">
        <img src={logo} alt="Logo" width="350px"/>
        <br/>
        <br/>
        {'Copyright © '}
        <Link color="inherit" href="https://www.amdocs.com/">
        AMDOCS (BRASIL) LIMITADA
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </>
  );
}