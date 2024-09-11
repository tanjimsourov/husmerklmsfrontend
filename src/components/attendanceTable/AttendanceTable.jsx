import { Backdrop, Button, CircularProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { ToastContainer, toast } from 'react-toastify';

function AttendanceTable({students, values}) {

    const authHeader = useAuthHeader()
    const [attendance, setAttendance] = useState([])
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: [],
        onSubmit: async (values, {resetForm})=>{
            try{
                setLoading(true)
                const headers = {
                    "Authorization": authHeader,
                }

                console.log(values)

                const response = await axios.post('https://api.ibnhaysam.com/api/v1/attendance/register-attendance', attendance, {headers})
                console.log(response.data);
                toast.success(response.message)
                resetForm()
            } catch (err) {
                console.error(err);
                toast.error("Failed to submit attendance.");
                setLoading(false)
            }finally{
                setLoading(false)
            }
        }

    })

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'studentId', headerName: 'Student ID', width: 150 },
        { field: 'name', headerName: 'Student Name', width: 200 },
    ]

    const handleSelectionModelChange = (selectionModel) => {
        // Create an array of selected student IDs with their attendance status
        const updatedSelectedRows = students.map(row => ({
            ...values,
            students: row._id,
            status: selectionModel.includes(row._id) ? 'present' : 'absent'
        }));
        setAttendance(updatedSelectedRows);
        console.log(updatedSelectedRows)
    };

  return (
    <>
        {
            loading && <Backdrop open={loading}><CircularProgress /></Backdrop>
        }

        {toast && <ToastContainer />}

        <form onSubmit={formik.handleSubmit}>

            <DataGrid
                autoHeight
                columns={columns}
                rows={students}
                slots={{
                    toolbar: GridToolbar
                }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 }
                    }
                }}
                keepNonExistentRowsSelected
                checkboxSelection
                disableColumnMenu
                disableDensitySelector
                disableColumnSelector
                disableColumnFilter
                onRowSelectionModelChange={handleSelectionModelChange}
                getRowId={(row) => row._id}
            />

            <Button variant='contained' type="submit">Give Attendance</Button>

        </form>
    </>
  )
}

export default AttendanceTable
