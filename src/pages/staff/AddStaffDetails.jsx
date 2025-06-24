import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../../API/base_url';
import useAuthStore from '../../store/authStore';

// MUI Components
import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
  Box,
  Fade,
  Slide,
  Avatar,
  Grid,
  Paper
} from '@mui/material';

// Icons
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';

// Animation
import { keyframes } from '@emotion/react';
import { Header } from '../../components';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AddStaffDetails = () => {
  const navigate = useNavigate();
  const { id: userId, school: schoolId } = useParams();
  const [loading, setLoading] = useState(false);
  const { token } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      fullname: '',
      address: '',
      designation: '',
      school: parseInt(schoolId),
      user: parseInt(userId)
    },
    validationSchema: Yup.object().shape({
      fullname: Yup.string().required('Full name is required'),
      address: Yup.string().required('Address is required'),
      designation: Yup.string().required('Designation is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values)
      try {
        setLoading(true);

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const response = await axios.post(`${BASE_URL}/api/add-staff-detail`, values, { headers });

        toast.success('Staff details added successfully!');
        console.log('Staff details added:', response.data);

        setTimeout(() => {
          navigate('/dashboard/staffs');
        }, 1500);

        resetForm();
      } catch (error) {
        console.error('Error:', error);
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <Fade in={true} timeout={500}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
        animation: `${gradientBackground} 15s ease infinite`,
        p: 2
      }}>
        <Slide in={true} direction="up" timeout={500}>
          <Card sx={{
            maxWidth: 800,
            width: '100%',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.25)',
            animation: `${pulse} 3s infinite ease-in-out`,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <CardContent>
              <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress color="secondary" />
              </Backdrop>

              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />

              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Avatar sx={{
                  bgcolor: 'primary.main',
                  width: 60,
                  height: 60,
                  mx: 'auto',
                  mb: 2,
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
                }}>
                  <PersonAddAlt1Icon fontSize="large" />
                </Avatar>
                <Header title="Add Staff Details" noBtn={true} />
                <Typography variant="subtitle1" color="text.secondary">
                  Please fill in the staff member's details
                </Typography>
              </Box>

              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper elevation={0} sx={{
                      p: 2,
                      borderRadius: 3,
                      background: 'rgba(25, 118, 210, 0.05)'
                    }}>
                      <TextField
                        fullWidth
                        name="fullname"
                        label="Full Name"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullname}
                        error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                        helperText={formik.touched.fullname && formik.errors.fullname}
                        InputProps={{
                          startAdornment: (
                            <PersonAddAlt1Icon color="action" sx={{ mr: 1 }} />
                          )
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: 'rgba(0, 0, 0, 0.1)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                            },
                          }
                        }}
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Paper elevation={0} sx={{
                      p: 2,
                      borderRadius: 3,
                      background: 'rgba(25, 118, 210, 0.05)'
                    }}>
                      <TextField
                        fullWidth
                        name="address"
                        label="Address"
                        variant="outlined"
                        multiline
                        rows={3}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                        InputProps={{
                          startAdornment: (
                            <HomeIcon color="action" sx={{ mr: 1, mt: 1, alignSelf: 'flex-start' }} />
                          )
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: 'rgba(0, 0, 0, 0.1)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                            },
                          }
                        }}
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Paper elevation={0} sx={{
                      p: 2,
                      borderRadius: 3,
                      background: 'rgba(25, 118, 210, 0.05)'
                    }}>
                      <TextField
                        fullWidth
                        name="designation"
                        label="Designation"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.designation}
                        error={formik.touched.designation && Boolean(formik.errors.designation)}
                        helperText={formik.touched.designation && formik.errors.designation}
                        InputProps={{
                          startAdornment: (
                            <WorkIcon color="action" sx={{ mr: 1 }} />
                          )
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '& fieldset': {
                              borderColor: 'rgba(0, 0, 0, 0.1)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                            },
                          }
                        }}
                      />
                    </Paper>
                  </Grid>
                </Grid>

                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 4,
                  mb: 2
                }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    startIcon={<PersonAddAlt1Icon />}
                    sx={{
                      px: 6,
                      py: 1.5,
                      borderRadius: 3,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      background: 'linear-gradient(45deg, #1976d2 0%, #2196f3 100%)',
                      boxShadow: '0 4px 8px rgba(33, 150, 243, 0.3)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 12px rgba(33, 150, 243, 0.4)',
                        background: 'linear-gradient(45deg, #1565c0 0%, #1e88e5 100%)',
                      },
                      transition: 'all 0.3s ease',
                      minWidth: 200
                    }}
                  >
                    {loading ? 'Saving...' : 'Save Details'}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Slide>
      </Box>
    </Fade>
  );
};

export default AddStaffDetails;