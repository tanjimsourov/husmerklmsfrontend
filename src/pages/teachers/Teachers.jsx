import React from 'react'
import {Header} from '../../components/'
import DataTable from '../../components/datatable/DataTable'
import Card from '@mui/material/Card'
import { CardContent } from '@mui/material'
import useApi from '../../hooks/useApi';

const url = 'https://husmerklmsbackend.onrender.com/api/v1/teachers/get-teachers';

function Teachers() {

    const { data, isLoading, error } = useApi(url);

    const columns = [
        { field: 'teacherId', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Teacher name', flex: 1 },
        { field: 'email', headerName: 'Teacher Email', flex: 1 },
        { field: 'gender', headerName: 'Gender', flex: 1 },
        { field: 'bloodGroup', headerName: 'Blood Group', flex: 1 },
        { field: 'phone', headerName: 'Phone', flex: 1 },
        { 
          field: 'classLevel', 
          headerName: 'Class', 
          flex: 1,
          renderCell: (params) => {
            const className = params.row?.classLevels?.name || '';
            return <span>{className}</span>;
          },
        },
        { 
          field: 'section', 
          headerName: 'Section', 
          flex: 1,
          renderCell: (params) => {
            const section = params.value?.name || '';
            return <span>{section}</span>
          }
        }
      ];
      
  return (
    <>
        <Header title='Teachers' />
        <Card>
            <CardContent>
              {
                !isLoading && !error && data &&
              
                <DataTable slug="teacher" columns={columns} rows={data} />
                
              }
            </CardContent>
        </Card>
    </>
  )
}

export default Teachers