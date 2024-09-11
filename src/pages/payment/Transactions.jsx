import { DataGrid } from '@mui/x-data-grid';
import React, {useEffect, useState } from 'react'
import axios from 'axios'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import DataTable from '../../components/datatable/DataTable';
import { Card, CardContent } from '@mui/material';
import dayjs from 'dayjs';

const url = 'https://api.ibnhaysam.com/api/v1/studentFinancial/get-student-financial'

function Transactions() {

    const authHeader = useAuthHeader()

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchData = async()=>{
            setIsLoading(true)
            setError(null)

            try{

                const headers = {
                    "Authorization": authHeader,
                }

                const response = await axios.get(url, {headers: headers})
                setData(response.data.data)
            }catch(error){
                setError(error.message)
            }finally{
                setIsLoading(false)
            }
        }

        fetchData();

        return ()=>{}
    }, [])

    console.log(data)

    const columns = [
        {
            field: 'student',
            headerName: 'Student',
            flex: 1,
            editable: false,
            renderCell:(param)=>{
                return(
                    param.value?.name
                )
            }
        },
        {
            field: 'month',
            headerName: "Month",
            flex: 1,
            editable: false,
            renderCell: (param)=>{
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                const month = new Date(param.value).getMonth()
                console.log(months[month])
                return(
                    months[month]
                )
            }
        },
        {
            field: 'year',
            headerName: 'Year',
            flex: 1,
            editable: false, 
            renderCell: (params)=>{
                const year = new Date(params.value).getFullYear();
                
                return(
                    year
                )
            }            
        },
        {
            field: 'totalAmount',
            headerName: 'Total Amount',
            flex: 1,
            editable: false,
        },

    ]

  return (
    <div>
        <Card>
            <CardContent>
            {
                !isLoading && !error && data && data.length > 0 &&

                <DataTable 
                    slug="payment"
                    columns={columns}
                    rows={data}
                />
            }
            </CardContent>
        </Card>
    </div>
  )
}

export default Transactions