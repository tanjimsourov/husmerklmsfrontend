import React from 'react'
import useApi from '../../hooks/useApi'
import { Backdrop, Button, Card, CardContent, CircularProgress, Stack, TextField } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { Header } from '../../components'
import { BsPencilSquare } from 'react-icons/bs'

const url = 'https://api.ibnhaysam.com/api/v1/user/get-user'

function ViewSingleEmployee() {

    const {id} = useParams()
    const editUrl = `/employees/edit/${id}`
    const {data, isLoading, error} = useApi(`${url}/${id}`)


  return (
    <>

        {
            isLoading && <Backdrop open={isLoading}><CircularProgress /></Backdrop>
        }

        {
            !isLoading && data && (
                <Card>
                    <CardContent>

                        <div style={{position: 'relative'}}>
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

                        <Header title={data.name} noBtn={true} />

                        <div className="row">
                            <div className="col-xs-12 col-sm-5">
                                <Stack spacing={2}>
                                    <TextField 
                                        value={data?.role}
                                        label="Role"
                                        InputProps={{
                                            readOnly: true
                                        }}
                                    />
                                    
                                    <TextField 
                                        value={data?.email}
                                        label="Email"
                                        InputProps={{
                                            readOnly: true
                                        }}
                                    />

                                    <TextField 
                                        value={data?.name}
                                        label="Name"
                                        InputProps={{
                                            readOnly: true
                                        }}
                                    />

                                </Stack>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            )
        }
      
    </>
  )
}

export default ViewSingleEmployee
