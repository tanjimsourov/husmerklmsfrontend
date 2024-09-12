import React, {useState, useEffect, useRef} from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Backdrop, Button, FormControl, TextareaAutosize } from '@mui/material';
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
import useGetClasses from '../../hooks/useGetClasses';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs';
import useApi from '../../hooks/useApi';
import { useParams } from 'react-router-dom';
import { CloudUpload } from '@mui/icons-material';

const url = 'https://husmerklmsbackend.onrender.com/api/v1/students/get-student'

function EditSingleStudent() {

    const { id } = useParams()
    const authHeader = useAuthHeader()
    const userProfileRef = useRef();
    const [photoURL, setPhotoURL] = useState('');
    const [loading, setLoading] = useState(false)

    const { data, isLoading:isApiLoading, error:isApiError } = useApi(`${url}/${id}`)
    const {classLists, isLoading, error} = useGetClasses();

    const formik = useFormik({
        initialValues: {
            address: '',
            name: '',
            profile: '',
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
            studentRoll: '',
            address: ''
        },
        validationSchema: Yup.object().shape({
            address: Yup.string(),
            name: Yup.string(),
            profile: Yup.string(),
            dateOfBirth: Yup.string(),
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
            studentRoll: Yup.string(),
            address: Yup.string()
          }),
          enableReinitialize: true,
        onSubmit: async (values) => {

            try {
                setLoading(true)
                
                console.log("Values: ", values)
                        
                const headers = {
                    "Authorization": authHeader,
                    'Content-Type': 'multipart/form-data',
                }
                
                const response = await axios.put(`https://husmerklmsbackend.onrender.com/api/v1/students/student-update/${id}`, values, {headers: headers});

                console.log('Registration successful:', response.data);
                toast(response.data.message)

                if (response.status === 201) {
                    // Reset the form after successful submission
                    setLoading(false)
                    
                } else{
                    setLoading(false)
                }
                
            } catch (error) {
                // Handle errors
                console.error('Error:', error);
                toast(error.message)
                setLoading(false)
            }
        }
    });

    const handleProfileChange = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue("profile", file);
        setPhotoURL(URL.createObjectURL(file));
    };

    useEffect(() => {
        if (!isApiLoading && data) {
          formik.setValues({
            studentId: data.studentId || '',
            name: data.name || '',
            profile: data.profile || '',
            dateOfBirth: data.dateOfBirth || null,
            gender: data.gender || '',
            bloodGroup: data.bloodGroup || '',
            email: data.email || '',
            phone: data.phone || '',
            country: data.country || 'Bangladesh',
            userName: data.userName || '',
            password: data.password || '',
            fatherName: data.fatherName || '',
            motherName: data.motherName || '',
            fatherProfession: data.fatherProfession || '',
            motherProfession: data.motherProfession || '',
            fatherPhone: data.fatherPhone || '',
            fatherNID: data.fatherNID || '',
            motherPhone: data.motherPhone || '',
            motherNID: data.motherNID || '',
            classLevel: data.classLevel?._id || '',
            section: data.section?._id || '',
            studentRoll: data.studentRoll,
            address: data.address
          });
        }
      }, [isApiLoading, data]);
      

    return (
        <div>
            {
                <Backdrop open={isLoading} >
                    <CircularProgress />
                </Backdrop> 
            }
            {
                <ToastContainer />
            }
            <Card>
                <CardContent>
                    <div className="title">Personal Information</div>
                    {<ToastContainer />}
                    
                    <form onSubmit={formik.handleSubmit} encType='multipart/form-data' >

                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>

                            {
                                formik.values.profile && (
                                    <img 
                                        style={{
                                            width: 210,
                                            aspectRatio: '1/1',
                                            background: '#f4f4f4'
                                        }}
                                        alt={'profile picture'}
                                        src={ photoURL ? photoURL : `https://husmerklmsbackend.onrender.com/api/v1/uploads/${formik.values.profile}`}
                                    />
                                )
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
                                        handleProfileChange(event); // Call your custom handler if needed
                                    }}
                                    ref={userProfileRef}
                                    style={{ display: 'none' }}
                                />
                            </Button>
                            <div
                                style={{width: '210px'}}
                            >
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

                        </Box>

                        <div className="form-group row">
                            <div className="form-field col-xs-12 col-sm-4 col-md-3">

                                <TextField
                                    
                                    name="name"
                                    id="name"
                                    label="Name"
                                    variant="filled"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={ formik.errors.name}
                                />
                            
                            </div>

                            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                                <FormControl variant="filled" fullWidth>
                                    <InputLabel id="s_class_label_id">Class</InputLabel>

                                    <Select 
                                        labelId="s_class_label_id"
                                        label="Student class"
                                        id="s_class"
                                        variant='filled'
                                        name="classLevel"
                                        value={formik.values.classLevel}
                                        onChange={formik.handleChange}
                                        error={formik.touched.classLevel && Boolean(formik.errors.classLevel)}
                                    >
                                        {!isLoading && !error && classLists && classLists.map((item) => (
                                            <MenuItem key={item._id} value={item._id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </div>

                            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                                    <FormControl variant='filled' fullWidth>
                                        
                                        <InputLabel id="select-class-section">Section</InputLabel>
                                        <Select
                                            labelId="select-class-section"
                                            name="section"
                                            label="Section"
                                            value={formik.values.section}
                                            onChange={formik.handleChange}
                                            error={formik.touched.section && Boolean(formik.errors.section)}
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
                            <div className="col-xs-12 col-sm-4 col-md-3">

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker 
                                            name="dateOfBirth" 
                                            value={dayjs(formik.values.dateOfBirth)} 
                                            label="Date of Birth" 
                                            onChange={(newValue) => {
                                                const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
                                                formik.setFieldValue('dateOfBirth', formattedDate);
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                                <FormControl variant="filled" sx={{ width: '100%' }}>
                                    <InputLabel id="gender_label_id">Gender</InputLabel>
                                    <Select
                                        name="gender"
                                        labelId="gender_label_id"
                                        label="Gender"
                                        id="gender_label_id"
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}
                                        variant='filled'
                                    >
                                        <MenuItem value={'Male'}>Male</MenuItem>
                                        <MenuItem value={'Female'}>Female</MenuItem>
                                        <MenuItem value={'Other'}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                                
                                <TextField
                                    name="bloodGroup"
                                    id="blood-group"
                                    label="Blood Group"
                                    value={formik.values.bloodGroup}
                                    variant='filled'
                                    onChange={formik.handleChange}                        
                                />

                            </div>
                            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                                <TextField
                                    name="email"
                                    id="email"
                                    label="Email"
                                    value={formik.values.email}
                                    variant='filled'
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                                <TextField
                                    name="studentRoll"
                                    id="studentRoll"
                                    label="Student Roll"
                                    value={formik.values.studentRoll}
                                    variant='filled'
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                                    
                                <TextField
                                    
                                    name="phone"
                                    id="phone"
                                    label="Phone"
                                    value={formik.values.phone}
                                    variant='filled'
                                    onChange={formik.handleChange}
                                />
                                                        

                            </div>
                            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                                <TextField
                                    
                                    name="country"
                                    id="country"
                                    label="Country"
                                    value={formik.values.country}
                                    variant='filled'
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                                <TextField
                                    
                                    name="userName"
                                    id="username"
                                    label="Username"
                                    value={formik.values.userName}
                                    variant="filled"
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                                <TextField
                                    
                                    name="password"
                                    id="password"
                                    label="Password"
                                    value={formik.values.password}
                                    variant='filled'
                                    onChange={formik.handleChange}
                                />
                            </div>
                            
                            <div className="title">Parent Information</div>
                            

                            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                                <TextField
                                    
                                    name="fatherName"
                                    id="father_name"
                                    label="Father's Name"
                                    value={formik.values.fatherName}
                                    variant='filled'
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                                <TextField
                                    
                                    name="motherName"
                                    id="m_name"
                                    label="Mother's Name"
                                    value={formik.values.motherName}
                                    variant='filled'
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                                <TextField
                                    
                                    name="fatherProfession"
                                    id="f_profession"
                                    label="Father's Profession"
                                    value={formik.values.fatherProfession}
                                    variant='filled'
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                                <TextField
                                    
                                    name="motherProfession"
                                    id="m_profession"
                                    label="Mother's Profession"
                                    value={formik.values.motherProfession}
                                    variant='filled'
                                    onChange={formik.handleChange}
                                />
                            </div>                        

                            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                                <TextField
                                    
                                    name="fatherPhone"
                                    id="f_mob_no"
                                    label="Father Mobile No"
                                    value={formik.values.fatherPhone}
                                    variant='filled'
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                                <TextField
                                    
                                    name="fatherNID"
                                    id="f_nid"
                                    label="Father NID"
                                    value={formik.values.fatherNID}
                                    variant='filled'
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                                <TextField
                                    name="motherPhone"
                                    id="m_mob_no"
                                    label="Mother Mobile No"
                                    value={formik.values.motherPhone}
                                    variant='filled'
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <div className="form-field col-xs-12 col-sm-4 col-md-3">
                                <TextField
                                    name="motherNID"
                                    id="m_NID"
                                    label="Mother NID"
                                    value={formik.values.motherNID}
                                    variant='filled'
                                    onChange={formik.handleChange}
                                />
                            </div>
                    </div>

                        <Button variant="contained" type="submit">
                            Submit
                        </Button>
                    </form>
                            
                </CardContent>
            </Card>
        </div>
    )
}

export default EditSingleStudent