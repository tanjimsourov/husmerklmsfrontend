import React, { useState } from 'react'
import Card from '@mui/material/Card'
import { Avatar, Backdrop, Button, CardContent, CircularProgress } from '@mui/material'
import '../../bootstrap-grid.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../../components/TabPanel'
import StudentProfileTab from './StudentProfileTab'
import StudentParentTab from './StudentParentTab'
import SingleAttendance from './SingleAttendance'
import IdCard from './IdCard'
import Print from '../../components/Print'
import useApi from '../../hooks/useApi'
import { Link, useParams } from 'react-router-dom'
import {BsPencilSquare} from 'react-icons/bs'
import StudentRoutine from './StudentRoutine';
import GetFee from './GetFee';

function attributes(index){
  return({
    id: index
  })
}

const url = 'https://api.ibnhaysam.com/api/v1/students/get-student'

function SingleStudent() {

  const { id } = useParams()
  const editUrl = `/students/edit/${id}`
  const [value, setValue] = useState(0)
  const {data, isLoading, error } = useApi(`${url}/${id}`)

  console.log(data)

  const handleChange = (prev, next)=>{
    setValue(next)
  }

  return (
    <div>

        {isLoading && <Backdrop open={isLoading}><CircularProgress /></Backdrop>}
        {

          !isLoading && data && (
            <Card>
                <CardContent>
                    <div className="container" style={{position: 'relative'}}>

                      <div className="edit-option">
                          <Button
                            startIcon={<BsPencilSquare />}
                            component="label"
                            variant='contained'
                            href = {editUrl}
                          >
                            <Link to={editUrl}>Edit</Link>
                          </Button>
                      </div>

                      <div className="row">
                        <div className="col-12 flex flex-direction-column align-items-center">
                            <div className="profile">
                              <Avatar src={`https://api.ibnhaysam.com/api/v1/uploads/${data.profile}`} alt="Mobashira" sx={{width: 100, height: 100}} />
                            </div>
                            <div className="profile-info">
                                <div className="profile-info-group flex flex-direction-column justify-content-center align-items-center">
                                    <h1 className="profile-field-title">{data.name}</h1>
                                    <h2 className="info-text student-name">{data.studentId}</h2>
                                </div>
                                
                            </div>
                        </div> 
                      </div>

                      <div className="row">

                          <div className="col-12 flex justify-content-center">
                            
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Profile" {...attributes(0)}/>
                                    <Tab label="Parent" {...attributes(1)}/>
                                    <Tab label="Routine" {...attributes(2)}/>
                                    <Tab label="Attendace" {...attributes(3)}/>
                                    <Tab label="Id Card" {...attributes(4)} />
                                    <Tab label="Payment" {...attributes(5)} />
                                </Tabs>
                            
                          </div>

                      </div>

                    </div>

                </CardContent>
            </Card>
          )

        }
        <div className="container" style={{marginTop: "50px"}}>
            <div className="row">

              <div className="col-12">

                {
                    !isLoading && data && 
                    (<Card>
                      <CardContent>
                            
                             <TabPanel value={value} index={0}>
                                  <StudentProfileTab data={data} />
                              </TabPanel>
                              <TabPanel value={value} index={1}>
                                  <StudentParentTab data={data}/>
                              </TabPanel>
                              <TabPanel value={value} index={2}>
                                    <StudentRoutine data={data?.section?.routines} />
                              </TabPanel>
                              <TabPanel value={value} index={3}>
                                  <SingleAttendance rows={data} />
                              </TabPanel>
                              <TabPanel value={value} index={4}>
                                <Print>
                                  <IdCard data={data}/>                        
                                </Print>
                              </TabPanel>
                              <TabPanel value={value} index={5}>
                                    <GetFee />
                              </TabPanel>

                      </CardContent>
                  </Card>)
                }
              </div>
            </div>
        </div>

    </div>
  )
}

export default SingleStudent