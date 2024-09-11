import { Card, CardContent, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Button, Alert, Backdrop, CircularProgress } from '@mui/material'
import { useFormik } from 'formik';
import React, {useState} from 'react'
import * as Yup from 'yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useGetClasses from '../../hooks/useGetClasses';
import { CheckCircleOutline } from '@mui/icons-material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

function RegisterRoutine() {

    const authHeader = useAuthHeader();
    const {classLists, isLoading, error} = useGetClasses();
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: '',
            classLevel: '',
            section: '',
            profile: ''
        },
        enableReinitialize: true,
        onSubmit: async (values, {resetForm}) => {
            try{

                setLoading(true)

                const headers = {
                    "Authorization": authHeader,
                    'Content-Type': 'multipart/form-data',
                }

                const response = await axios.post(`https://api.ibnhaysam.com/api/v1/routines/register`, values, {headers: headers})

                console.log('Registration successful:', response.data);
                toast(response.data.message)

                if(response.status === 201){
                    setLoading(false)
                }else{
                    setLoading(false)
                }


            }catch(err){

                console.error("Error: ", error)
                toast(error.response.data.message)
                setLoading(false)

            }finally{
                setLoading(false)
                resetForm();
            }
        },
        validationSchema: Yup.object().shape({
            name: Yup.string(),
            classLevel: Yup.string(),
            section: Yup.string(),
            routine: Yup.string()
        })
    })

  return (
    <div>
        <Card>
            <CardContent>
                {
                    loading && <Backdrop open={loading}>
                        <CircularProgress />
                    </Backdrop>
                }
                {
                    toast !== '' && <ToastContainer />
                }
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        {
                            !isLoading && classLists && !error &&

                            <form onSubmit={formik.handleSubmit}>
                        
                                <Stack spacing={2}>
                                    <TextField 
                                        label="Name" 
                                        variant="filled" 
                                        name="name" 
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.name && Boolean(formik.errors.name)
                                        }
                                        helperText={formik.errors.name}
                                    />
                                    <FormControl variant="filled" sx={{ width: '100%' }}>
                                        <InputLabel id="s_class_label_id">Class</InputLabel>

                                        <Select 
                                            labelId="s_class_label_id"
                                            label="Class"
                                            id="s_class"
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

                                        
                                            {formik.touched.classLevel && formik.errors.classLevel && (
                                                <FormHelperText error>{formik.errors.classLevel}</FormHelperText>
                                            )}
                                    </FormControl>
                                    <FormControl fullWidth>
                                    
                                        <InputLabel id="select-class-section">Section</InputLabel>
                                        <Select
                                            labelId="select-class-section"
                                            id="section"
                                            name="section"
                                            label="Section"
                                            variant='filled'
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
                                        {formik.touched.section && formik.errors.section && (
                                            <FormHelperText error>{formik.errors.section}</FormHelperText>
                                        )}
                                    </FormControl>

                                    <div>
                                        {
                                            formik.values.profile && 
                                            <Alert icon={<CheckCircleOutline />} severity='success'>
                                                {formik.values.profile.name}
                                            </Alert>
                                        }
                                        <Button
                                            component="label"
                                            role={undefined}
                                            variant="contained"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload file
                                            <input
                                                accept="image/*"
                                                name="profile"
                                                id="contained-button-file"
                                                multiple
                                                type="file"
                                                onChange={(event) => {
                                                    formik.setFieldValue("profile", event.target.files[0]);
                                                }}
                                                style={{ display: 'none' }}
                                            />
                                        </Button>
                                    </div>

                                    <div>

                                        <Button type="submit" variant='outlined'>
                                            Submit
                                        </Button>
                                        

                                    </div>


                                </Stack>
                            </form>
                        }
                    </div>
                </div>
                
            </CardContent>
        </Card>
    </div>
  )
}

export default RegisterRoutine