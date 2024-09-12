import React from 'react'
import DataTable from '../../components/datatable/DataTable'
import { Backdrop, Card, CardContent, CircularProgress } from '@mui/material'
import { Header } from '../../components'
import useApi from '../../hooks/useApi'

const url = 'https://husmerklmsbackend.onrender.com/api/v1/hostels/get-hostels'

function Hostels() {

    const {data, isLoading, error} = useApi(url)

    console.error(error)

    const columns = [
        {field: 'name', headerName: 'Hostel Name', flex: 1},
        {field: 'type', headerName: "Type", flex: 1}
    ]

  return (
    <div>
        <Card>
            <CardContent>

                {
                    isLoading && <Backdrop open={isLoading}><CircularProgress /></Backdrop>
                }

                <Header title="Hostels" />

                {
                    !isLoading && data && 
                    <DataTable 
                        slug='hostels'
                        columns={columns}
                        rows={data}
                    />
                }

            </CardContent>
        </Card>
    </div>
  )
}

export default Hostels
