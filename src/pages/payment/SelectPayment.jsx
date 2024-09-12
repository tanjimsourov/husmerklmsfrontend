import React, { useState } from 'react'
import useGetClasses from '../../hooks/useGetClasses';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { Backdrop, Button, Card, CardContent, CircularProgress, Stack, TextField } from '@mui/material';
import ClassSelection from '../../components/classSelection/ClassSelection';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { ToastContainer, toast } from 'react-toastify';
import dayjs from 'dayjs';
import Payment from './Payment';

const url = 'https://husmerklmsbackend.onrender.com/api/v1/studentFinancial/student-feeDistributionByYearClass'

function SelectPayment() {
    const {classLists, isLoading, error} = useGetClasses();
    const [loading, setLoading] = useState(false)
    const [ data, setData ] = useState(null)

    const authHeader = useAuthHeader()

    const formik = useFormik({
        initialValues: {
            classLevel: '',
            year: null,
        },
        validationSchema: Yup.object().shape({
            classLevel: Yup.string(),
            year: Yup.number(),
        }),
        enableReinitialize: true,
        onSubmit: async (values)=>{
            console.log(values)
            try{

                setLoading(true)

                const headers = {
                    "Authorization": authHeader,
                    "Content-Type": "application/json"
                }

                const response = await axios.get(`${url}/${formik.values.year}/${formik.values.classLevel}`, {headers: headers})

                console.log(response)
                setData(response.data.data[0])
                if(response.status === 200){
                    toast.success(response.data.data.message)
                }
                

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
    <>
        <Stack spacing={2}>

            <Card>
                <CardContent>

                    {
                        <ToastContainer />
                    }

                    {
                        <Backdrop open={loading}><CircularProgress /></Backdrop>
                    }

                    <div className="row">
                        <div className="col-xs-12 col-sm-6">

                                <form onSubmit={formik.handleSubmit}>

                                    <Stack spacing={2}>
                                        <ClassSelection 
                                            value={formik.values.classLevel}
                                            onChange={formik.handleChange}
                                            touched={formik.touched.classLevel}
                                            errors={formik.errors.classLevel}
                                            isLoading={isLoading}
                                            classLists={classLists}
                                            error={error}
                                        />

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker', 'DateRangePicker']}>

                                                <DatePicker 
                                                    views={['year']}
                                                    name="year" 
                                                    label="Year"
                                                    onChange={(newValue) => {
                                                        console.log(newValue)
                                                        console.log(dayjs(newValue).year())
                                                        formik.setFieldValue('year', dayjs(newValue).year());
                                                    }}
                                                    renderInput={(params)=> <TextField {...params} />}
                                                />

                                            </DemoContainer>
                                        </LocalizationProvider>
                                        
                                        <div>
                                            <Button type='submit' variant='contained'>Submit</Button>
                                        </div>

                                    </Stack>

                                </form>
                                

                        </div>
                        <div className="col-xs-12 col-sm-6"></div>
                    </div>


                </CardContent>
            </Card>
            {
                data && 
                <Card>
                    <CardContent>
                        <Payment data={data} year={formik.values.year} />
                    </CardContent>
                </Card>
            }
        </Stack>
    </>
  )
}

export default SelectPayment
