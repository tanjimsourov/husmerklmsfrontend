import { Card, CardContent, Stack } from '@mui/material'
import React from 'react'
import { PiStudentBold } from 'react-icons/pi'
import useGetStudents from '../../hooks/useGetStudents'
import useApi from '../../hooks/useApi'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { MdMoney, MdMoneyOff } from 'react-icons/md'
import { BarChart } from '@mui/x-charts'
import MaleFemaleStudentRation from '../../components/MaleFemaleStudentRation'

function Dashboard() {

  const {students, isLoading, error} = useGetStudents()
  const {data, isLoading: isApiLoading, error: isApiError} = useApi('https://husmerklmsbackend.onrender.com/api/v1/teachers/get-teachers');
  const {data: totalExpense, isLoading: expenseLoading, error: expenseError} = useApi('https://husmerklmsbackend.onrender.com/api/v1/expense/monthly-total-expense')
  const {data: totalIncome, isLoading: incomeLoading, error: incomeError} = useApi('https://husmerklmsbackend.onrender.com/api/v1/studentFinancial/totalFeeCollectionCurrentMonth')

  return (
    <>

        <Stack spacing={2}>

          <div className="row">
            <div className="col-xs-12 col-sm-4 col-md-3">
                <Card>
                    <CardContent>
                      <div className="result-showing-box flex align-items-center">
                        <div className="result-icon">
                            <PiStudentBold />
                        </div>
                        <div className="result-content">
                            <h2 className="result-name">Students</h2>
                            <h1>
                              {
                                !isLoading && !error && students &&
                                students.length
                              }
                            </h1>
                        </div>
                    </div>
                    </CardContent>
                </Card>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-3">
                <Card>
                    <CardContent>
                      <div className="result-showing-box flex align-items-center">
                        <div className="result-icon">
                            <FaChalkboardTeacher />
                        </div>
                        <div className="result-content">
                            <h2 className="result-name">Teachers</h2>
                            <h1>
                              {
                                !isApiLoading && !isApiError && data &&
                                data.length
                              }
                            </h1>
                        </div>
                    </div>
                    </CardContent>
                </Card>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-3">
                <Card>
                    <CardContent>
                        <div className="result-showing-box flex align-items-center">
                            <div className="result-icon">
                                <MdMoney />
                            </div>
                            <div className="result-content">
                                <h2 className="result-name">Current Income</h2>
                                <h1>
                                  {
                                    !incomeLoading &&
                                    totalIncome
                                  }
                                </h1>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-3">
              <Card>
                  <CardContent>
                      <div className="result-showing-box flex align-items-center">
                            <div className="result-icon">
                                <MdMoneyOff />
                            </div>
                            <div className="result-content">
                                <h2 className="result-name">Current Expense</h2>
                                <h1>
                                  {
                                    !expenseLoading && totalExpense
                                  }
                                </h1>
                            </div>
                      </div>
                  </CardContent>        
              </Card>
            </div>
          </div>

          <div className="row">
              <div className="col-xs-12 col-sm-6">
                    <Card>
                        <CardContent>

                                  <MaleFemaleStudentRation />

                        </CardContent>
                    </Card>
              </div>
              <div className="col-xs-12 col-sm-6">

                <Card>
                    <CardContent>
                      
                      <BarChart
                        xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                        width={600}
                        height={300}
                      />

                    </CardContent>
                </Card>


              </div>
          </div>

        </Stack>



    </>
  )
}

export default Dashboard