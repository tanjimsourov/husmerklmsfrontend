import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Backdrop, Chip, CircularProgress } from '@mui/material';
import AttendanceChip from '../../components/AttendanceChip';
import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';

const url = 'https://api.ibnhaysam.com/api/v1/attendance/get-attendance'

function SingleAttendance({rows}) {

    const {id} = useParams()
    const {data,isLoading, error} = useApi(`${url}/${id}`)
    console.error(error)

    console.log(JSON.stringify(data))

    const columns = [
        {field: 'month', headerName: "Month", width: 150},
        {
            field: 'days',
            headerName: "Days",
            flex: 1,
            renderCell: params=>{
                let days = []
                params.value.map(day => {
                    days.push(<AttendanceChip color={day.status} label={day.day} />) 
                    return (()=>{})
                })

                return days
            }
        }
    ]

  return (
    <>
            {
                <Backdrop open={isLoading}><CircularProgress /></Backdrop>
            }
            {
                !isLoading && !error && data && 
                <DataGrid 
                    rows={data}
                    columns={columns}
                    checkboxSelection={false}
                    disableColumnMenu
                    disableRowSelectionOnClick
                    getRowId={row => row && row.id}
                />  
            }
    </>
  )
}

export default SingleAttendance