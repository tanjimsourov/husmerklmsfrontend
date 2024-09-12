import { Backdrop, Button, Card, CardContent, CircularProgress, Stack, TextField } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { ToastContainer, toast } from 'react-toastify'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as Yup from 'yup'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';

const url = `https://husmerklmsbackend.onrender.com/api/v1/expense/expenses`

function AddExpense() {

 const authHeader = useAuthHeader();
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      amount: '',
      date: null
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      amount: Yup.number().positive().required('Amount is required'),
      date: Yup.string().required()
    }),
    onSubmit: async (values, {resetForm}) => {
      try{

        setLoading(true)

        const headers = {
          "Authorization": authHeader,
        }

        const response = await axios.post(url, values, {headers: headers})

        console.log(response)
        
        if( response.data.status === 'success'){
          toast.success("Expense added")
          resetForm()
        }

      }catch(error){
        console.error(error)
        setLoading(false)
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
    }
  })

  return (
    <>
      {
        <Backdrop open={loading}><CircularProgress /></Backdrop>
      }
      {
        <ToastContainer />
      }

      <Card>
          <CardContent>
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing={2}>

                          <TextField 
                            name="name"
                            label="Title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                          />
                          
                          <TextField 
                            name="amount"
                            label="Amount"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.amount}
                            error={formik.touched.amount && Boolean(formik.errors.amount)}
                            helperText={formik.touched.amount && formik.errors.amount}
                          />

                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={['DatePicker']}>
                                  
                                  <DateField 
                                      name="date" 
                                      label="Date" 
                                      onChange={(newValue) => {
                                        const formattedDate = dayjs(newValue).format('YYYY-MM-DD');
                                        formik.setFieldValue('date', formattedDate);
                                      }}
                                  />
                              </DemoContainer>
                          </LocalizationProvider>

                          <div>
                             <Button type="submit" variant="contained">Submit</Button>
                          </div>

                        </Stack>
                    </form>
                </div>
              </div>
          </CardContent>
      </Card>
    </>
  )
}

export default AddExpense
