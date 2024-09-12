import React from 'react'
import {Header} from '../../components/'
import DataTable from '../../components/datatable/DataTable'
import Card from '@mui/material/Card'
import { CardContent, CircularProgress } from '@mui/material'
import useApi from '../../hooks/useApi';

const url = 'https://husmerklmsbackend.onrender.com/api/v1/subjects/get-subjects';

function Courses() {
  const { data, isLoading, error } = useApi(url);
  console.log(data)

  const columns = [
    { field: 'name', headerName: 'Subject name', flex: 1 },
    { field: 'subjectCode', headerName: 'Subject Code', flex: 1 },
  ];


  return (
    <Card>
      <CardContent>
          <Header title="Subjects" />
            {isLoading && <div><CircularProgress /></div>}
              {
                !isLoading && !error && data &&
              
                <DataTable slug="subjects" columns={columns} rows={data} />
                
              }
      </CardContent>
    </Card>
  )
}

export default Courses