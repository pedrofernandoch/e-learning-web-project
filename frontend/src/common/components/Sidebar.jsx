import React from 'react'
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CallIcon from '@mui/icons-material/Call';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ListItemButton from './ListItemButton';

export const listItems = (
  <div>
    <ListItemButton text="Courses" path="/">
      <DashboardIcon />
    </ListItemButton>
    <ListItemButton text="Users" path="users">
      <AccountCircleIcon />
    </ListItemButton>
    <ListItemButton text="Contacts" path="contacts">
      <CallIcon />
    </ListItemButton>
    <ListItemButton text="Feedbacks" path="feedbacks">
      <FeedbackIcon />
    </ListItemButton>
    <ListItemButton text="Admins" path="admins">
      <AdminPanelSettingsIcon />
    </ListItemButton>
  </div>
);

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export default function Menu(props) {
  return (
    <Drawer variant="permanent" open={props.open}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1], }}>
        <IconButton onClick={props.toggleDrawer}><ChevronLeftIcon /></IconButton>
      </Toolbar>
      <Divider />
      <List>{listItems}</List>
    </Drawer>
  );
}