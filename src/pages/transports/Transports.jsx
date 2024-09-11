import { Card, CardContent } from '@mui/material'
import React from 'react'
import DataTable from '../../components/datatable/DataTable'
import { Header } from '../../components'

function Transports() {

  const columns = [
    {field: 'routeName', headerName: "Route Name", flex: 1},
    {field: 'vehicleNumber', headerName: 'Vehicle Number', flex: 1},
    {field: 'driverName', headerName: "Driver Name", flex: 1},
    {field: 'driverNumber', headerName: "Driver Number", flex: 1},
  ]

  const rows = [
    {_id: 1, routeName: "9A", vehicleNumber: "ldjfldj", driverName: "Solaiman", driverNumber: "89374932798"}
  ]

  return (
    <>
      <Card>
          <CardContent>
              <Header title="Routes" />
              <DataTable 
                slug="transports"
                columns={columns}
                rows={rows}
              />
          </CardContent>
      </Card>
    </>
  )
}

export default Transports
