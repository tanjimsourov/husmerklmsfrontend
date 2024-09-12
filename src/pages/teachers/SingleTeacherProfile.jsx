import { Backdrop, Button, Card, CardContent, CircularProgress, Stack, TextField, TextareaAutosize } from '@mui/material'
import React from 'react'
import useApi from '../../hooks/useApi'
import { Link, useParams } from 'react-router-dom';
import { FaPencil } from 'react-icons/fa6'
import dayjs from 'dayjs';

const url = 'https://husmerklmsbackend.onrender.com/api/v1/teachers/get-teacher/';

function SingleTeacherProfile() {

    const {id} = useParams('id')
    const { data, isLoading, error } = useApi(`${url}${id}`);

    console.log( data )

  return (
    <div>

        {
            isLoading && <Backdrop
                open={isLoading}
            >
                <CircularProgress />
            </Backdrop>
        }
        
        {
            !isLoading && !error && data && 
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-4">
                        <Card>
                            <CardContent>

                                <Stack spacing={2}>
                                    <div className="teacher-profile-wrapper">
                                        <img src={data.profile ? `https://husmerklmsbackend.onrender.com/api/v1/uploads/${data.profile}` : ""} alt="" />
                                    </div>
                                    <h2 className="teacher-name">{data.name}</h2>
                                    <p className="teacher-phone">{data.phone}</p>
                                    <TextareaAutosize 
                                        placeholder="Address"
                                        minRows={3}
                                        name="address"
                                        value={data.address}
                                        InputProps={{
                                            readOnly: true
                                        }}
                                    />
                                </Stack>

                            </CardContent>
                            
                        </Card>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-8">
                        <Button startIcon={<FaPencil />} sx={{marginLeft: 'auto', marginBottom: '10px', display: 'flex'}} variant="contained">
                            <Link to={`/teachers/edit/${id}`}>Edit Teacher</Link>
                        </Button>
                        <Card>
                            <CardContent>
                                <div className="row">
                                    <div className="form-field col-xs-12 col-sm-6">
                                        <TextField 
                                            label="Email" 
                                            variant="filled"
                                            value={data.email} 
                                            InputProps={{
                                                readOnly: true
                                            }}
                                        />
                                    </div>
                                    <div className="form-field col-xs-12 col-sm-6">
                                        <TextField 
                                            label="Date of birth" 
                                            variant="filled" 
                                            value={dayjs(data.dateOfBirth).format('YYYY-MM-DD')} 
                                            InputProps={{
                                                readOnly: true
                                            }}
                                        />
                                    </div>
                                    <div className="form-field col-xs-12 col-sm-6">
                                        <TextField 
                                            label="Religion" 
                                            variant="filled" 
                                            value={data.religion} 
                                            InputProps={{
                                                readOnly: true
                                            }}
                                        />
                                    </div>
                                    <div className="form-field col-xs-12 col-sm-6">
                                        <TextField 
                                            label="User Name" 
                                            variant="filled" 
                                            value={data.userName} 
                                            InputProps={{
                                                readOnly: true
                                            }}
                                        />
                                    </div>
                                    <div className="form-field col-xs-12 col-sm-6">
                                        <TextField 
                                            label="Gender"
                                            variant="filled"
                                            value={data?.gender}
                                            InputProps={{
                                                readOnly: true
                                            }}
                                        />
                                    </div>
                                    <div className="form-field col-xs-12 col-sm-6">
                                        <TextField 
                                            label="Blood Group"
                                            variant="filled"
                                            value={data?.bloodGroup}
                                            InputProps={{
                                                readOnly: true
                                            }}
                                        />
                                    </div>
                                </div>
                                   
                                
                            </CardContent>
                        </Card>
                    </div>
                </div>
            
        }
            
    </div>
  )
}

export default SingleTeacherProfile