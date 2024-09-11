import { Backdrop, Button, Card, CardContent, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { ToastContainer, toast } from 'react-toastify'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import axios from 'axios'
import useApi from '../../hooks/useApi'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'

function SingleSalaryTemplate() {

    const authHeader = useAuthHeader()
    const [loading, setLoading] = useState(false)
    const {data: teachers, isLoading, error} = useApi('https://api.ibnhaysam.com/api/v1/financial/get-users-for-salary/')

    const formik = useFormik({
        initialValues:{
            teacherId: '',
            basicSalary: '',
            houseRent: 0,
            medicalAllowance: 0,
            eidBonus: 0,
            overtime: 0
        },
        onSubmit: async (values, {resetForm}) =>{
            console.log(values)
            try{
                setLoading(true)
                const headers = {
                    "Authorization": authHeader,
                }

                console.log(values)
                //http://localhost:2020
                //https://api.ibnhaysam.com
                const response = await axios.post(`http://localhost:2020/api/v1/financial/add-salary-details`, values, {headers: headers});

                console.log('Registration successful:', response.data);
                toast(response.data.message)


            }catch(err){
                console.error("Error: ", err)
                toast.error(err.response.data.message)
            }finally{
                setLoading(false)
                resetForm()
            }
        },
        validationSchema: Yup.object().shape({
            teacherId: Yup.string(),
            basicSalary: Yup.number(),
            houseRent: Yup.number(),
            medicalAllowance: Yup.number(),
            eidBonus: Yup.number(),
            overtime: Yup.number()
        })
    })

  return (
    <div>
        <Card>
            <CardContent>
                {
                    <Backdrop open={loading}><CircularProgress /></Backdrop>
                }
                    <ToastContainer />
                {
                }
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        
                            <div className="col-xs-12 col-sm-10 col-md-6">
                                <Stack spacing={2}>
                                    <FormControl fullWidth>
                                        <InputLabel id="salary-for-label">Salary For</InputLabel>
                                        <Select
                                            labelId="salary-for-label"
                                            id="salary-select"
                                            value={formik.values.teacherId}
                                            name="teacherId"
                                            label="Salary For"
                                            onChange={formik.handleChange}
                                            error={formik.touched.teacherId && Boolean(formik.errors.teacherId)}
                                        >
                                            {
                                                !isLoading && !error && teachers && 
                                                teachers.map(teacher=>(
                                                    <MenuItem value={teacher._id} key={teacher._id}>{teacher.name}</MenuItem>
                                                ))
                                            }
                                            
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        id="basic-salary"
                                        name="basicSalary"
                                        label="Basic Salary"
                                        variant='outlined'
                                        value={formik.values.basicSalary}
                                        error={formik.touched.basicSalary && Boolean(formik.errors.basicSalary)}
                                        onChange={formik.handleChange}

                                    />
                                    
                                    <div className="row">

                                        <div className="col-xs-12 col-sm-6">
                                            <TextField 
                                                label="House Rent"
                                                name="houseRent"
                                                value={formik.values.houseRent}
                                                id={'house-rent'}
                                                variant='outlined'                
                                                error={formik.touched.houseRent && Boolean(formik.errors.houseRent)}
                                                onChange={formik.handleChange}                
                                            />
                                        </div>
                                        <div className="col-sx-12 col-sm-6">
                                            <TextField 
                                                label="Medical Allowance"
                                                name="medicalAllowance"
                                                value={formik.values.medicalAllowance}
                                                variant='outlined'
                                                error={formik.touched.medicalAllowance && Boolean(formik.errors.medicalAllowance)}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        
                                        <div style={{marginTop: '20px'}} className="col-xs-12 col-sm-6">
                                            <TextField 
                                                label="Overtime"
                                                name="overtime"
                                                value={formik.values.overtime}
                                                id={'overtime'}
                                                variant='outlined'                error={formik.touched.overtime && Boolean(formik.errors.overtime)}         
                                                onChange={formik.handleChange}       
                                            />
                                        </div>
                                        <div style={{marginTop: '20px'}} className="col-sx-12 col-sm-6">
                                            <TextField 
                                                label="Eid Bonus"
                                                name="eidBonus"
                                                id="eid-bonus"
                                                value={formik.values.eidBonus}
                                                variant='outlined'
                                                error={formik.touched.eidBonus && Boolean(formik.errors.eidBonus)}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        
                                        <LoadingButton type="submit" variant="contained">
                                            Submit
                                        </LoadingButton>
                                    </div>
                                </Stack>
                            </div>
                            <div className="col-xs-12 col-sm-6"></div>
                        
                    </div>
                </form>    
            </CardContent>
        </Card>
    </div>
  )
}

export default SingleSalaryTemplate