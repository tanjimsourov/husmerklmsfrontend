import React, {useState} from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Backdrop, Button, FormControl, Stack, TextField, TextareaAutosize } from '@mui/material';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import {Box} from '@mui/material';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';
import { CloudUpload } from '@mui/icons-material';
import useApi from '../../hooks/useApi';

const url = 'https://api.ibnhaysam.com/api/v1/classes/get-class';

function AddStudent() {
    const authHeader = useAuthHeader()
    const [photoURL, setPhotoURL] = useState('');
    const [loading, setLoading] = useState(false)

    const {data: classLists, isLoading, error} = useApi(url);

    const formik = useFormik({
        initialValues: {
            name: '',
            profile: '',
            address: '',
            dateOfBirth: null,
            gender: '',
            bloodGroup: '',
            email: '',
            phone: '',
            country: 'Bangladesh',
            userName: '',
            password: '',
            fatherName: '',
            motherName: '',
            fatherProfession: '',
            motherProfession: '',
            fatherPhone: '',
            fatherNID: '',
            motherPhone: '',
            motherNID: '',
            classLevel: '',
            section: '',
            studentRoll: ''
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(),
            profile: Yup.string(),
            address: Yup.string(),
            dateOfBirth: Yup.date(),
            gender: Yup.string(),
            bloodGroup: Yup.string(),
            email: Yup.string().email('Invalid email format'),
            phone: Yup.string(),
            country: Yup.string(),
            userName: Yup.string(),
            password: Yup.string(),
            fatherName: Yup.string(),
            motherName: Yup.string(),
            fatherProfession: Yup.string(),
            motherProfession: Yup.string(),
            fatherPhone: Yup.string(),
            fatherNID: Yup.string(),
            motherPhone: Yup.string(),
            motherNID: Yup.string(),
            classLevel: Yup.string(),
            section: Yup.string(),
            studentRoll: Yup.string()
          }),
          
        onSubmit: async (values, {resetForm}) => {

            try {
                setLoading(true)
                        
                const headers = {
                    "Authorization": authHeader,
                    'Content-Type': 'multipart/form-data',
                }

                console.log('values: ', values)
                
                const response = await axios.post('https://api.ibnhaysam.com/api/v1/students//student-register', values, {headers: headers});

                toast.success(response.data.message)

                if (response.status === 200) {
                    // Reset the form after successful submission
                    setLoading(false)
                    resetForm();
                    setPhotoURL()
                } else{
                    setLoading(false)
                    toast.error(response.data.message)
                }
                
            } catch (error) {
                // Handle errors
                console.error('Error:', error);
                toast(error.response.data.message)
                setLoading(false)
            }
        },
    });

    const handleProfileChange = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue("profile", file);
        setPhotoURL(URL.createObjectURL(file));
    };

  return (
    <div>
    
        {
            <Backdrop open={loading}><CircularProgress /></Backdrop>
        }
        {
            <ToastContainer />
        }

        <Card>
            <CardContent>
                <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                    <div className="row">

                        <div className="col-xs-12 col-sm-4">
                            <Stack spacing={2}>
                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>

                                <div className='teacher-profile-wrapper'>
                                    
                                    {
                                        formik.values.profile &&

                                        <img 
                                            style={{
                                                width: '100%'
                                            }}
                                            alt='profile'
                                            src={ photoURL ? photoURL : `https://api.ibnhaysam.com/api/v1/uploads/${formik.values.profile}`}
                                        />
                                        // <FaRegCircleUser />
                                        
                                    }


                                </div>

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
                                    name="address"
                                    onChange={formik.handleChange}
                                    value={formik.values.address}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={ formik.errors.address}
                                />
                            </div>                             
                            </Stack>
                        </div>

                        <div className="col-xs-12 col-sm-8">
                        
                            <div className="title">Personal Information</div>

                            <div className="form-group row">

                                <div className="form-field col-xs-12 col-sm-4">

                                    <TextField
                                        name="name"
                                        label="Name"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={ formik.errors.name}
                                        onBlur={formik.handleBlur}
                                    />

                                </div>

                                <div className="form-field col-xs-12 col-sm-4 ">

                                    <FormControl fullWidth>
                                        <InputLabel id="s_class_label_id">Class</InputLabel>

                                        <Select 
                                            labelId="s_class_label_id"
                                            label="Student class"
                                            id="s_class"
                                            name="classLevel"
                                            value={formik.values.classLevel}
                                            onChange={formik.handleChange}
                                            error={formik.touched.classLevel && Boolean(formik.errors.classLevel)}
                                            helperText={formik.errors.classLevel}
                                        >
                                            {!isLoading && !error && classLists && classLists.map((item) => (
                                                <MenuItem key={item._id} value={item._id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                    </FormControl>

                                </div>

                                <div className="form-field col-xs-12 col-sm-4 ">
                                    
                                
                                        <FormControl fullWidth>
                                            
                                            <InputLabel id="select-class-section">Section</InputLabel>
                                            <Select
                                                labelId="select-class-section"
                                                name="section"
                                                label="Section"
                                                value={formik.values.section}
                                                onChange={formik.handleChange}
                                                error={formik.touched.section && Boolean(formik.errors.section)}
                                                helperText={formik.errors.section}
                                            >
                                                {
                                                !isLoading && !error && classLists && formik.values.classLevel &&
                                                    classLists.find(classList => classList._id === formik.values.classLevel).sections.map((section, idx)=>{
                                                        return <MenuItem 
                                                        key={section._id}
                                                        value={section._id}
                                                        >{section.name}</MenuItem>
                                                    })
                                                }
                                                
                                            </Select>
                                            
                                        </FormControl>

                                </div>

                                <div className="form-field col-xs-12 col-sm-4 ">

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            
                                            <DateField 
                                                name="dateOfBirth" 
                                                label="Date Of Birth" 
                                                onChange={(newValue) => {
                                                    const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
                                                    formik.setFieldValue('dateOfBirth', formattedDate);
                                                }}
                                                helperText={formik.errors.dateOfBirth}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>

                                <div className="form-field col-xs-12 col-sm-4 ">
                                        <FormControl fullWidth>
                                            <InputLabel id="gender_label_id">Gender</InputLabel>
                                            <Select
                                                name="gender"
                                                labelId="gender_label_id"
                                                label="Gender"
                                                id="gender_label_id"
                                                value={formik.values.gender}
                                                onChange={formik.handleChange}
                                                helperText={formik.errors.gender}
                                                error={formik.touched.gender && Boolean(formik.errors.gender)}
                                            >
                                                <MenuItem value={'Male'}>Male</MenuItem>
                                                <MenuItem value={'Female'}>Female</MenuItem>
                                                <MenuItem value={'other'}>Other</MenuItem>
                                            </Select>
                                        </FormControl>

                                </div>

                                <div className="form-field col-xs-12 col-sm-4">
                                    
                                    <TextField
                                        name="bloodGroup"
                                        label="Blood Group"
                                        value={formik.values.bloodGroup}
                                        onChange={formik.handleChange}
                                        error={formik.touched.bloodGroup && Boolean(formik.errors.bloodGroup)}
                                        onBlur={formik.handleBlur} 
                                        helperText={formik.errors.bloodGroup}                      
                                    />

                                </div>   

                                <div className="form-field col-xs-12 col-sm-4">
                                    
                                    <TextField
                                        name="studentRoll"
                                        label="Roll"
                                        value={formik.values.studentRoll}
                                        onChange={formik.handleChange}
                                        error={formik.touched.studentRoll && Boolean(formik.errors.studentRoll)}
                                        onBlur={formik.handleBlur} 
                                        helperText={formik.errors.studentRoll}                      
                                    />

                                </div>   

                                <div className="form-field col-xs-12 col-sm-4">

                                    <TextField
                                        name="email"
                                        label="Email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        onBlur={formik.handleBlur} 
                                        helperText={formik.errors.email}
                                    />

                                </div>

                                <div className="form-field col-xs-12 col-sm-4">
                                    
                                    <TextField
                                        name="phone"
                                        label="Phone"
                                        value={formik.values.phone}
                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                        onBlur={formik.handleBlur}  
                                        onChange={formik.handleChange}
                                        helperText={formik.errors.phone}
                                    />

                                </div>

                                <div className="form-field col-xs-12 col-sm-4">

                                    <TextField
                                        name="country"
                                        label="Country"
                                        value={formik.values.country}
                                        error={formik.touched.country && Boolean(formik.errors.country)}
                                        onBlur={formik.handleBlur}  
                                        onChange={formik.handleChange}
                                        helperText={formik.errors.country}
                                    />

                                </div>
                                
                                <div className="form-field col-xs-12 col-sm-4">

                                    <TextField
                                        name="userName"
                                        label="User Name"
                                        value={formik.values.userName}
                                        error={formik.touched.userName && Boolean(formik.errors.userName)}
                                        onBlur={formik.handleBlur}  
                                        onChange={formik.handleChange}
                                        helperText={formik.errors.userName}
                                    />

                                </div>
                                
                                <div className="form-field col-xs-12 col-sm-4">

                                    <TextField
                                        name="password"
                                        label="Password"
                                        value={formik.values.password}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        onBlur={formik.handleBlur}  
                                        onChange={formik.handleChange}
                                        helperText={formik.errors.password}
                                    />

                                </div>
                                                                                    
                            </div>
                                
                            <div className="title">Parent Information</div>

                            <div className="form-group row">
                                <div className="form-field col-xs-12 col-sm-4">

                                    <TextField
                                        name="fatherName"
                                        label="Father's Name"
                                        value={formik.values.fatherName}
                                        error={formik.touched.fatherName && Boolean(formik.errors.fatherName)}
                                        onBlur={formik.handleBlur}  
                                        onChange={formik.handleChange}
                                        helperText={formik.errors.fatherName}
                                    />

                                </div>
                                
                                <div className="form-field col-xs-12 col-sm-4">

                                    <TextField
                                        name="motherName"
                                        label="Mother's Name"
                                        value={formik.values.motherName}
                                        error={formik.touched.motherName && Boolean(formik.errors.motherName)}
                                        onBlur={formik.handleBlur}  
                                        onChange={formik.handleChange}
                                        helperText={formik.errors.motherName}
                                    />

                                </div>

                                <div className="form-field col-xs-12 col-sm-4">

                                    <TextField
                                        name="fatherProfession"
                                        label="Father's Profession"
                                        value={formik.values.fatherProfession}
                                        error={formik.touched.fatherProfession && Boolean(formik.errors.fatherProfession)}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}  
                                        helperText={formik.errors.fatherProfession}
                                    />

                                </div>
                                <div className="form-field col-xs-12 col-sm-4">
                                    
                                    <TextField
                                        name="motherProfession"
                                        label="Mother's Profession"
                                        value={formik.values.motherProfession}
                                        error={formik.touched.motherProfession && Boolean(formik.errors.motherProfession)}
                                        onBlur={formik.handleBlur}  
                                        onChange={formik.handleChange}
                                        helperText={formik.errors.motherProfession}
                                    />

                                </div>
                                <div className="form-field col-xs-12 col-sm-4">

                                    <TextField
                                        name="fatherPhone"
                                        label="Father Mobile No"
                                        value={formik.values.fatherPhone}
                                        error={formik.touched.fatherPhone && Boolean(formik.errors.fatherPhone)}
                                        onBlur={formik.handleBlur}  
                                        onChange={formik.handleChange}
                                        helperText={formik.errors.fatherPhone}
                                    />
                                </div>
                                <div className="form-field col-xs-12 col-sm-4">

                                    <TextField
                                        name="fatherNID"
                                        label="Father NID"
                                        value={formik.values.fatherNID}
                                        error={formik.errors.fatherNID}
                                        touched={formik.touched.fatherNID}
                                        onBlur={formik.handleBlur}  
                                        onChange={formik.handleChange}
                                        helperText={formik.errors.fatherNID}
                                    />
                                </div>
                                <div className="form-field col-xs-12 col-sm-4">

                                    <TextField
                                        name="motherPhone"
                                        label="Mother Mobile No"
                                        value={formik.values.motherPhone}
                                        error={formik.errors.motherPhone}
                                        touched={formik.touched.motherPhone}
                                        onBlur={formik.handleBlur}  
                                        onChange={formik.handleChange}
                                        helperText={formik.errors.motherPhone}
                                    />

                                </div>

                                <div className="form-field col-xs-12 col-sm-4">

                                    <TextField
                                        name="motherNID"
                                        label="Mother NID"
                                        value={formik.values.motherNID}
                                        error={formik.touched.motherNID && Boolean(formik.errors.motherNID)}
                                        onBlur={formik.handleBlur} 
                                        onChange={formik.handleChange} 
                                        helperText={formik.errors.motherNID}
                                    />
                                </div>

                                
                            </div>
                            <Button variant="contained" type="submit">
                                Submit
                            </Button>
                        </div>
                    
                    </div>
                </form>
            </CardContent>
        </Card>

    </div>
  )
}

export default AddStudent