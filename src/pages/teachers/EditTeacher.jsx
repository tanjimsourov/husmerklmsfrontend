import { Backdrop, Box, Button, Card, CardContent, CircularProgress, Stack, TextField, TextareaAutosize, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import useApi from '../../hooks/useApi';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { ToastContainer, toast } from 'react-toastify';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CloudUpload } from '@mui/icons-material';
import axios from 'axios';

// const url = 'http://localhost:2020/api/v1/teachers/get-teacher/';

const EditTeacher = () => {
    const { id } = useParams('id');
    const url = useMemo(() => `https://husmerklmsbackend.onrender.com/api/v1/teachers/get-teacher/${id}`, [id]);
    const { data, isLoading, error } = useApi(`${url}`);
    const [loading, setLoading] = useState(false)
    const [photoURL, setPhotoURL] = useState();
    const authHeader = useAuthHeader();

   const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            dateOfBirth: null,
            phone: '',
            profile: '',
            userName: '',
            religion: '',
            address: '',
            gender: "male",
            bloodGroup: ''
        },
        validationSchema: Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email('Invalid email'),
            password: Yup.string(),
            dateOfBirth: Yup.date(),
            phone: Yup.string(),
            profile: Yup.string(),
            userName: Yup.string(),
            religion: Yup.string(),
            address: Yup.string(),
            gender: Yup.string(),
            bloodGroup: Yup.string()
        }),

        enableReinitialize: true,
        onSubmit: async ( values ) => {
            try{
                setLoading(true)
                const headers = {
                    "Authorization": authHeader,
                    'Content-Type': 'multipart/form-data',
                }
                
                const response = await axios.put(`https://husmerklmsbackend.onrender.com/api/v1/teachers/teacher-update/${id}`, values, {headers: headers});

                console.log(`${url}/update/${id}`)

                console.log('Registration successful:', response.data);
                toast(response.data.message)

                if (response.status === 201) {
                    // Reset the form after successful submission
                    setLoading(false)
                    
                } else{
                    setLoading(false)
                }


            }catch(error){
                console.error('Error:', error);
                toast(error.message)
                setLoading(false)
            }finally{
                setLoading(false)
            }
        }
   })

   useEffect(()=>{
        if(!isLoading && data){
            formik.setValues({
                name: data.name,
                email: data.email,
                password: data.password,
                dateOfBirth: data.dateOfBirth,
                phone: data.phone,
                profile: data.profile,
                userName: data.userName,
                religion: data.religion,
                address: data.address,
                bloodGroup: data.bloodGroup
            })
        }
   }, [isLoading])

    const handleProfileChange = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue("profile", file);
        setPhotoURL(URL.createObjectURL(file));
    };

    return (
        <div>
            <Card>
                {
                    loading &&
                    <Backdrop open={loading}>
                        <CircularProgress />
                    </Backdrop>
                }
                {
                    toast !== '' && <ToastContainer />
                }
                <CardContent>
                    {!isLoading && !error && data && (
                        
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-4">
                                            <Stack spacing={2}>

                                                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>

                                                    {
                                                        
                                                        <img 
                                                            style={{
                                                                width: 210,
                                                                aspectRatio: '1/1',
                                                                background: '#f4f4f4'
                                                            }}
                                                            alt={'profile picture'}
                                                            src={ photoURL ? photoURL : `https://husmerklmsbackend.onrender.com/api/v1/uploads/${formik.values.profile}`}
                                                        />
                                                        
                                                    }
                                                    <Button 
                                                        component="label"
                                                        variant="contained"
                                                        tabIndex={-1}
                                                        startIcon={<CloudUpload />}
                                                    >
                                                        Upload Profile
                                                        
                                                        <input
                                                            accept="image/*"
                                                            name="profile"
                                                            id="contained-button-file"
                                                            multiple
                                                            type="file"
                                                            onChange={(event) => {
                                                                formik.setFieldValue("profile", event.target.files[0]);
                                                                handleProfileChange(event);
                                                            }}
                                                            style={{ display: 'none' }}
                                                        />
                                                    </Button>
                                                </Box>   
                                                <div>
                                                    <TextareaAutosize 
                                                        placeholder="Address"
                                                        minRows={3}
                                                        name='address'
                                                        value={formik.values.address}
                                                        onChange={formik.handleChange}
                                                    />
                                                </div>                                         
                                            </Stack>
                                        </div>
                                        <div className="col-xs-12 col-sm-8">
                                            <div className="row">

                                                <div className="form-field col-xs-12 col-sm-6">
                                                    <TextField
                                                        name="name"
                                                        label="Name"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.name}
                                                        error={formik.errors.name && formik.touched.name}
                                                        helperText={formik.errors.name && formik.touched.name && formik.errors.name}
                                                    />
                                                </div>

                                                <div className="form-field col-xs-12 col-sm-6">
                                                    <TextField
                                                        name="phone"
                                                        label="Phone"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.phone}
                                                        error={formik.errors.phone && formik.touched.phone}
                                                        helperText={formik.errors.phone && formik.touched.phone && formik.errors.phone}
                                                    />
                                                </div>

                                                <div className="form-field col-xs-12 col-sm-6">
                                                    <TextField
                                                        name="email"
                                                        label="Email"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.email}
                                                        error={formik.errors.email && formik.touched.email}
                                                        helperText={formik.errors.email && formik.touched.email && formik.errors.email}
                                                    />
                                                </div>
                                                <div className="form-field col-xs-12 col-sm-6">
                                                    <TextField
                                                        name="userName"
                                                        label="User Name"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.userName}
                                                        error={formik.errors.userName && formik.touched.userName}
                                                        helperText={formik.errors.userName && formik.touched.userName && formik.errors.userName}
                                                    />
                                                </div>
                                                <div className="form-field col-xs-12 col-sm-6">
                                                    <TextField
                                                        name="bloodGroup"
                                                        label="Blood Group"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.bloodGroup}
                                                        error={formik.errors.bloodGroup && formik.touched.bloodGroup}
                                                        helperText={formik.errors.bloodGroup && formik.touched.bloodGroup && formik.errors.bloodGroup}
                                                    />
                                                </div>
                                                <div className="form-field col-xs-12 col-sm-6">
                                                    <TextField
                                                        name="religion"
                                                        label="Religion"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.religion}
                                                        error={formik.errors.religion && formik.touched.religion}
                                                        helperText={formik.errors.religion && formik.touched.religion && formik.errors.religion}
                                                    />
                                                </div>

                                                <div className="form-field col-xs-12 col-sm-6">
                                                        <FormControl fullWidth>
                                                            <InputLabel id="gender_label_id">Gender</InputLabel>
                                                            <Select
                                                                name="gender"
                                                                labelId="gender_label_id"
                                                                label="Gender"
                                                                id="gender_label_id"
                                                                value={formik.values.gender}
                                                                onChange={formik.handleChange}
                                                            >
                                                                <MenuItem value={'male'}>Male</MenuItem>
                                                                <MenuItem value={'female'}>Female</MenuItem>
                                                                <MenuItem value={'other'}>Other</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                </div>

                                                <div className="form-field col-xs-12 col-sm-6">
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer components={['DatePicker']}>
                                                            
                                                            <DateField 
                                                                name="dateOfBirth" 
                                                                label="Date Of Birth" 
                                                                value={dayjs(formik.values.dateOfBirth)}
                                                                onChange={(newValue) => {
                                                                    const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
                                                                    formik.setFieldValue('dateOfBirth', formattedDate);
                                                                }}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </div>

                                            </div>
                                        </div>
                                        
                                    </div>
                                    <Button sx={{ marginTop: '20px' }} type="submit" variant="contained">
                                        Update
                                    </Button>
                                </form>
                            
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default EditTeacher;
