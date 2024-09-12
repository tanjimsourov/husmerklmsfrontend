import React from 'react'
import useApi from '../../hooks/useApi'
import { Backdrop, Card, CardContent, CircularProgress } from '@mui/material'
import DataTable from '../../components/datatable/DataTable'
import dayjs from 'dayjs'

const url = `https://husmerklmsbackend.onrender.com/api/v1/expense/expenses`

const ViewExpenses = () => {
    const {data, isLoading, error} = useApi(url)
    console.log(data)
    
    const columns = [
        {field: "name",  headerName: "Name", flex: 1},
        {   
            field: 'amount',   
            headerName: "Amount", 
            flex: 1,
            renderCell: params => {
                return `${params.value} BDT`
            }
        },
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
        <Backdrop open={isLoading}><CircularProgress /></Backdrop>
      }
      <Card>
        <CardContent>

                {
                    !isLoading && data && !error &&
                    <DataTable 
                        rows={data.expenses}
                        columns={columns}
                    />
                }
        </CardContent>
      </Card>
    </>
  )
}

export default ViewExpenses
