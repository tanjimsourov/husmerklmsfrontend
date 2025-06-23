import React, { useEffect, useState } from 'react';
import { useStateContext } from '../context/ContextProvider';
import IconButton from '@mui/material/IconButton';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaAlignLeft } from 'react-icons/fa';
import { IoCloseSharp, IoSettingsSharp } from 'react-icons/io5';
import Popover from '@mui/material/Popover';
import { Box, Button, Avatar, Typography } from '@mui/material';
import useAuthStore from '../store/authStore';
import { motion } from 'framer-motion';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme for consistent styling
const theme = createTheme({
  palette: {
    primary: {
      main: '#4361ee',
    },
    secondary: {
      main: '#3a0ca3',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { activeMenu, setActiveMenu, screenSize, setScreenSize } = useStateContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setActiveMenu(prevState => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleLogOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display: 'flex',
        width: '100vw',
        maxWidth: '100%',
        overflow: 'hidden',
        height: '100vh'
      }}>
        <motion.div
          className={activeMenu ? "sidebar active" : "sidebar"}
          initial={{ x: -300 }}
          animate={{ x: activeMenu ? 0 : -300 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            width: '280px',
            flexShrink: 0,
            height: '100%',
            overflowY: 'auto',
            background: 'linear-gradient(135deg, #3a0ca3 0%, #4361ee 100%)',
            boxShadow: '4px 0 10px rgba(0, 0, 0, 0.1)',
            color: 'white' // This will ensure text is visible against the dark background
          }}
        >
          <Sidebar />
        </motion.div>

        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: 'calc(100% - 280px)',
          maxWidth: '100%',
          overflow: 'hidden',
          height: '100vh'
        }}>
          <motion.nav
            className='nav'
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              zIndex: 10,
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <IconButton>
              {activeMenu ? (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IoCloseSharp onClick={handleClick} />
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaAlignLeft onClick={handleClick} />
                </motion.div>
              )}
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="user-greeting"
              >
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  Hello, {user || 'User'}
                </Typography>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleProfileClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ cursor: 'pointer', marginLeft: '15px' }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: 'primary.main',
                    transition: 'all 0.3s ease',
                    transform: isHovered ? 'rotate(10deg)' : 'rotate(0)',
                    boxShadow: isHovered ? '0 4px 8px rgba(0,0,0,0.2)' : 'none'
                  }}
                >
                  {user ? user.charAt(0).toUpperCase() : 'U'}
                </Avatar>
              </motion.div>

              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleProfileClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <Box sx={{
                  width: '200px',
                  padding: '1.5em',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1em'
                }}>
                  <Button
                    startIcon={<IoSettingsSharp />}
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate('/settings')}
                  >
                    Settings
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogOut}
                    sx={{
                      boxShadow: 'none',
                      '&:hover': {
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    Log Out
                  </Button>
                </Box>
              </Popover>
            </Box>
          </motion.nav>

          <Box
            className="body-wrapper"
            sx={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Layout;