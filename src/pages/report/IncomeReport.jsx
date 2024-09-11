import { Backdrop, Card, CardContent, CircularProgress } from '@mui/material'
import React from 'react'
import useApi from '../../hooks/useApi'
import dayjs from 'dayjs'
import { DataGrid } from '@mui/x-data-grid'
import { Header } from '../../components'
import DataTable from '../../components/datatable/DataTable'

const url = 'https://api.ibnhaysam.com/api/v1/studentFinancial/student-report/payment'

function IncomeReport() {

    const {data, isLoading, error} = useApi(url)
    console.log(data)
    console.error(error)

    const columns = [
      {
        field: 'student',
        headerName: 'Student Name',
        flex: 1,
        renderCell: params => {
          const name = params.value.name 
          return name
        }
      },
      { 
        field: 'paidAt',
        headerName: "Date",
        flex: 1,
        renderCell: params => {
          const formatedDate = dayjs(params.value).format("DD-MMMM-YYYY")
          return formatedDate
        }
      },
      { field: 'totalPaidAmount', headerName: 'Paid Amount', flex: 1},
      { field: 'paymentTye', headerName: 'Payment Type', flex: 1 }
    ]

  return (
    <>
      {
        <Backdrop open={isLoading}><CircularProgress /></Backdrop>
      }
      {
        !isLoading && !error && data &&

        <Card>
              <CardContent>

                <Header title="Student Payment" noBtn={true} />

                <DataTable 
                  columns={columns}
                  rows={data}
                  fileName="Ibne Haysam Income Report"
                  delete={false}
                />

              </CardContent>
        </Card>
      }
    </>
  )
}

export default IncomeReport
