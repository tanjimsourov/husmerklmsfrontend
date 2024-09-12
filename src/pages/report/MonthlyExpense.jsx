import { Backdrop, Button, Card, CardContent, CircularProgress, Stack } from '@mui/material'
import { DateField, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import axios from 'axios'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import DataTable from '../../components/datatable/DataTable'

const url = `https://husmerklmsbackend.onrender.com/api/v1/expense/expense-range`

const MonthlyExpense = () => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const authHeader = useAuthHeader()

    const formik = useFormik({
        initialValues: {
            start: null,
            end: null,
        },
        validationSchema: Yup.object().shape({
            start: Yup.string(),
            end: Yup.string()
        }),
        onSubmit: async (values) => {

            try{

                setLoading(true)

                const headers = {
                    "Authorization": authHeader,
                    'Content-Type': 'application/json',
                };

                const response = await axios.post(url, values, {headers: headers})
                console.log(values)
                console.log(response)

                setData(response.data.data)
                toast.success(response.data.message)


            }catch(error){
                console.error(error.response)
                setLoading(false)

            }finally{
                setLoading(false)
            }
        }

    })

    //amount date name

    const columns = [
        { field: 'name', headerName: "Name", flex: 1},
        {field: 'amount', headerName: 'Amount', flex: 1},
        {
            field: 'date', 
            headerName: 'Date', 
            flex: 1,
            renderCell: params => {
                return dayjs(params.value).format("DD-MMM-YYYY")
            }
        }
    ]

  return (
    <>
      {
        <Backdrop open={loading}><CircularProgress /></Backdrop>
      }

      <Stack spacing={2}>

        <Card>
                <CardContent>

                    <div className="row">
                        <div className="col-xs-12 col-sm-6">
                            <form onSubmit={formik.handleSubmit}>

                                <Stack spacing={2}>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            
                                            <DateField 
                                                name="start" 
                                                label="From" 
                                                onChange={(newValue) => {
                                                    formik.setFieldValue('start', dayjs(newValue).format());
                                                }}
                                                helperText={formik.errors.start}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>  

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            
                                            <DateField 
                                                name="end" 
                                                label="To" 
                                                onChange={(newValue) => {
                                                    formik.setFieldValue('end', dayjs(newValue).format());
                                                }}
                                                helperText={formik.errors.end}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>   

                                    <div>
                                        <Button type="submit" variant='contained'>Submit</Button>
                                    </div>            

                                </Stack>

                            </form>
                        </div>
                    </div>

                </CardContent>
        </Card>

        {
            data && data.length > 0 &&

            <Card>
                <CardContent>
                    <DataTable 
                        columns={columns}
                        rows={data}
                        noAction={true}
                    />
                </CardContent>
            </Card>
            
        }

      </Stack>


    </>
  )
}

export default MonthlyExpense
