import { Backdrop, Card, CardContent, CircularProgress } from '@mui/material'
import React from 'react'
import useApi from '../../hooks/useApi'

const url = 'https://api.ibnhaysam.com/api/v1/studentFinancial//student-feeCollectionByTypes'

function GetReportByType() {

  const {data, isLoading, error} = useApi(url)

  return (
    <>
      {
        <Backdrop open={isLoading}><CircularProgress /></Backdrop>
      }
      {
        !isLoading && data && !error &&

        <Card>
            <CardContent>
                {console.log(data)}
            </CardContent>
        </Card>

      }
    </>
  )
}

export default GetReportByType
