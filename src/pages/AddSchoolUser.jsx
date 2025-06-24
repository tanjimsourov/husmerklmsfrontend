import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../API/base_url';
import useAuthStore from '../store/authStore';
import useUserStore from '../store/userStore';

// MUI Components
import {
    Backdrop,
    Button,
    Card,
    CardContent,
    CircularProgress,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    Box,
    Fade,
    Slide,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Animation
import { keyframes } from '@emotion/react';
import { Header } from '../components';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const AddSchoolUser = () => {
    const navigate = useNavigate();
    const { school_id, token } = useAuthStore();
    const { setUserId, setSchoolId } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: '',
            school: school_id,
            phone: '',
            isSchoolStaff: false,
            isStudent: false,
            isTeacher: false,
            password: '',
            email: ''
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required('Username is required'),
            phone: Yup.string()
                .required('Phone number is required')
                .matches(/^[0-9]+$/, "Must be only digits")
                .min(11, 'Must be exactly 11 digits')
                .max(11, 'Must be exactly 11 digits'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string()
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters')
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);

                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };

                const response = await axios.post(`${BASE_URL}/api/add-school-user`, values, { headers });

                toast.success('User created successfully!');
                console.log('User created:', response.data);

                // Store user data
                setUserId(response.data.id);
                setSchoolId(response.data.school);

                // Navigate based on role
                setTimeout(() => {
                    if (values.isSchoolStaff) {
                        navigate(`/dashboard/staffs/addStaffDetails/${response.data.id}/${response.data.school}`);
                    } else if (values.isTeacher) {
                        navigate(`/addTeacherDetails/${response.data.id}/${response.data.school}`);
                    } else if (values.isStudent) {
                        navigate(`/addStudentDetails/${response.data.id}/${response.data.school}`);
                    }
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

    const handleRoleChange = (event) => {
        const role = event.target.value;
        formik.setValues({
            ...formik.values,
            isSchoolStaff: role === 'staff',
            isStudent: role === 'student',
            isTeacher: role === 'teacher'
        });
    };

    const getSelectedRole = () => {
        if (formik.values.isSchoolStaff) return 'staff';
        if (formik.values.isStudent) return 'student';
        if (formik.values.isTeacher) return 'teacher';
        return '';
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Fade in={true} timeout={500}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                height: '100vh',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                p: 2
            }}>
                <Slide in={true} direction="up" timeout={500}>
                    <Card sx={{
                        maxWidth: 800,
                        width: '100%',
                        borderRadius: 4,
                        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
                        animation: `${pulse} 3s infinite ease-in-out`,
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        overflowY: 'auto',
                        maxHeight: '95vh'
                    }}>
                        <CardContent>
                            <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                                <CircularProgress color="primary" />
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
                            />

                            <Header title="Add School User" noBtn={true} />

                            <form onSubmit={formik.handleSubmit}>
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                                    gap: 3,
                                    mt: 3
                                }}>
                                    <TextField
                                        fullWidth
                                        name="username"
                                        label="Username"
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.username}
                                        error={formik.touched.username && Boolean(formik.errors.username)}
                                        helperText={formik.touched.username && formik.errors.username}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                            }
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        name="email"
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                            }
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        name="phone"
                                        label="Phone Number"
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone}
                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                        helperText={formik.touched.phone && formik.errors.phone}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                            }
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                            }
                                        }}
                                    />

                                    <FormControl component="fieldset" sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                                        <FormLabel component="legend" sx={{ mb: 1, color: 'text.primary', fontWeight: 'medium' }}>
                                            Select Role
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            aria-label="role"
                                            name="role"
                                            value={getSelectedRole()}
                                            onChange={handleRoleChange}
                                            sx={{ justifyContent: 'space-between' }}
                                        >
                                            <FormControlLabel
                                                value="staff"
                                                control={<Radio color="primary" />}
                                                label={
                                                    <Typography variant="body1" sx={{
                                                        color: formik.values.isSchoolStaff ? 'primary.main' : 'text.secondary',
                                                        fontWeight: formik.values.isSchoolStaff ? 'bold' : 'normal'
                                                    }}>
                                                        School Staff
                                                    </Typography>
                                                }
                                                sx={{
                                                    px: 2,
                                                    py: 1,
                                                    borderRadius: 2,
                                                    bgcolor: formik.values.isSchoolStaff ? 'primary.light' : 'transparent',
                                                    mr: 1
                                                }}
                                            />
                                            <FormControlLabel
                                                value="teacher"
                                                control={<Radio color="primary" />}
                                                label={
                                                    <Typography variant="body1" sx={{
                                                        color: formik.values.isTeacher ? 'primary.main' : 'text.secondary',
                                                        fontWeight: formik.values.isTeacher ? 'bold' : 'normal'
                                                    }}>
                                                        Teacher
                                                    </Typography>
                                                }
                                                sx={{
                                                    px: 2,
                                                    py: 1,
                                                    borderRadius: 2,
                                                    bgcolor: formik.values.isTeacher ? 'primary.light' : 'transparent',
                                                    mr: 1
                                                }}
                                            />
                                            <FormControlLabel
                                                value="student"
                                                control={<Radio color="primary" />}
                                                label={
                                                    <Typography variant="body1" sx={{
                                                        color: formik.values.isStudent ? 'primary.main' : 'text.secondary',
                                                        fontWeight: formik.values.isStudent ? 'bold' : 'normal'
                                                    }}>
                                                        Student
                                                    </Typography>
                                                }
                                                sx={{
                                                    px: 2,
                                                    py: 1,
                                                    borderRadius: 2,
                                                    bgcolor: formik.values.isStudent ? 'primary.light' : 'transparent'
                                                }}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        disabled={loading}
                                        sx={{
                                            px: 6,
                                            py: 1.5,
                                            borderRadius: 2,
                                            fontSize: '1rem',
                                            fontWeight: 'bold',
                                            background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                                            boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 5px 8px 2px rgba(33, 150, 243, .4)',
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        Create User
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

export default AddSchoolUser;