import { Card, CardContent } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React from 'react'
import useApi from '../../hooks/useApi'
import { Link } from 'react-router-dom'
import { RiSecurePaymentFill } from 'react-icons/ri'

const url = 'https://husmerklmsbackend.onrender.com/api/v1/financial/get-users-for-salary'

const Pay = () => {

    const {data, isLoading, error } = useApi(url)

    console.log(data)

    const columns = [
        {field: "name", headerName: "Name", flex: 1},
        {field: "role", headerName: "Role", flex: 1},
        {
            field: 'pay',
            headerName: "Pay Now",
            flex: 1,
            renderCell: params => {
                return <div className='actions'>
                        <Link to={`${params.row._id}`}>
                            <RiSecurePaymentFill style={{fontSize: "1.5em"}}/>
                        </Link>
                </div>
            },
            sortable: false
        }
    ]

    

  return (
    <>
      <div className="row">

            <div className="col-12">

                {
                    !isLoading && data &&

                    <Card>
                        <CardContent>
                            <DataGrid 
                                columns={columns}
                                rows={data}
                                getRowId={(row) => row._id}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 10,
                                        },
                                    },
                                }}
                                slots={{
                                    toolbar: GridToolbar
                                }}
                                slotProps={{
                                    toolbar: {
                                        showQuickFilter: true,
                                        quickFilterProps: { debounceMs: 500 },
                                    }
                                }}
                            />
                            
                        </CardContent>
                    </Card>

                }

            </div>

      </div>
    </>
  )
}

export default Pay
