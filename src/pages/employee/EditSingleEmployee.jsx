import { Backdrop, Button, Card, CardContent, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Header } from '../../components'
import { useParams } from 'react-router-dom'
import useApi from '../../hooks/useApi'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Input from '../../components/Input'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import axios from 'axios'
import { toast } from 'react-toastify'

const url = 'https://api.ibnhaysam.com/api/v1/user/get-user'

function EditSingleEmployee() {

    const {id} = useParams()
    const {data, isLoading } = useApi(`${url}/${id}`)
    const [loading, setLoading] = useState(false)
    const authHeader = useAuthHeader()

    const formik = useFormik({
      initialValues: {
        name: '',
        email: '',
        currentPassword: "",
        newPassword: '',
      },
      validateSchema:Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        currentPassword: Yup.string(),
        newPassword: Yup.string(),
      }),
      enableReinitialize: true,
      onSubmit: async (values)=>{
        try{
            setLoading(true)

            const headers = {
                "Authorization": authHeader
            }

            const response = await axios.put(`https://api.ibnhaysam.com/api/v1/user/update-user/${id}`, values, {headers: headers});

            console.log('Registration successful:', response.data);
            toast(response.data.success)

            if (response.status === 201) {
                setLoading(false)
                
            } else{
                setLoading(false)
                toast(response.data.success)
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
                name: data?.name,
                phone: data?.phone,
                email: data?.email,
                religion: data?.religion,
                designation: data?.designation,
                dateOfBirth: data?.dateOfBirth
            })
        }
    }, [isLoading, data])

  return (
    <>
        {
            <Backdrop open={loading}><CircularProgress /></Backdrop>
        }

        {
            !isLoading && data && (
                <Card>
                    <CardContent>

                        <Header title="Edit employee" noBtn={true} />

                        <form onSubmit={formik.handleSubmit}>

                            <div className="row">
                                <div className="col-xs-12 col-sm-5">
                                    <Stack spacing={2}>
                                        
                                        <Input 
                                            className="col-sm-12"
                                            name="name"
                                            label="name"
                                            value={formik.values.name}
                                            error={formik.errors.name}
                                            touched={formik.touched.name}
                                            onBlur={formik.handleBlur} 
                                            onChange={formik.handleChange} 
                                        />  
                                        
                                        <Input
                                            className="col-sm-12" 
                                            value={formik.values.email}
                                            label="Email"
                                            error={formik.errors.email}
                                            touched={formik.touched.email}
                                            onBlur={formik.handleBlur} 
                                            onChange={formik.handleChange} 
                                            name='email'
                                        />

                                        <Input 
                                            className="col-sm-12" 
                                            value={formik.values.currentPassword}
                                            label="Current Password"
                                            error={formik.errors.currentPassword}
                                            touched={formik.touched.currentPassword}
                                            onBlur={formik.handleBlur} 
                                            onChange={formik.handleChange} 
                                            name='currentPassword'
                                        />

                                        <Input 
                                            className="col-sm-12" 
                                            value={formik.values.newPassword}
                                            label="New Password"
                                            error={formik.errors.newPassword}
                                            touched={formik.touched.newPassword}
                                            onBlur={formik.handleBlur} 
                                            onChange={formik.handleChange} 
                                            name='newPassword'
                                        />
                                        
                                        {/* <Input 
                                            value={(formik.values.dateOfBirth)}
                                            label="Date of Birth"
                                            formik={formik}
                                            className="col-sm-12"
                                            name="dateOfBirth"
                                        /> */}

                                        <div>
                                            <Button type="submit" variant='contained'>Update</Button>
                                        </div>

                                    </Stack>
                                </div>
                            </div>

                        </form>


                    </CardContent>
                </Card>
            )
        }
    </>
  )
}

export default EditSingleEmployee
