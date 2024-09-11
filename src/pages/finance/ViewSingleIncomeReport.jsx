import React from 'react'
import useApi from '../../hooks/useApi'
import { Card, CardContent, Stack } from '@mui/material'
import { useParams } from 'react-router-dom'
import Print from '../../components/Print'
import Logo from '../../assets/imgs/ibn haysam invoice header.png'

const url = 'https://api.ibnhaysam.com/api/v1/financial/getSingleSalaryDetails'

const ViewSingleIncomeReport = () => {

  const {id} = useParams()
  console.log(id)
  const {data, isLoading, error} = useApi(`${url}/${id}`)

  console.log(data)

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

                                    <div className="row">
                                        <div className="col-sm-6 flex" style={{marginBottom: '1em'}}>
                                            <Stack spacing={2}>
                                                <h3>Name: {data?.user.name}</h3>
                                                <h3>Email: {data?.user.email}</h3>
                                            </Stack>
                                        </div>
                                    </div>

                                    <table>

                                        <tbody>
                                                    
                                                <tr>
                                                    <td>Basic Salary</td>
                                                    <td>{data?.basicSalary}</td>
                                                </tr>
                                                <tr>
                                                    <td>Eid Bonus</td>
                                                    <td>{data?.eidBonus}</td>
                                                </tr>
                                                <tr>
                                                    <td>House Rent</td>
                                                    <td>{data?.houseRent}</td>
                                                </tr>
                                                <tr>
                                                    <td>Medical Allowance</td>
                                                    <td>{data?.medicalAllowance}</td>
                                                </tr>
                                                    
                                        </tbody>

                                    </table>

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

export default ViewSingleIncomeReport
