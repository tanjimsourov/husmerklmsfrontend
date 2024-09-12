import React from 'react'
import useApi from '../../hooks/useApi'
import { DataGrid } from '@mui/x-data-grid'
import { Backdrop, Card, CardContent, CircularProgress } from '@mui/material'
import { Header } from '../../components'

const url = 'https://husmerklmsbackend.onrender.com/api/v1/admin-permission/'

function ViewPermission() {

    const {data, isLoading, error } = useApi(url)
    console.log(data)

    const columns = [
        { field: '_id', headerName: "Id", flex: 1  },
        { field: 'permissionName', headerName: "Permission Name", flex: 1 },

    ]

  return (
    <div>
        {
            <Backdrop open={isLoading}><CircularProgress /></Backdrop>
        }
        
        {
            !isLoading && data && !error && 

            <Card>
                <CardContent>

                    <Header title="Permissions" />
                    <DataGrid
                        columns={columns}
                        rows={data}
                        getRowId={(row) => row._id}
                    />
                    
                </CardContent>
            </Card>
        }
    </div>
  )
}

export default ViewPermission
