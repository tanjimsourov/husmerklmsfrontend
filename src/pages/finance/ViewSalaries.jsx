import React from 'react'
import useApi from '../../hooks/useApi'
import DataTable from '../../components/datatable/DataTable'
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';

const url = 'https://api.ibnhaysam.com/api/v1/financial/get-salary-details'

function ViewSalaries() {

    const {data, isLoading, error } = useApi(url)
    console.error(error)
    const columns = [
        {
            field: 'user',
            headerName: "User Name",
            flex: 1,
            renderCell: params => {
                return params.row?.user?.name
            }
        },
        {field: 'basicSalary', headerName: 'Basic Salary', flex: 1},
        {field: 'grossSalary', headerName: 'Gross Salary', flex: 1},
        {field: 'houseRent', headerName: 'House Rent', flex: 1},
        {field: 'medicalAllowance', headerName: 'Medical Allowance', flex: 1},
        {field: 'eidBonus', headerName: 'Eid Bonus', flex: 1},
        {field: 'overtime', headerName: 'Over Time', flex: 1},

    ]

  return (
    <div>
        <Card>
            <CardContent>
                {
                    !isLoading && !error && data && (
                        <DataTable 
                            columns={columns}
                            rows={data}
                        />
                    )
                }
            </CardContent>
        </Card>
    </div>
  )
}

export default ViewSalaries