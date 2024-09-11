import { Backdrop, Button, Card, CardContent, Chip, CircularProgress, Stack } from '@mui/material'
import React from 'react'
import DataTable from '../../components/datatable/DataTable';
import { useNavigate, useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';

const url = 'https://api.ibnhaysam.com/api/v1/rooms/get-room';

function SingleRoom() {

  const navigate = useNavigate()
  const {roomId: id} = useParams()
  const {data, isLoading, error } = useApi(`${url}/${id}`)

    console.error(error)
    console.log("Data: ", data)

    const columns = [

        {
          field: 'name',
          headerName: 'Room Number',
          width: 150,
          editable: false,
        },
        {
          field: 'status',
          headerName: 'Status',
          flex: 1,
          editable: false,
          renderCell: params => {

            if(params.row.status === "vacant"){
              return <Chip label="Vacant" color="success" />
            }else{
              return <Chip label="Occupied" />
            }

          }
        },
        
      ];

    // const rows = [
    //     {_id: 1, "roomNumber": 1002, status: 1},
    //     {_id: 2, "roomNumber": 1002, status: 1},
    //     {_id: 3, "roomNumber": 1002, status: 1},
    //     {_id: 4, "roomNumber": 1002, status: 0}
    // ]
  return (
    <>
      {isLoading && <Backdrop open={true}><CircularProgress /></Backdrop>}
      {!isLoading && !error && data?.seats && (
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <div>
                <Button onClick={()=>navigate(-1)} variant='contained'>Go Back</Button>
              </div>
              <DataTable 
                columns={columns}
                rows={data.seats}
                slug="rooms"
              />
            </Stack>
          </CardContent>
        </Card>
      )}
    </>

  )
}

export default SingleRoom
