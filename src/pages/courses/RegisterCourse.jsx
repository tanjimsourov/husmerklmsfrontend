import { Backdrop, Card, CardContent, CircularProgress, Button, Stack, TextField, FormControl, InputLabel, Select } from '@mui/material'
import React, {useState} from 'react'
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import MenuItem from '@mui/material/MenuItem';
import useGetClasses from '../../hooks/useGetClasses';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

function RegisterCourse() {

    const authHeader = useAuthHeader()
    const {classLists, isLoading, error} = useGetClasses();
    const [open, setOpen] = useState(false)
    const [Loading, setLoading ] = useState(false)

    const handleSubmit = (e)=>{
        e.preventDefault();
        setOpen(!open)
    }


    const formik = useFormik({
        initialValues: {
            name: '',
            subjectCode: '',
            classLevels: '',
            section: '',
            passingMark: '',
            fullMark: ''
        },
        validationSchema: Yup.object().shape({
            name: Yup.string(),
            subjectCode: Yup.string(),
            classLevels: Yup.string(),
            section: Yup.string(),
            passingMark: Yup.number(),
            fullMark: Yup.number()
        }),
        onSubmit: async (values, {resetForm}) => {
            try{
                console.log(values)
                setLoading(true)
                const headers = {
                    "Authorization": authHeader,
                }
                const response = await axios.post('https://api.ibnhaysam.com/api/v1/subjects/subject-register', values, {headers: headers});
                toast.success(response.data.message)
                console.log(response.data)
                resetForm();
            }catch(err){
                console.error(err)
                toast.error(err.response.data.message)
            }finally{
                setLoading(false)
            }
        }
    })

  return (
    <Card>
        
        {toast !== '' && <ToastContainer />}
        <CardContent>
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <form action="" onSubmit={formik.handleSubmit}>
                        
                        <Stack spacing={2}>
                            <TextField 
                                label="Subject Name" 
                                variant='filled' 
                                name='name'
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                onError={
                                    formik.touched.name && formik.errors.name
                                }
                            />
                            <TextField 
                                label="Subject Code" 
                                variant='filled' 
                                name="subjectCode"
                                onChange={formik.handleChange}
                                value={formik.values.subjectCode}
                                onError={
                                    formik.touched.subjectCode && formik.errors.subjectCode
                                }
                            />
                            <TextField
                                label="Passing Mark" 
                                variant='filled' 
                                name="passingMark"
                                onChange={formik.handleChange}
                                value={formik.values.passingMark}
                                onError={
                                    formik.touched.passingMark && formik.errors.passingMark
                                }
                            />
                            <TextField
                                label="Full Mark" 
                                variant='filled' 
                                name="fullMark"
                                onChange={formik.handleChange}
                                value={formik.values.fullMark}
                                onError={
                                    formik.touched.fullMark && formik.errors.fullMark
                                }
                            />
                            <FormControl variant='filled' fullWidth>
                                <InputLabel id="class-select">Class</InputLabel>
                                <Select 
                                    labelId="class-select"
                                    id="class-select"
                                    name="classLevels"
                                    value={formik.values.classLevels}
                                    variant='filled'
                                    onChange={formik.handleChange}
                                >
                                    {!isLoading && !error && classLists && classLists.map((item) => (
                                            <MenuItem key={item._id} value={item._id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}

                                </Select>
                                
                            </FormControl>
                            
                            <Button type="submit" variant='contained'>Submit</Button>
                        </Stack>
                    </form>
                </div>
                <div className="col-xs-12 col-sm-6"></div>
            </div>
        </CardContent>
        <Backdrop open={Loading}><CircularProgress /></Backdrop>
    </Card>
  )
}

export default RegisterCourse