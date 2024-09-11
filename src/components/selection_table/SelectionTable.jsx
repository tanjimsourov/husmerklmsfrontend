import { Card, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'

function SelectionTable() {

    const [selectedList, setSelectedList] = useState([ 1, 4 ])

    console.log("Selected List: ", selectedList)

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        {
          field: 'firstName',
          headerName: 'First name',
          flex: 1,
          editable: true,
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          flex: 1,
          editable: true,
        },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          flex: 1,
          editable: true,
        },
      ];
      
      const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];

  return (
    <>
      <Card>
        <CardContent>
            <DataGrid 
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5
                        }
                    }
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={item=> setSelectedList(item)}
                rowSelectionModel={selectedList}
            />
        </CardContent>
      </Card>
    </>
  )
}

export default SelectionTable
