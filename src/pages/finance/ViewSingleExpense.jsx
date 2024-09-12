import React from 'react'
import { useParams } from 'react-router-dom'
import useApi from '../../hooks/useApi'
import { Card, CardContent, Chip, Stack } from '@mui/material'

import InvoiceHeader from '../../assets/imgs/ibn haysam invoice header.png'
import dayjs from 'dayjs'
import Print from '../../components/Print'

const url = `https://husmerklmsbackend.onrender.com/api/v1/expense/expenses`

const ViewSingleExpense = () => {

    const {id} = useParams()
    const { data, isLoading, error } = useApi(`${url}/${id}`)

    console.log(data)

  return (
    <>
        <Print>
            
            <div className="row">
                <div className="col-xs-12 col-sm-3"></div>
                <div className="col-xs-12 col-sm-6">
                    <Card>
                        <CardContent>
                            <div className="invoice">
                                <Stack spacing={2}>

                                    <div className="header">
                                        <img src={InvoiceHeader} alt="Invoice Header Image" />
                                    </div>

                                    <div className='flex justify-content-center'>
                                        <Chip label="Credit Voucher" />
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <h2>Transaction ID: {data?.expense._id}</h2>
                                        </div>
                                        <div className="col-6">
                                            <h2 style={{textAlign: 'right'}}>Date: { dayjs(data?.expense.date).format("DD MMM YYYY") }</h2>
                                        </div>
                                    </div>

                                    <div className="invoice-body">
                                        <table className='table table-striped table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{data?.expense.name}</td>
                                                    <td>{data?.expense.amount}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="invoice-footer" style={{marginTop: '3em'}}>
                                        <p>Received By</p>
                                    </div>

                                </Stack>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="col-xs-12 col-sm-3"></div>
            </div>

        </Print>
    </>
  )
}

export default ViewSingleExpense
