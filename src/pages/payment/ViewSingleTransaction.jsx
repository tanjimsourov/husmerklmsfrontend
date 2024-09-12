import React from 'react'
import { useParams } from 'react-router-dom'
import useApi from '../../hooks/useApi'
import { Backdrop, Card, CardContent, CircularProgress, Stack } from '@mui/material'
import dayjs from 'dayjs'
import Print from '../../components/Print'

const url = 'https://husmerklmsbackend.onrender.com/api/v1/studentFinancial/student-feeCollectionById'

function ViewSingleTransaction() {

  const {id} = useParams()

  const {data, isLoading, error} = useApi(`${url}/${id}`)

  console.log(data)

  return (
    <div>
      {
        <Backdrop open={isLoading}><CircularProgress /></Backdrop>
      }
      {
        !isLoading && !error && data &&
        <Card>
            <CardContent>

              <Print>
                  <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <Stack spacing={2}>
                          <div>
                            <h1>Ibn Haysam Biggan Madrasah</h1>
                            <h2>INVOICE</h2>
                            <h4>Month: {data.month}</h4>
                            <h4>{data.tnxId}</h4>
                          </div>
                          <div className="divider"></div>
                          <div>
                            <h1>Billed To</h1>
                            <h3>{data.student.studentId}</h3>
                            <h3>{data.student.name}</h3>
                          </div>

                          <div className="invoice-header">
                              <div className="row">
                                  <div className="col-xs-12 col-sm-4">
                                    <h4>Issue Date: {dayjs(data.paidAt).format("DD MMM YYYY")}</h4>
                                  </div>
                                  <div className="col-xs-12 col-sm-4">
                                    <h4>Total Amount: {data.totalAmount}</h4>
                                  </div>
                                  <div className="col-xs-12 col-sm-4">
                                    <h4>Due Amount: {data.dueAmount}</h4>
                                  </div>
                              </div>
                          </div>
                          <div className="invoice-body">
                              <table className='table'>
                                <thead>
                                    <tr>
                                      <th>Description</th>
                                      <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                      data.typeOfFees.map(fee => (
                                        <tr>
                                            <td><h4>{fee.title}</h4></td>
                                            <td><h4>{fee.paidAmount}</h4></td>
                                        </tr>
                                      ))
                                    }
                                </tbody>
                              </table>
                          </div>
                          <div>
                                    <h1>Total: {data.totalPaidAmount}</h1>
                          </div>                  
                        </Stack>
                    </div>
                    
                    <div className="col-xs-12 col-sm-6">
                      
                        
                        <Stack spacing={2}>
                          <div>
                            <h1>Ibn Haysam Biggan Madrasah</h1>
                            <h2>INVOICE</h2>
                            <h4>Month: {data.month}</h4>
                            <h4>{data.tnxId}</h4>
                          </div>
                          <div className="divider"></div>
                          <div>
                            <h1>Billed To</h1>
                            <h3>{data.student.studentId}</h3>
                            <h3>{data.student.name}</h3>
                          </div>

                          <div className="invoice-header">
                              <div className="row">
                                  <div className="col-xs-12 col-sm-4">
                                    <h4>Issue Date: {dayjs(data.paidAt).format("DD MMM YYYY")}</h4>
                                  </div>
                                  <div className="col-xs-12 col-sm-4">
                                    <h4>Total Amount: {data.totalAmount}</h4>
                                  </div>
                                  <div className="col-xs-12 col-sm-4">
                                    <h4>Due Amount: {data.dueAmount}</h4>
                                  </div>
                              </div>
                          </div>
                          <div className="invoice-body">
                              <table className='table'>
                                <thead>
                                    <tr>
                                      <th>Description</th>
                                      <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                      data.typeOfFees.map(fee => (
                                        <tr>
                                            <td><h4>{fee.title}</h4></td>
                                            <td><h4>{fee.paidAmount}</h4></td>
                                        </tr>
                                      ))
                                    }
                                </tbody>
                              </table>
                          </div>
                          <div>
                                    <h1>Total: {data.totalPaidAmount}</h1>
                          </div>                  
                        </Stack>


                    </div>
                  </div>

              </Print>
                

            </CardContent>
        </Card>
      }
    </div>
  )
}

export default ViewSingleTransaction
