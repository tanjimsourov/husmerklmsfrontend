import { Backdrop, Button, Card, CardContent, CircularProgress, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import StudentListSelection from '../../components/studentListSelection/StudentListSelection';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const url = 'https://api.ibnhaysam.com/api/v1/studentFinancial/add-student-financial';
const desiredUrl = 'payment/transactions'
function Payment({data, year}) {
    const authHeader = useAuthHeader()
    const [loading, setLoading] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const [total, setTotal] = useState(0)

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            month: null,
            year: year,
            feeAmount: 0,
            monthlyFee: 0,
            discount: 0,
            studentId: null,
        },
        validationSchema: Yup.object().shape({
            month: Yup.string(),
            year: Yup.string(),
            feeAmount: Yup.number(),
            registrationFeeDiscount: Yup.number(),
            monthlyFee: Yup.number(),
            monthlyDiscount: Yup.number(),
            studentId: Yup.string(),
        }),
        enableReinitialize: true,
        onSubmit: async (values, {resetForm}) => {
            //handleKeyPress()
            try{
                setLoading(true)
                      
                const headers = {
                    "Authorization": authHeader,
                    "Content-Type": "application/json"
                }

                let totalAmount = 0;
                selectedRows.map(row => {
                    totalAmount += Number(row.feeAmount)

                    return(()=>{})
                })

                const updateValues = {...values, totalAmount: totalAmount, paymentType: "Cash", typeOfFees: selectedRows}

                console.log(updateValues)
                
                const updatedValuesJson = JSON.stringify(updateValues)

                const response = await axios.post(`${url}`, updatedValuesJson, {headers: headers} )
  
                console.log('Registration successful:', response.data);
                toast(response.data.message)

  
                if (response.data.status === "success") {
                  setLoading(false)
                  navigate(`/${desiredUrl}/${response.data.data._id}`);
                } else{
                    setLoading(false)
                }
  
                resetForm();
            }catch(error){
                console.error('Error:', error);
                toast(error.message)
                setLoading(false)
            }finally{
                setLoading(false)
            }
        }
    })

    const columns = [
        {
            field: 'title',
            headerName: 'Name',
            flex: 1,
            editable: false
        },
        {
            field: 'feeAmount',
            headerName: "Fee Amount",
            flex: 1,
            editable: false
        },
        {
            field: 'paidAmount',
            headerName: 'Pay Amount',
            flex: 1,
            editable: true,            
        }
    ]

    const [rows, setRows] = useState([]);

    useEffect(()=>{
        setRows(
            [
                {
                    id: '101',
                    title: 'Registration Fee',
                    feeAmount: data?.registrationFee,
                    paidAmount: 0,
                    name:"feeAmount"
                },
                {
                    id: '102',
                    title: 'Monthly Fee',
                    feeAmount: data?.monthlyTuitionFee,
                    paidAmount: 0,
                    name: "monthlyFee"
                },
                {
                    id: '103',
                    title: "Session Fee",
                    feeAmount: data?.sessionFee,
                    paidAmount: 0,
                    name: 'sessionFee'
                },
                {
                    id: '104',
                    title: "1st Semester",
                    feeAmount: data?.firstSemester,
                    paidAmount: 0,
                    name: '1stSemester'
                },{
                    id: '105',
                    title: "2nd Semester",
                    feeAmount: data?.secondSemester,
                    paidAmount: 0,
                    name: '2stSemester'
                },
                {
                    id: '106',
                    title: "Sports fee",
                    feeAmount: data?.sportsFee,
                    paidAmount: 0,
                    name: 'sportsFee'
                },
                {
                    id: '107',
                    title: "Id Card",
                    feeAmount: data?.idCard,
                    paidAmount: 0,
                    name: 'idCard'
                },
                {
                    id: '108',
                    title: "Cub/Scout",
                    feeAmount: data?.clubScout,
                    paidAmount: 0,
                    name: 'cubScout'
                },
                {
                    id: '109',
                    title: "Library and Lab",
                    feeAmount: data?.libraryLab,
                    paidAmount: 0,
                    name: 'libraryAndLab'
                },
                {
                    id: '110',
                    title: "Study Tour",
                    feeAmount: data?.studyTour,
                    paidAmount: 0,
                    name: 'studyTour'
                },
                {
                    id: '111',
                    title: "Testimonial Fee",
                    feeAmount: data?.testimonialFee,
                    paidAmount: 0,
                    name: 'testimonialFee'
                },
                {
                    id: '112',
                    title: "Admission Form",
                    feeAmount: data?.admissionForm,
                    paidAmount: 0,
                    name: 'admissionForm'
                },
                {
                    id: '113',
                    title: "Cultural Fee",
                    feeAmount: data?.culturalFee,
                    paidAmount: 0,
                    name: 'culturalFee'
                },
                {
                    id: '114',
                    title: "Late Fine",
                    feeAmount: data?.fine,
                    paidAmount: 0,
                    name: 'lateFine'
                },
                {
                    id: '115',
                    title: "Previous due",
                    feeAmount: data?.previousDue || 0,
                    paidAmount: 0,
                    name: 'previousDue'
                }
            ]
        )
    }, [data])
    
    const handleRowSelectionChange = (ids) => {
        const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
        setSelectedRows(selectedRowsData)
        console.log(selectedRows)
    };

    useEffect(()=>{
        let total = 0;
        selectedRows.map((selectedRow)=>{
            total += Number(selectedRow.paidAmount)
            return 0;
        })
        setTotal(total)
    }, [selectedRows])

    const handleProcessRowUpdate = (currentRow)=>{
        const rowIndex = rows.findIndex((row) => row.id === currentRow.id);
        const updatedRows = [...rows]
        currentRow.paidAmount = Number(currentRow.paidAmount)
        updatedRows[rowIndex] = currentRow;
        setRows(updatedRows)

        return updatedRows
    }

    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
          keyEvent.preventDefault();
        }
    }

  return (
    <div>
          {
              loading &&
              <Backdrop open={loading}>
                  <CircularProgress />
              </Backdrop>
          }
          {
            <ToastContainer />
          }

        <Card>
            <CardContent>
                <form onKeyDown={onKeyDown} onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-xs-12 col-sm-6">

                            <Stack spacing={2}>

                                <StudentListSelection 
                                    value={formik.values?.studentId}
                                    onChange={(event, newValue)=>{
                                        formik.setFieldValue("studentId", newValue?.id)
                                    }}
                                />

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker', 'DateRangePicker']}>

                                        <DatePicker 
                                            views={['month']}
                                            name="month" 
                                            label="Month"
                                            onChange={(newValue) => {
                                                formik.setFieldValue('month', dayjs(newValue).format("MMMM"));
                                            }}
                                            renderInput={(params)=> <TextField {...params} />}
                                        />

                                    </DemoContainer>
                                </LocalizationProvider>

                                <DataGrid
                                    //editMode='row'
                                    rows={rows.filter(row => row.feeAmount !== null)}
                                    columns={columns}
                                    checkboxSelection
                                    disableColumnMenu
                                    getRowId={(row) => row && row.id}
                                    disableRowSelectionOnClick
                                    onRowSelectionModelChange={handleRowSelectionChange}
                                    processRowUpdate={(currentRow, prevRow)=>{
                                        handleProcessRowUpdate(currentRow);
                                    }}            
                                    onProcessRowUpdateError={(e) => console.log(e)}
                                    isCellEditable={(params) => params.row.feeAmount !== null}
                                />                                

                            </Stack>
                            
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <Stack spacing={2}>

                                <TableContainer component={Paper}>
                                    
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Title</TableCell>
                                                <TableCell/>
                                                <TableCell align='right'></TableCell>
                                                <TableCell align='right'>Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                selectedRows.map(selectedRow=>(

                                                    <TableRow key={selectedRow.id}>
                                                        <TableCell>{selectedRow.title}</TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell align='right'>{Number(selectedRow.paidAmount)}</TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                            <TableRow>
                                                <TableCell rowSpan={3} />
                                                <TableCell colSpan={2}>Total</TableCell>
                                                <TableCell align='right'>{total}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <Button variant='contained' type="submit" >Submit</Button>

                            </Stack>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
        
    </div>
  )
}

export default Payment