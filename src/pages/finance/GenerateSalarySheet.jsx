import { Backdrop, Button, Card, CardContent, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { DateField, DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import axios from 'axios'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { ToastContainer, toast } from 'react-toastify'
import * as Yup from 'yup'

const url = 'https://husmerklmsbackend.onrender.com/api/v1/financial/generate-salary-sheet'

const GenerateSalarySheet = () => {

    const [loading, setLoading] = useState(false)
    const authHeader = useAuthHeader()

    const formik = useFormik({
        initialValues: {
            month: null,
            year: '',
            isWithEidBonus: ''
        },
        validationSchema: Yup.object().shape({
            month: Yup.string(),
            year: Yup.string(),
            isWithEidBonus: Yup.boolean()
        }),
        onSubmit: async (values)=>{
            try{

                setLoading(true)

                const headers = {
                    "Authorization": authHeader,
                    "Content-Type": "application/json"
                }

                const response = await axios.post(url, values, {headers: headers})
                console.log(response)
                toast.success(response.data.message)


            }catch(error){
                console.error(error)
                toast.error(error.message)
                setLoading(false)
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

        <div className="row">
            <div className="col-xs-12 col-sm-6">
                <Card>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <Stack spacing={2}>
                                <TextField 
                                    name="year"
                                    label="Year"
                                    value={formik.values.year}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.year && Boolean(formik.errors.year)}
                                  helperText={ formik.errors.year}
                                />

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DateRangePicker']}>

                                        <DatePicker 
                                            views={['month']}
                                            name="month" 
                                            label="Month"
                                            onChange={(newValue) => {
                                                formik.setFieldValue('month', dayjs(newValue).format("M"));
                                            }}
                                            renderInput={(params)=> <TextField {...params} />}
                                        />

                                    </DemoContainer>
                                </LocalizationProvider>


                                <FormControl fullWidth>
                                    <InputLabel id="boolean">With Eid Bonus</InputLabel>
                                    <Select
                                        name="isWithEidBonus"
                                        labelId="boolean" // Corrected labelId value
                                        value={formik.values.isWithEidBonus}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.isWithEidBonus && Boolean(formik.errors.isWithEidBonus)}
                                        helperText={formik.touched.isWithEidBonus && formik.errors.isWithEidBonus}
                                    >
                                        <MenuItem key="true" value="true">
                                            Yes
                                        </MenuItem>
                                        <MenuItem key="false" value="false">
                                            No
                                        </MenuItem>
                                    </Select>
                                </FormControl>

                                <div>
                                    <Button type="submit" variant='contained'>Submit</Button>
                                </div>


                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
      
    </>
  )
}

export default GenerateSalarySheet
