import React, {useEffect, useState} from 'react'
import { useStateContext } from '../context/ContextProvider'
import IconButton from '@mui/material/IconButton'
import { Outlet, useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import Sidebar from './Sidebar'
import { FaAlignLeft } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import Popover from '@mui/material/Popover';
import { Box, Button } from '@mui/material';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

function Layout() {
    
    const auth = useAuthUser()
    const navigate = useNavigate();

    const {activeMenu, setActiveMenu, screenSize, setScreenSize} = useStateContext()

    const handleClick = ()=>{
        setActiveMenu(prevState => !prevState)
    }

    const [anchorEl, setAnchorEl] = useState(null)

    useEffect(()=>{
        const handleResize = ()=>{
            setScreenSize(window.innerWidth)
        }
        
        window.addEventListener( 'resize', handleResize )

        handleResize();

        return(()=>{
            window.removeEventListener( 'resize', handleResize )
        })

        }, [])

        useEffect(()=>{

        if( screenSize <= 900 ){
            setActiveMenu(false)
        }else{
            setActiveMenu(true)
        }

    }, [screenSize])

    const handleProfileClick = (event)=>{
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget)
    }

    const handleProfileClose = ()=>{
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)

    const signOut = useSignOut()

    const handleLogOut = ()=>{
        signOut();
        navigate('login')
    }

  return (
    
    <div className="page flex">
        <div className={ activeMenu ? "sidebar active" : "sidebar" }>
            <Sidebar />
        </div>
        <div className="main-content">
            
            <nav className='nav'>
                <IconButton>
                    { (activeMenu) ? <IoCloseSharp onClick={()=>handleClick()} /> : <FaAlignLeft onClick={()=>handleClick()} /> }
                </IconButton>
                <div className='flex align-items-center'>
                    <p className="user">Hello {auth && auth.user}</p>
                    <div onClick={handleProfileClick}>
                        <UserProfile />
                    </div>
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleProfileClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                       <Box sx={{width: '200px', padding: '1em', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Button onClick={handleLogOut} variant="contained">Log Out</Button>
                       </Box>
                    </Popover>
                </div>
            </nav>

            <div className="body-wrapper">
                <RequireAuth fallbackPath="/login">
                    <Outlet />
                
                </RequireAuth>
            </div>

        </div>
    </div>
  )
}

export default Layout