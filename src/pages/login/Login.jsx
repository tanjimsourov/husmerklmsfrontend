import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import { Backdrop, Button, Card, CardContent, Stack, Typography, Divider, Box } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAuthStore from '../../store/authStore';
import BASE_URL from '../../API/base_url';

import Logo from '../../assets/imgs/logo.png';
import Bg from '../../assets/imgs/login-page-bg.jpg';

// Custom theme with modern font and posh colors
const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#5e35b1', // Rich purple
      light: '#9162e4',
      dark: '#280680',
    },
    secondary: {
      main: '#ff7043', // Vibrant orange
    },
    background: {
      default: '#f5f5f5',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          overflow: 'hidden',
        },
      },
    },
  },
});

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/api/login`, {
          email: values.email,
          password: values.password
        });
        
        if (response.data) {
          await login(response.data); // Ensure login completes before navigation
          toast.success("Login successful");
          navigate('/dashboard'); // Explicit navigation after successful login
        } else {
          toast.error("Invalid response from server");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed. Please try again.");
        console.error("Login error:", error);
      } finally {
        setLoading(false);
      }
    }
  });  

  return (
    <ThemeProvider theme={theme}>
      <Box 
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${Bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          overflow: 'hidden',
          position: 'fixed',
          top: 0,
          left: 0
        }}
      >
        {loading && (
          <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: '#fff' }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        
        <ToastContainer 
          position="top-right" 
          autoClose={5000} 
          toastStyle={{ borderRadius: '12px' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            width: '100%', 
            maxWidth: '450px',
            margin: '0 auto'
          }}
        >
          <Card sx={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(245,245,245,0.95) 100%)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            overflow: 'visible',
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: 'linear-gradient(90deg, #5e35b1 0%, #ff7043 100%)',
            }
          }}>
            <CardContent sx={{ padding: { xs: '2rem', sm: '3rem' } }}>
              <Stack spacing={4} alignItems="center">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ marginBottom: '1rem' }}
                >
                  <img 
                    src={Logo} 
                    alt="Logo" 
                    style={{ 
                      height: '80px', 
                      width: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                </motion.div>

                <Box textAlign="center">
                  <Typography 
                    variant="h5" 
                    component="h1"
                    sx={{ 
                      fontWeight: 700,
                      color: 'primary.dark',
                      mb: 1
                    }}
                  >
                    Husmerk EduTech Hub
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      letterSpacing: '0.5px'
                    }}
                  >
                    Sign in to access your dashboard
                  </Typography>
                </Box>

                <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
                  <Stack spacing={3} width="100%">
                    <TextField
                      name="email"
                      id="email"
                      label="Email Address"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      variant="outlined"
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          '& fieldset': {
                            borderColor: 'rgba(0, 0, 0, 0.1)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'primary.light',
                          },
                        },
                      }}
                    />

                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input
                        name="password"
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        fullWidth
                        sx={{
                          borderRadius: '12px',
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            '& fieldset': {
                              borderColor: 'rgba(0, 0, 0, 0.1)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.light',
                            },
                          },
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              sx={{ color: 'text.secondary' }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                    <Box textAlign="right">
                      <Button 
                        color="primary" 
                        size="small"
                        sx={{ 
                          fontWeight: 600,
                          textDecoration: 'underline',
                          textUnderlineOffset: '4px'
                        }}
                      >
                        Forgot password?
                      </Button>
                    </Box>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth
                        size="large"
                        sx={{
                          py: 1.5,
                          fontSize: '1rem',
                          background: 'linear-gradient(90deg, #5e35b1 0%, #9162e4 100%)',
                          boxShadow: '0 4px 20px rgba(94, 53, 177, 0.3)',
                          '&:hover': {
                            boxShadow: '0 6px 24px rgba(94, 53, 177, 0.4)',
                            background: 'linear-gradient(90deg, #4a2d8f 0%, #7d4fd9 100%)',
                          }
                        }}
                        disabled={loading}
                      >
                        {loading ? 'Signing In...' : 'Sign In'}
                      </Button>
                    </motion.div>
                  </Stack>
                </form>

                <Divider sx={{ width: '100%', my: 2 }} />

                <Typography 
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    textAlign: 'center',
                  }}
                >
                  Need an account?{' '}
                  <Button 
                    color="secondary" 
                    size="small"
                    sx={{ 
                      fontWeight: 600,
                      textDecoration: 'underline',
                      textUnderlineOffset: '4px'
                    }}
                  >
                    Request access
                  </Button>
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </ThemeProvider>
  );
}

export default Login;