import { Card, TextField, CardContent, Stack, TextareaAutosize, Button, Backdrop, CircularProgress } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers'
import axios from 'axios'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { ToastContainer, toast } from 'react-toastify'

const url = "https://husmerklmsbackend.onrender.com/api/v1/exams/exam-register"

function AddExam() {

    const authHeader = useAuthHeader();
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: "",
            description: '',
            Year: null
        },
        validationSchema:Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string(),
            Year: Yup.string().required()
        }),
        onSubmit: async (values, {resetForm}) => {
            try{

                setLoading(true)

                const headers = {
                    "Authorization": authHeader,
                };

                console.log(values)

                const response = await axios.post(url, values, {headers: headers})

                if(response.status === 201){

                    toast.success("Exam Created")
                }

                console.log(response)
                resetForm();
            }catch(error){
                setLoading(false)
                console.error(error)
                toast.error(error.message)
            }finally{
                setLoading(false)
            }
        }
    })

  return (
    <div>

        {
            <Backdrop open={loading}><CircularProgress /></Backdrop>
        }

        {   
            <ToastContainer/>
        }

        <Card>
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <Stack spacing={2}>
                                
                                <TextField
                                    label="Exam Name"
                                    variant="outlined"
                                    required={true}
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    id="name"
                                    onError={
                                        formik.touched.name && Boolean(formik.errors.name)
                                    }
                                    helperText={
                                        formik.touched.name && formik.errors.name
                                    }
                                />

                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DemoContainer components={['DatePicker', 'DateRangePicker']}>
                                      
                                      <DatePicker 
                                          views={['year']}
                                          openTo="year"
                                          name="Year" 
                                          label="Year"
                                          onChange={newValue => {
                                            const year = dayjs(newValue).format('YYYY')
                                            console.log(year)
                                            formik.setFieldValue('Year', year)
                                          }}
                                          renderInput={(params)=> <TextField {...params} />}
                                      />

                                  </DemoContainer>
                              </LocalizationProvider>

                                <div>
                                    <Button type="submit" variant='contained'>Submit</Button>
                                </div>
                            </Stack>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
      
    </div>
  )
}

export default AddExam
