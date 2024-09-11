import React from 'react'
import useApi from '../../hooks/useApi'
import { Backdrop, Card, CardContent, CircularProgress } from '@mui/material'
import DataTable from '../../components/datatable/DataTable'

const url = 'http://localhost:2020/api/v1/users/users-with-role-staff'
function ViewStaffs() {

  const {data, isLoading, error } = useApi(url)

  console.error(error)
  const columns = [
    {field: 'name', headerName: 'Name', flex: 1},
    {field: 'email', headerName:'Email', flex:1},
    {field: 'role', headerName: 'Role', flex: 1},
    {field: 'designation', headerName: "Designation", flex: 1}
  ]

  return (
    <>
    {
      <Backdrop open={isLoading}><CircularProgress /></Backdrop>
    }

    <Card>
      <CardContent>

        {
          data && data.length > 0 && !isLoading && !error &&
          <DataTable 
            columns={columns}
            rows={data}
          />
        }

      </CardContent>
    </Card>

      
    </>
  )
}

export default ViewStaffs
