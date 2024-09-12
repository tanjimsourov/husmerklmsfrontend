import { Card, CardContent, Chip, TableHead } from '@mui/material'
import React from 'react'

import Logo from '../../assets/imgs/logo_black.png'
import useApi from '../../hooks/useApi'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import Print from '../../components/Print'

const url = 'https://husmerklmsbackend.onrender.com/api/v1/studentFinancial/student-feeCollectionById'

function SingleIncomeReport() {

    const {id} = useParams()
    const {data, isLoading, error} = useApi(`${url}/${id}`)

    console.log(data)
    console.log(error)

  return (
    <>
      <Card>
            <CardContent>
                <Print>
                    <div className="row">
                        <div className="col-xs-12 col-sm-3"></div>
                        <div className="col-xs-12 col-sm-6">

                            <div className="voucer">
                                <div className="voucer_header">
                                    <img src={Logo} alt="" />
                                </div>
                                <div className="voucer_body">

                                    <div className="row" style={{margin: "10px 0"}}>
                                        <div className="col-sm-6">
                                            <h3>Trx Number</h3>
                                        </div>
                                        <div className="col-sm-6" style={{textAlign: 'right'}}>
                                            <h3>Date</h3>
                                        </div>
                                        <div className="col-sm-6">
                                            <p>{data?.tnxId}</p>
                                        </div>
                                        <div className="col-sm-6" style={{textAlign: 'right'}}>
                                            <p>{dayjs(data?.paidAt).format("DD-MM-YY")}</p>
                                        </div>
                                    </div>

                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Account Head</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            

                                                {
                                                    !isLoading && !error && data &&
                                                    data.typeOfFees.map((th=>{
                                                        return <tr>
                                                            <td>{th.title}</td>
                                                            <td>{th.paidAmount}</td>
                                                        </tr>
                                                    }))
                                                }

                                                <tr>
                                                    <td>
                                                        <h3>Total</h3>
                                                    </td>
                                                    <td>
                                                        <h2><strong>{data?.totalPaidAmount}</strong></h2>
                                                    </td>
                                                </tr>
                                            
                                        </tbody>
                                    </table>

                                </div>
                                <div className="voucer_footer">
                                    <h3>Received by....</h3>
                                </div>
                            </div>
                        </div>    

                        <div className="col-xs-12 col-sm-3"></div>
                    </div>
                </Print>
            </CardContent>
      </Card>
    </>
  )
}

export default SingleIncomeReport
