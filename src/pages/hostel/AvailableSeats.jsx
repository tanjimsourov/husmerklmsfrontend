import { Backdrop, Box, Button, Card, CardContent, Chip, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React, { useState } from 'react'
import styles from './AvailableSeats.module.css'
import { Header } from '../../components'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { DataGrid } from '@mui/x-data-grid'
import Styles from '../../components/datatable/DataTable.module.css'
import { GrView } from 'react-icons/gr'
import { Link } from 'react-router-dom'

function AvailableSeats() {

    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            id: ''
        },
        validationSchema: Yup.object().shape({
            id: Yup.string()
        }),
        onSubmit: async (values)=>{
            try{
                setLoading(true)
            }catch(error){
                setLoading(false)
            }finally{
                setLoading(false)
            }
        }
    })

    const  columns = [
        {field: "roomNumber", headerName: 'Room Number', flex: 1},
        {field: 'status', headerName: 'Status', flex: 1},
        {
            field: 'actions',
            headerName: "Actions",
            width: 100,
            renderCell: params => {
                return <div className={Styles.actions}>
                    <Link to={`/hostels/1/${params.row._id}`}>
                        <GrView />
                    </Link>
                </div>
            },
            sortable: false
        }
    ]

    const rows = [
        {_id: 1, roomNumber: 101, status: 3},
        {_id: 2, roomNumber: 102, status: 1}
    ]

  return (
    <div>
        {
            <Backdrop open={loading}><CircularProgress /></Backdrop>
        }

        <Stack spacing={2}>

            <Card>
                <CardContent>
                    <Header title="Hostels Vacancy" noBtn={true}/>
                    
                        <div className="row">
                            
                                <div className="col-xs-12 col-sm-6">
                                    
                                    <form>

                                        <Stack spacing={2}>
                                            <FormControl>
                                                <InputLabel id="select-hostel-label">Select Hostel</InputLabel>
                                                <Select
                                                    id="select-holstel-ib"
                                                    label="Select Hostel"
                                                >
                                                    <MenuItem value="hostel_1">Hostel 1</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Button type="submit"  variant='contained'>Submit</Button>
                                        </Stack>

                                    </form>

                                </div>
                            
                        </div>
                </CardContent>
            </Card>
           
            <Card>
                <CardContent>
                    <DataGrid 
                        columns={columns}
                        rows={rows}
                        getRowId={row=> row._id}
                    />
                </CardContent>
            </Card>
        </Stack>
    </div>
  )
}

export default AvailableSeats
