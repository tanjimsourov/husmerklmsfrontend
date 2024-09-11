import { Backdrop, Button, Card, CardContent, CircularProgress, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik';
import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import axios from 'axios';
import ClassSelection from '../../components/classSelection/ClassSelection';
import useApi from '../../hooks/useApi';
import { useParams } from 'react-router-dom';
import { Header } from '../../components';

const url = 'https://api.ibnhaysam.com/api/v1/subjects'

function SingleCourseEdit() {

    const {id} = useParams()
    const authHeader = useAuthHeader()
    const [loading, setLoading ] = useState(false)
    const {data, isLoading, error} = useApi(`${url}/${id}`)


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
        onSubmit: async (values) => {

            try{

                console.log(values)
                setLoading(true)
                const headers = {
                    "Authorization": authHeader,
                }
                const response = await axios.put('https://api.ibnhaysam.com/api/v1/subjects/subject-register', values, {headers: headers});
                toast.success(response.data.message)
                console.log(response.data)

            }catch(err){

                console.error(err)
                toast.error(err.response.data.message)

            }finally{

                setLoading(false)

            }
        }
    })

    useEffect(()=>{
        formik.setValues({
            name: data?.name,
            subjectCode: data?.subjectCode,
            classLevels: data?.classLevels._id,
            section: data?.section,
            passingMark: data?.passingMark,
            fullMark: data?.fullMark
        })
    }, [data, isLoading])

  return (
    <>
      <Card>
        <CardContent>
            {
                <Backdrop open={loading}><CircularProgress /></Backdrop>
            }
            {
                toast && <ToastContainer />
            }
            <Header title="Edit Course" noBtn={true} />
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <form onSubmit={formik.handleSubmit}>
                        
                        <Stack spacing={2}>
                            <TextField 
                                label="Subject Name" 
                                name='name'
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                onError={
                                    formik.touched.name && formik.errors.name
                                }
                            />
                            <TextField 
                                label="Subject Code" 
                                name="subjectCode"
                                onChange={formik.handleChange}
                                value={formik.values.subjectCode}
                                onError={
                                    formik.touched.subjectCode && formik.errors.subjectCode
                                }
                            />
                            <TextField
                                label="Passing Mark" 
                                name="passingMark"
                                onChange={formik.handleChange}
                                value={formik.values.passingMark}
                                onError={
                                    formik.touched.passingMark && formik.errors.passingMark
                                }
                            />
                            <TextField
                                label="Full Mark" 
                                name="fullMark"
                                onChange={formik.handleChange}
                                value={formik.values.fullMark}
                                onError={
                                    formik.touched.fullMark && formik.errors.fullMark
                                }
                            />

                            <ClassSelection 
                                value={formik.values.classLevels}
                                onChange={formik.handleChange}
                                touched={formik.touched.classLevels}
                                errors={formik.errors.classLevels}
                                name="classLevels"
                            />
                            
                            <Button type="submit" variant='contained'>Submit</Button>
                            
                        </Stack>
                    </form>
                </div>
                <div className="col-xs-12 col-sm-6"></div>
            </div>
        </CardContent>
      </Card>
    </>
  )
}

export default SingleCourseEdit
