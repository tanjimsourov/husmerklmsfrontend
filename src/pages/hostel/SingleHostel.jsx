import { Backdrop, Box, Button, Card, CardContent, CircularProgress, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import DataTable from '../../components/datatable/DataTable';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { Header } from '../../components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { ToastContainer, toast } from 'react-toastify';
import useRooms from '../../hooks/useRooms';

const url = 'https://husmerklmsbackend.onrender.com/api/v1/rooms/hostel-register';

function SingleHostel() {

    const {hostelId: id} = useParams()
    const [loading, setLoading] = useState(false)
    const authHeader = useAuthHeader()
    const {data, isLoading, error, refetch} = useRooms(id)
    console.log(data)

    const columns = [
        {field: 'name', headerName: 'Name', flex: 1},
        {field: 'seatNumber', headerName: 'Capacity', flex: 1},
        {
            field: 'seats', 
            headerName: 'Occupied', 
            flex: 1,
            renderCell: params => {
                let vacant = 0;
                params.value.map(seat=> {
                    if(seat.status !== 'vacant'){
                        vacant++;
                    }
                })
                
                return vacant;
            }
        }
    ]

    const formik = useFormik({
        initialValues: {
            name: '',
            seatNumber: ''
        },
        validationSchema: Yup.object().shape({
            name: Yup.string(),
            seatNumber: Yup.number()
        }),
        onSubmit: async (values, {resetForm}) => {
            try{
                setLoading(true)

                const headers = {
                    "Authorization": authHeader
                };

                const upatedValues = {...values, hostel: id}
                console.log(upatedValues)

                const response = await axios.post( url, upatedValues, {headers: headers} )

                console.log('Response: ', response)

                if(response.status === 201){
                    toast(response.data.message)
                    resetForm()
                    refetch()
                }else{
                    toast(response.data.message)
                }

            }catch(error){
                setLoading(false)
                console.error(error)
                toast(error.response.data.message)
            }finally{
                setLoading(false)
            }
        },
    })

  return (
    <Stack spacing={4}>
        {
            <Backdrop open={loading}><CircularProgress /></Backdrop>
        }
        <Card>
            <CardContent>
                    {
                        toast && <ToastContainer />
                    }
                    <Box
                        sx={{
                            border: 'solid 1px rgba(0, 0, 0, 0.2)',
                            borderRadius: '8px',
                            padding: '2rem',
                            marginTop: '2rem'
                        }}
                    >
                        <h1 className="hostel-name title">Hostel 1</h1>
                        <p className="hostel-location"><FaLocationDot/> Location xyz</p>

                    </Box>
            </CardContent>
        </Card>

        <Card>
            <CardContent>

                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <form onSubmit={formik.handleSubmit}>
                            <Stack spacing={2}>
                                <Header title="Add Room" noBtn={true} />
                                <TextField 
                                    id='name'
                                    name='name'
                                    label="Name"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    error={
                                        formik.touched.name && Boolean(formik.errors.name)
                                    }
                                    helperText={
                                        formik.touched.name && formik.errors.name
                                    }
                                />
                                <TextField 
                                    id="seatNumber"
                                    name="seatNumber"
                                    label="Seat Number"
                                    onChange={formik.handleChange}
                                    value={formik.values.seatNumber}
                                    error={
                                        formik.touched.seatNumber && Boolean(formik.errors.seatNumber)
                                    }
                                    helperText={
                                        formik.touched.seatNumber && formik.errors.seatNumber
                                    }

                                />

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
            !isLoading && !error && data &&
            <Card>
                <CardContent>
                        <DataTable 
                            slug='rooms'
                            columns={columns}
                            rows={data}
                            />
                </CardContent>
            </Card>
        }
    </Stack>
  )
}

export default SingleHostel
