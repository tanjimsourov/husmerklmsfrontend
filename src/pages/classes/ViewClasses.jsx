import { Card, CardContent } from '@mui/material'
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import useGetClasses from '../../hooks/useGetClasses';
import DataTable from '../../components/datatable/DataTable';

const columns = [
    {
      field: 'name',
      headerName: 'Class',
      flex: 1,
      editable: false,
      sortable: false
    },
    {
      field: 'teachers',
      headerName: 'Teacher',
      flex: 1,
      editable: false,
      sortable: false,
      renderCell: params => {
        const name = params.row?.teachers[0]?.name;
        return <span>{name}</span>;
      }
    },
    {
      field: 'students',
      headerName: 'Students',
      flex: 1,
      editable: false,
      renderCell: params => {
        const students = params.row?.students.length;
        return <span>{students}</span>;
      },
      sortable: false
    },
  ];

function ViewClasses() {

    const { classLists, isLoading, error } = useGetClasses();

  return (
    <div>
        
        <Card>
            <CardContent>
                {!isLoading && !error && classLists && (
                    <DataTable 
                        slug="classes" 
                        columns={columns} 
                        rows={classLists} 
                        disableColumnFilter
                    />
                )}
            </CardContent>
        </Card>
    </div>
  )
}

export default ViewClasses