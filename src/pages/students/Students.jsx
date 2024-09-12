import React from 'react';
import { Header } from '../../components';
import DataTable from '../../components/datatable/DataTable';
import Card from '@mui/material/Card';
import { CardContent, CircularProgress } from '@mui/material';
import useApi from '../../hooks/useApi';

const url = 'https://husmerklmsbackend.onrender.com/api/v1/students/get-students';

function Students() {
  const { data, isLoading, error } = useApi(url);

  console.log(data)

  const columns = [
    { field: 'studentId', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Student name', flex: 1 },
    { field: 'email', headerName: 'Student Email', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'bloodGroup', headerName: 'Blood Group', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { 
      field: 'classLevel', 
      headerName: 'Class', 
      flex: 1,
      renderCell: (params) => {
        const className = params.value?.name || '';
        return className;
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
    <div>
      <Header title='Students' />
      <Card>
        <CardContent>
          {isLoading && <div><CircularProgress /></div>}
          {!isLoading && !error && data && (
            <DataTable 
              slug="students" 
              columns={columns} 
              rows={data} 
            />
          )}
          {error && <div>Error: {error.message}</div>}
        </CardContent>
      </Card>
    </div>
  );
}

export default Students;
