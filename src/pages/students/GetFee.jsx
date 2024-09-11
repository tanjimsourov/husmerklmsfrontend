import { Backdrop, Card, CardContent, Chip, CircularProgress, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import dayjs from 'dayjs'
import { GrView } from 'react-icons/gr'

const url = 'https://api.ibnhaysam.com/api/v1/studentFinancial/student-feeCollectionByStudent'

function GetFee() {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const {id} = useParams()
  const [typeOfFees, setTypeOfFees] = useState([])


  const authHeader = useAuthHeader()

  const apiCall = async ()=>{
    try{

      setIsLoading(true)

      const headers = {
        "Authorization": authHeader,
        "Content-Type": "application/json"
      }

      const response = await axios.get(`${url}/${id}`, {headers: headers})

      console.log(response)
      setData(response.data.data)

      if(response.status === 200){
        toast.success(response.message)
        setIsLoading(false)
      }else{
        toast.error(response.message)
      }

    }catch(error){
      setIsLoading(false)
      console.error(error)
      toast.error(error.message)
      setError(error)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{

    apiCall()

    return(()=>{})
  }, [])

  const handleView = (typeOfFees)=> {
    setTypeOfFees(typeOfFees)
  }

  const columns = [
    {
      field: 'tnxId',
      headerName: 'Tnx Id',
      flex: 1,
      editable: false
    },
    {
      field: 'month',
      headerName: 'Month',
      flex: 1,
      editable: false
    },
    {
      field: 'paidAt',
      headerName: 'Date',
      flex: 1,
      editable: false,
      renderCell: params=>{

        const fullDate = dayjs(params.value).format('DD-MMM-YYYY')

        return fullDate

      }
    },
    {
      field: 'totalAmount',
      headerName: 'Total Amount',
      flex: 1,
      editable: false,
      renderCell: params => {
        return params.value > 0 ? <Chip color="info" label={params.value} /> : ''
      }
    },
    {
      field: 'totalPaidAmount',
      headerName: 'Paid Amount',
      flex: 1,
      editable: false,
      renderCell: params => {
        return <Chip color="success" label={params.value} />
      }
    },
    {
      field: 'totalDue',
      headerName: 'Total Due',
      flex: 1,
      editable: false,
      renderCell: params => {
        return <Chip color="error" label={params.value} />
      }
    },
    {
      field: "typeOfFees",
      headerName: "Action",
      width: 100,
      renderCell: params => {
        return <div onClick={()=> handleView(params.value)} className='actions'>
            <GrView />
        </div>
      }
    }

  ]

  const trxCol = [
    {field: 'title', headerName:"Title", flex: 1},
    {field: 'paidAmount', headerName: 'Paid Amount', flex: 1}
  ]

  return (
    <>
      {
        toast && <ToastContainer />
      }
      {
        <Backdrop open={isLoading}><CircularProgress /></Backdrop>
      }
      <Stack spacing={2}>

        {
          !isLoading && !error && data &&
          <Card>
                <CardContent>
                    <DataGrid 
                      rows={data}
                      columns={columns}
                      checkboxSelection={false}
                      disableColumnMenu
                      disableRowSelectionOnClick
                      getRowId={row => row && row.tnxId}
                    />
                </CardContent>
          </Card>
        }
        {
          typeOfFees && typeOfFees?.length > 0 && 
          <Card>
            <CardContent>
                <DataGrid 
                  columns={trxCol}
                  rows={typeOfFees}
                  checkboxSelection={false}
                  disableColumnMenu
                  disableRowSelectionOnClick
                  getRowId={row => row && row._id}
                />
            </CardContent>
          </Card>
        }

      </Stack>
    </>
  )
}

export default GetFee
