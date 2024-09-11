import { Backdrop, Card, CardContent, CircularProgress } from '@mui/material';
import React from 'react'
import DataTable from '../../components/datatable/DataTable';
import { Header } from '../../components';
import useApi from '../../hooks/useApi';
import dayjs from 'dayjs';

const url = 'https://api.ibnhaysam.com/api/v1/users/get-only-editors'

function Employees() {

    const {data: users, isLoading, error} = useApi(url)

    const columns = [
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        {field: 'role', headerName: 'Role', flex: 1}
      ];

  return (
    <div>
      
        {
            isLoading && <Backdrop open={isLoading}><CircularProgress /></Backdrop>
        }

        <Card>
            <CardContent>
                <Header title="Employees" />
                {
                    !isLoading && !error && users &&
                    <DataTable 
                        slug="employees"
                        columns={columns}
                        rows={users}
                    />
                }
            </CardContent>
        </Card>

    </div>
  )
}

export default Employees
