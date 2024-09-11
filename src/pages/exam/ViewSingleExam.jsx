import { Backdrop, Card, CardContent, CircularProgress, Stack, TextField } from '@mui/material'
import React from 'react'
import DataTable from '../../components/datatable/DataTable'
import { Header } from '../../components'
import useApi from '../../hooks/useApi'
import { useParams } from 'react-router-dom'

const url = 'https://api.ibnhaysam.com/api/v1/exams/get-exam'

function ViewExam() {

    const {id} = useParams()
    const {data, isLoading, error} = useApi(`${url}/${id}`)
    console.log(data)
    

  return (
    <div>
        {
            <Backdrop open={isLoading}><CircularProgress /></Backdrop>
        }

        {
            !isLoading && !error && data &&
            <Card>
                <CardContent>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6">

                            <Stack spacing={2}>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Name" 
                                    variant="outlined"
                                    value={data.name}
                                />
                                <TextField 
                                    id="outlined-basic" 
                                    label="Year" 
                                    variant="outlined"
                                    value={data.Year}
                                />
                            </Stack>
                            
                        </div>
                    </div>
                </CardContent>
            </Card>
        }
        
    </div>
  )
}

export default ViewExam
