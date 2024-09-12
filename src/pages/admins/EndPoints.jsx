import React from 'react'
import useApi from '../../hooks/useApi';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


const url = 'https://husmerklmsbackend.onrender.com/api/v1/get-routes';

function EndPoints() {
    const {data, isLoading, error } = useApi(url)

    console.log(data)

    const columns = [
        {field: 'path', headerName: 'Path', flex: 1 }
    ]
    // const rows = []

  return (
    <div>

            {
                !isLoading && data && !error &&
                <DataGrid 
                    rows={data}
                    columns={columns}
                    getRowId={row=>row.path}
                    slots={{
                        toolbar: GridToolbar
                    }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                         },
                    }}
                />
            }

      
    </div>
  )
}

export default EndPoints
