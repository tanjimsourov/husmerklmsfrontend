import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Link} from 'react-router-dom'

function NavItem({title, icon, path, role}) {

    const listItemIcon = {
    color: 'white',
    minWidth: 'auto',
    marginRight: '10px',
    };

    const listItemText = {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    };

    const listItemButton = {
    borderRadius: '0.375rem',
    '&:hover': {
        background: 'hsla(0, 0%, 100%, .25)',
    },
    color: 'white',
    };

  return (
    <ListItemButton component={Link} to={path} sx={listItemButton}>
        <ListItemIcon sx={listItemIcon}>
            {icon}
        </ListItemIcon>
        <ListItemText sx={listItemText} primary={title} />
    </ListItemButton>
  )
}

export default NavItem