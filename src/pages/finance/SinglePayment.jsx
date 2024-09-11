import { Backdrop, Button, Card, CardContent, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import axios from 'axios'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { FaCircleUser } from 'react-icons/fa6'
import * as Yup from 'yup'
import { Header } from '../../components'
import DataTable from '../../components/datatable/DataTable'
import { useParams } from 'react-router-dom'
import useApi from '../../hooks/useApi'
import { ToastContainer, toast } from 'react-toastify'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

const url = 'http://localhost:2020/api/v1/financial/get-salary-sheet'

const SinglePayment = () => {

    const authHeader = useAuthHeader()
    const [loading, setLoading] = useState(false)
    const {id} = useParams()
    const currentMonth = dayjs().month()
    const currentYear = dayjs().get('year').toString()
    const {data: salaryDetails, isLoading: salaryLoading, error: salaryError } = useApi(`${url}/${id}/${currentMonth+1}/${currentYear}`)

    console.log(salaryDetails)

    const formik = useFormik({
        initialValues: {
            month: null,
            paymentType: 'Cash',
            year: dayjs().year().toString()
        },
        validationSchema: Yup.object().shape({
            month: Yup.string().required(),
            paymentType: Yup.string(),
            year: Yup.string()
        }),
        onSubmit: async (values)=>{
            console.log(values)
            try{

                setLoading(true)

                const headers = {
                    "Authorization": authHeader,
                    'Content-Type': 'application/json',
                };

                let updatedValues = {...values, teacherId: id}
                console.log(updatedValues)
                //http://localhost:2020
                //https://api.ibnhaysam.com
                const response = await axios.put('http://localhost:2020/api/v1/financial/update-salary-details', updatedValues, {headers: headers})
                console.log(response)
                toast.success(response.data.message)

            }catch(error){
                console.error(error.response)
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
            <div className="col-xs-12 col-sm-4">
                {
                    salaryDetails && salaryDetails[0] &&
                    <Card>
                        <CardContent>

                            <Stack spacing={2}>

                                <div className="payment-profile-box">

                                    <h1 className="title">Profile Details</h1>

                                    <div className="profile" style={{fontSize: '5em'}}>
                                        <FaCircleUser />
                                    </div>

                                    <div className="payment-profile">
                                        <h2 className="profile-name">{salaryDetails[0]?.user?.name}</h2>
                                        <p className="profile-role">{salaryDetails[0]?.user?.role}</p>
                                    </div>

                                    <div className="payment-profile-body">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <th>Email</th>
                                                    <td>{salaryDetails[0]?.user?.email}</td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                                {/* Salary Template Details */}
                                <div className="salary-details">
                                    <Stack spacing={2}>
                                        <h1 className="title">Salary Details</h1>

                                        <TextField 
                                            name="basic-salary"
                                            id="basic-salary"
                                            className='col-sm-12'
                                            label="Basic Salary"
                                            variant='filled'
                                            value={
                                                salaryDetails[0]?.basicSalary
                                            }
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            InputLabelProps={{ shrink: true }} // Add this prop to move the label abov 
                                        />
                                        <TextField 
                                            name="gross-salary"
                                            id="gross-salary"
                                            className='col-sm-12'
                                            label="Gross Salary"
                                            variant='filled'
                                            value={
                                                salaryDetails[0]?.grossSalary
                                            }
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            InputLabelProps={{ shrink: true }} // Add this prop to move the label abov 
                                        />
                                        <TextField 
                                            name="house-rent"
                                            id="house-rent"
                                            className='col-sm-12'
                                            label="House Rent"
                                            variant='filled'
                                            value={
                                                salaryDetails[0]?.houseRent
                                            }
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            InputLabelProps={{ shrink: true }} // Add this prop to move the label abov 
                                        />
                                        <TextField 
                                            name="medical-allowance"
                                            id="medical-allowance"
                                            className='col-sm-12'
                                            label="Medical Allowance"
                                            variant='filled'
                                            value={
                                                salaryDetails[0]?.medicalAllowance
                                            }
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            InputLabelProps={{ shrink: true }} // Add this prop to move the label abov                                         
                                        />
                                        <TextField 
                                            name="eid-bonus"
                                            id="eid-bonus"
                                            className='col-sm-12'
                                            label="Eid Bonus"
                                            variant='filled'
                                            value={salaryDetails[0]?.eidBonus}
                                            InputProps={{
                                                readOnly: true
                                            }}    
                                            InputLabelProps={{ shrink: true }} // Add this prop to move the label abov                                     
                                        />
                                        <TextField 
                                            name="over-time"
                                            id="over-time"
                                            className='col-sm-12'
                                            label="Over Time"
                                            variant='filled'
                                            value={salaryDetails[0]?.overtime}
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            InputLabelProps={{ shrink: true }} // Add this prop to move the label abov 
                                        />

                                    </Stack>

                                </div>

                                {/* Make Payment */}
                                <div className="make-payment">
                                    <form onSubmit={formik.handleSubmit}>
                                        <Stack spacing={2}>
                                            <h1 className="title">Make Payment</h1>

                                            <TextField 
                                                name="year"
                                                label="Year"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.year}
                                                error={formik.touched.year && Boolean(formik.errors.year)}
                                                helperText={formik.touched.year && formik.errors.year}
                                            />

                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker', 'DateRangePicker']}>

                                                    <DatePicker 
                                                        views={['month']}
                                                        name="month" 
                                                        label="Month"
                                                        onChange={(newValue) => {
                                                            const monthNumber = dayjs(newValue).month() + 1; // Get the month number (1-12)
                                                            formik.setFieldValue('month', monthNumber);
                                                        }}
                                                        renderInput={(params)=> <TextField {...params} />}
                                                    />

                                                </DemoContainer>
                                            </LocalizationProvider>

                                            <FormControl fullWidth>
                                                <InputLabel id="payment-type">A/C Fund</InputLabel>
                                                <Select
                                                    name="paymentType"
                                                    labelId="payment-type"
                                                    label="Gender"
                                                    id="payment-type"
                                                    value={formik.values.paymentType}
                                                    onChange={formik.handleChange}
                                                    helperText={formik.errors.paymentType}
                                                    error={formik.touched.paymentType && Boolean(formik.errors.paymentType)}
                                                >
                                                    <MenuItem value={'Cash'}>Cash</MenuItem>
                                                    <MenuItem value={'Bkash'}>Bkash</MenuItem>
                                                    <MenuItem value={'Nagad'}>Nagad</MenuItem>
                                                    <MenuItem value={'Rocket'}>Rocket</MenuItem>
                                                    <MenuItem value={'Bank Account'}>Bank Account</MenuItem>
                                                </Select>
                                            </FormControl>

                                            <div>
                                                <Button type="submit" variant='contained'>Pay Now</Button>
                                            </div>
                                            
                                        </Stack>
                                    </form>
                                </div>

                            </Stack>


                        </CardContent>
                    </Card>
                }
            </div>
            <div className="col-xs-12 col-sm-8">
                <Card>
                    <CardContent>
                        <Header title="Payment History" noBtn={true} />
                        
                        {/* <DataTable 

                        /> */}

                    </CardContent>
                </Card>
            </div>
      </div>
    </>
  )
}

export default SinglePayment
