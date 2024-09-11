import { Backdrop, Button, Card, CardContent, CircularProgress } from '@mui/material'
import React from 'react'
import { Header } from '../../components'
import { Link, useParams } from 'react-router-dom'
import useApi from '../../hooks/useApi'
import DataTable from '../../components/datatable/DataTable'
import { BsPencilSquare } from 'react-icons/bs'

const url = 'https://api.ibnhaysam.com/api/v1/sections/get-section'

function ViewSingleSection() {

    const {id} = useParams();
    const editUrl = `/sections/edit/${id}`
    const {data, isLoading, error } = useApi(`${url}/${id}`)

    const columns = [
        {field: 'studentId', headerName: "ID", flex: 1},
        {field: 'name', headerName: "Name", flex: 1},
        {field: 'gender', headerName: 'gender', flex: 1},
        {field: 'bloodGroup', headerName: 'Blood Group', flex: 1},
        {field: 'fatherName', headerName: "Father Name", flex: 1},
        {field: 'fatherPhone', headerName: "Father's Phone", flex: 1},
        {field: 'fatherProfession', headerName: "Father's Profession", flex: 1},
        {field: "motherName", headerName: 'Mother Name', flex: 1},
        {field: 'motherPhone', headerName: "Mother Phone", flex: 1},
        {field: 'motherProfession', headerName: 'Mother Profession', flex: 1},
        {field: 'address', headerName: 'Address', flex: 1}
    ]

  return (
    <>
        {
            isLoading && <Backdrop open={isLoading} ><CircularProgress /></Backdrop>
        }

        {
            !isLoading && !error && data &&
        
            <Card>
                <CardContent>
                    <div>
                        <div className="edit-option">
                            <Button
                                startIcon={<BsPencilSquare />}
                                component="label"
                                variant='contained'
                                href={editUrl}
                            >
                                <Link to={editUrl}>Edit</Link>
                            </Button>
                        </div>
                    </div>
                    <Header title={data?.name} noBtn={true}/>

                    <DataTable 
                        slug={'students'}
                        columns={columns}
                        rows={data?.students}
                        noAction={true}
                    />
                </CardContent>
            </Card>
        }
      
    </>
  )
}

export default ViewSingleSection
