import { Stack, Backdrop, CircularProgress, TextField, Card, CardContent, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import axios from 'axios';

const url = "https://husmerklmsbackend.onrender.com/api/v1/classes/"

function SingleClassEdit() {
    const {id} = useParams('id')
    const {data, isLoading, error} = useApi(`${url}${id}`) 
    const authHeader = useAuthHeader()
    const {data: teachers, isLoading: isTeacherLoading, error: isTeacherError} = useApi('https://husmerklmsbackend.onrender.com/api/v1/teachers/')
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: '',
            teacher: ''
        },
        validationSchema: Yup.object({
            name: Yup.string(),
            teacher: Yup.string()
        }),
        enableReinitialize: true,
        onSubmit: async (values) =>{
            try{
                setLoading(true)
                
                const headers = {
                    "Authorization": authHeader
                }

                const response = await axios.put(`https://husmerklmsbackend.onrender.com/api/v1/classes/class-update/${id}`, values, {headers: headers})

                console.log("Class Updated", response.data)
                toast(response.data.message)



            }catch(err){
                console.log('Error:', err)
                toast(error.response.data.message)
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
                teacher: data.teachers[0]?._id
            })
        }
    }, [isLoading, data])

    console.log(data)

  return (
    <div>
        {
            isLoading && <Backdrop open={isLoading}>
                <CircularProgress />
            </Backdrop>
        }

        {toast !== '' && <ToastContainer />}

        <Stack spacing={2}>
            {
                !isLoading && !error && data &&

                <Card>
                    <CardContent>

                        <form onSubmit={formik.handleSubmit}>
                            

                                <div className="row">
                                    <div className="col-xs-12 col-sm-4">
                                        <TextField 
                                            id="name" 
                                            label="Class Name" 
                                            variant="standard" 
                                            name='name'
                                            value={formik.values.name}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.errors.name}
                                        />
                                    </div>
                                    <div className="col-xs-12 col-sm-4">
                                        {
                                            !isTeacherLoading && !isTeacherError && teachers && 
                                            <FormControl fullWidth>
                                                <InputLabel id="teacher-select-label">Class Teacher</InputLabel>
                                                <Select
                                                    name="teacher"
                                                    labelId="teacher-select-label"
                                                    id="teacher-select"
                                                    label="Class Teacher"
                                                    variant='standard'
                                                    value={formik.values.teacher}
                                                    error={formik.touched.teacher && Boolean(formik.errors.teacher)}
                                                    helperText={formik.errors.teacher}
                                                    onChange={formik.handleChange}
                                                >
                                                    {
                                                        teachers.map(teacher=>(
                                                            <MenuItem key={teacher._id} value={teacher._id}>
                                                                {teacher.name}
                                                            </MenuItem>
                                                        ))
                                                    }

                                                </Select>
                                            </FormControl>
                                        }
                                        
                                    </div>
                                </div>

                                <Button sx={{marginTop: "20px"}} variant='contained' type="submite">Update</Button>   

                            

                        </form>    

                        
                    </CardContent>
                </Card>
            }
        </Stack>
    </div>
  )
}

export default SingleClassEdit