import React, {useState} from 'react'
import NavItem from './NavItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

function NavItems({ title, icon, children, role }) {

    const auth = useAuthUser()
    const [open, setOpen] = useState(false)

    const handleOpen = ()=>{
        setOpen(!open)
    }

    const collapseList = {
        marginLeft: '10px',
        fontSize: '1.2em'
    }

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
    <>    

        {
            auth?.role && role && (auth.role === role || auth.role === 'admin' || auth.role === 'user')
            &&

            <>

        
                <ListItemButton sx={listItemButton} onClick={handleOpen}>
                    <ListItemIcon sx={listItemIcon}>
                        {icon}
                    </ListItemIcon>
                    <ListItemText sx={listItemText} primary={title} />
                    {open ? <FaAngleUp /> : <FaAngleDown />}
                </ListItemButton>
                <Collapse in={open}>
                    <List sx={collapseList}>

                        {
                            children.map((child)=>{
                                return <NavItem key={child.title} path={`${child.path}`} title={child.title} icon={child.icon} role={role} />
                            })
                        }
                        
                    </List>
                </Collapse>

            </>
        }

    </>
  )
}

export default NavItems