import { Backdrop, Card, CardContent, CircularProgress } from '@mui/material'
import React from 'react'
import { Header } from '../../components'
import { useParams } from 'react-router-dom'
import useApi from '../../hooks/useApi'
import DataTable from '../../components/datatable/DataTable'

const url = 'https://api.ibnhaysam.com/api/v1/studentFinancial/student-feeDistributionByYear'

function ViewFeeDistribution() {

    const {year} = useParams()
    const {data, isLoading, error} = useApi(`${url}/${year}`)

    console.log(data)
    console.error(error)

    const columns = [
        {
            field: 'classLevel',
            headerName: "Class",
            width: 200,
            renderCell: params => {
                return params.value.name
            }
        },
        { field: 'admissionForm', headerName: 'Admission Form Fee', width: 200 },
        { field: 'clubScout', headerName: 'Club Scout', width: 120 },
        { field: 'culturalFee', headerName: 'Cultural Fee', width: 100 },
        { field: 'fine', headerName: 'Fine', width: 80 },
        { field: 'firstSemester', headerName: 'First Semester Fee', width: 200 },
        { field: 'idCard', headerName: 'ID Card Fee', width: 100 },
        { field: 'libraryLab', headerName: 'Library Lab Fee', width: 200 },
        { field: 'monthlyTuitionFee', headerName: 'Monthly Tuition Fee', width: 200 },
        { field: 'registrationFee', headerName: 'Registration Fee', width: 200 },
        { field: 'secondSemester', headerName: 'Second Semester Fee', width: 200 },
        { field: 'sessionFee', headerName: 'Session Fee', width: 100 },
        { field: 'sportsFee', headerName: 'Sports Fee', width: 100 },
        { field: 'studyTour', headerName: 'Study Tour Fee', width: 150 },
        { field: 'testimonialFee', headerName: 'Testimonial Fee', width: 200 },
    ]

  return (
    <>
        {
            <Backdrop open={isLoading}><CircularProgress /></Backdrop>
        }
      <Card>
            <CardContent>
                <Header title={`View Fee Distribution ${year}`} noBtn={true} />

                {
                    !isLoading && !error && data && 

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

export default ViewFeeDistribution
