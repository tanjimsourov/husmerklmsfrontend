import { Backdrop, Card, CardContent, CircularProgress } from '@mui/material'
import React from 'react'
import DataTable from '../../components/datatable/DataTable'
import { Header } from '../../components'
import useApi from '../../hooks/useApi'

const url = 'https://api.ibnhaysam.com/api/v1/exams/get-exams'

function ViewExam() {

    const {data, isLoading, error} = useApi(url)
    console.log(data)
    const columns = [
        { field: "name", headerName: 'Exam Name', flex: 1 },
        { field: 'Year', headerName: 'Year', flex: 1}
    ]

    const rows = [
        {_id: 1, name: "Final", description: "Yearly Final Exam"}
    ]

  return (
    <div>
        {
            <Backdrop open={isLoading}><CircularProgress /></Backdrop>
        }
        <Card>
            <CardContent>
                <Header title="Exams" />

                {
                    !isLoading && !error && data && 
                    <DataTable 
                        slug="exams"
                        columns={columns}
                        rows={data}
                    />
                }
            </CardContent>
        </Card>
    </div>
  )
}

export default ViewExam
