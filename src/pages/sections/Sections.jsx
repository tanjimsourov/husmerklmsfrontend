import React from 'react'
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import useApi from '../../hooks/useApi';
import DataTable from '../../components/datatable/DataTable';

const url = 'https://api.ibnhaysam.com/api/v1/sections/get-sections';

function Sections() {
    const { data, isLoading, error } = useApi(url);

    console.log(data)

    const columns = [
        { field: 'name', headerName: 'Section name', flex: 1 },
        { 
            field: 'classLevel', 
            headerName: 'Class name', 
            flex: 1,
            renderCell: (params) => {
                const className = params.value?.name || '';
                return <span>{className}</span>;
            },
        },
        {
            field: 'students',
            headerName: 'Students',
            flex: 1,
            renderCell: (params) => {
                const students = params.value?.length || '';
                return <span>{students}</span>
            }
        }
      ];

  return (
    <div>
        <Card>
            <CardContent>
                {!isLoading && !error && data && (
                    <DataTable 
                        slug="sections" 
                        columns={columns} 
                        rows={data} 
                    />
                )}
            {error && <div>Error: {error.message}</div>}
            </CardContent>
        </Card>
    </div>
  )
}

export default Sections