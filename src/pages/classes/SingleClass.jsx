import React from 'react'
import useApi from '../../hooks/useApi'
import { useParams, Link } from 'react-router-dom'
import {BsPencilSquare} from 'react-icons/bs'
import { Backdrop, Card, CardContent, CircularProgress, Stack, Table, TableBody, TableCell, TableContainer, TableHead, Button, TableRow, TextField } from '@mui/material'

const url = "https://husmerklmsbackend.onrender.com/api/v1/classes/class/"

function SingleClass() {
    const {id} = useParams('id')
    const editUrl = `/classes/edit/${id}`
    const {data, isLoading, error} = useApi(`${url}${id}`)  

    console.log(data)

  return (
    <div>
        {
            isLoading && <Backdrop open={isLoading}>
                <CircularProgress />
            </Backdrop>
        }
        
        {
            !isLoading && data && !error &&
        
            <Stack spacing={2}>
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
                <Card>
                    <CardContent>
                        
                        <div className="row">
                            <div className="col-xs-12 col-sm-4">
                                <TextField 
                                    id="name" 
                                    label="Class Name" 
                                    variant="standard" 
                                    defaultValue={data.name} 
                                    InputProps={{
                                        readOnly: true
                                    }}
                                />
                            </div>
                            <div className="col-xs-12 col-sm-4">
                                <TextField 
                                    id="class-teacher" 
                                    label="Class Teacher" 
                                    variant="standard" 
                                    defaultValue={data?.teachers[0]?.name} 
                                    InputProps={{
                                        readOnly: true
                                    }}
                                />
                            </div>
                        </div>
                        
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <h2>Sections</h2>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    
                                    <TableRow>
                                        <TableCell component={'th'}><h3>Section</h3></TableCell>
                                        <TableCell component={'th'}>
                                            <h3>Students</h3>
                                        </TableCell>
                                    </TableRow>
                                    
                                </TableHead>
                                <TableBody>
                                
                                    {
                                        data?.sections.map(row=>(
                                            <TableRow
                                                key={row._id}
                                            >
                                                <TableCell>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell>
                                                    {row.students.length}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <h2>Students</h2>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    
                                    <TableRow>
                                        <TableCell component={'th'}><h3>Student Id</h3></TableCell>
                                        <TableCell component={'th'}>
                                            <h3>Student Name</h3>
                                        </TableCell>
                                        
                                    </TableRow>
                                    
                                </TableHead>
                                <TableBody>
                                
                                    {
                                        data?.students.map(row=>(
                                            <TableRow
                                                key={row.studentId}
                                            >
                                                <TableCell>
                                                    {row.studentId}
                                                </TableCell>
                                                <TableCell>
                                                    {row.name}
                                                </TableCell>
                                                
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <h2>Subjects</h2>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    
                                    <TableRow>
                                        <TableCell component={'th'}><h3>Subject Code</h3></TableCell>
                                        <TableCell component={'th'}>
                                            <h3>Subject Name</h3>
                                        </TableCell>
                                        
                                    </TableRow>
                                    
                                </TableHead>
                                <TableBody>
                                
                                    {
                                        data?.subjects.map(row=>(
                                            <TableRow
                                                key={row.subjectCode}
                                            >
                                                <TableCell>
                                                    {row.subjectCode}
                                                </TableCell>
                                                <TableCell>
                                                    {row.name}
                                                </TableCell>
                                                
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Stack>
        }
        
    </div>
  )
}

export default SingleClass