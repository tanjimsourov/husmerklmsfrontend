import { Autocomplete, Backdrop, Box, Button, Card, CardContent, CircularProgress, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Header } from '../../components'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import useApi from '../../hooks/useApi'
import axios from 'axios'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { ToastContainer, toast } from 'react-toastify'
import useAssignedStudentId from '../../components/assignStudent/AssignedStudent'
import { IoCloseCircle } from "react-icons/io5";
import StudentListSelection from '../../components/studentListSelection/StudentListSelection'

const url = 'https://api.ibnhaysam.com/api/v1/students';

function EditSingleRoom() {

    const authHeader = useAuthHeader();

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {data, isLoading, error} = useApi(url)
    const [students, setStudents] = useState([])
    const { roomId, seatId } = useParams();

    const {data: assignedStudent, isLoading: assignedStudentLoading, error: assignedStudentError, refetch} = useAssignedStudentId()

    console.log("assigned: ",assignedStudent?._id)
    console.log(assignedStudentError)

    const formik = useFormik({
        initialValues: {
            assignedStudent: assignedStudent?._id,
        },
        validationSchema: Yup.object().shape({
            assignedStudent: Yup.string()
        }),
        enableReinitialize: true,
        onSubmit: async (values)=>{
            try{

                const headers = {
                    "Authorization": authHeader
                };

                setLoading(true)
                
                const studentId = values.assignedStudent;
                const updatedValue = {roomId, seatId, studentId}

                const response = await axios.post('https://api.ibnhaysam.com/api/v1/rooms/assign', updatedValue , {headers: headers});

                console.log(response)
                toast(response.data.message)  
                refetch()

            }catch(error){

                setLoading(false)
                console.error(error)
                toast(error.response.data.message)

            }finally{

                setLoading(false)
            }
        }
    })

    useEffect(()=>{
        if( data?.length > 0){
            const students = []
            data.map(student=>{
                students.push({label: student.name, studentId: student.studentId, id: student._id})
            })

            setStudents(students)
        }
    }, [isLoading, data])

    const handleUnassign = async ()=>{
        try{

            const headers = {
                "Authorization": authHeader
            };

            setLoading(true)
            const updatedValue = {roomId, seatId}

            const response = await axios.post('https://api.ibnhaysam.com/api/v1/rooms/room-unassign', updatedValue , {headers: headers});

            console.log(response)
            toast(response.data.message)
            refetch();

        }catch(error){

            setLoading(false)
            console.error(error)
            toast(error.response.data.message)

        }finally{

            setLoading(false)
        }        
    }

    return (
    <>
    {
        <Backdrop open={loading}><CircularProgress /></Backdrop>
    }
    {
        <Backdrop open={isLoading}><CircularProgress /></Backdrop>
    }
    {
        toast && <ToastContainer />
    }
      <Card>
            <CardContent>
                <Button onClick={()=> navigate(-1)} variant='contained' sx={{marginBottom: '1em'}}>Go Back</Button>
                <Header title="Assign Student" noBtn={true} />
                <div className="row">
                    <form
                        onSubmit={formik.handleSubmit}
                        >
                        <div className="col-xs-12 col-sm-6">

                            <Stack spacing={2}>

                                {
                                    assignedStudent?.name &&

                                    <div className='assigned-list'>
                                        <h3>{assignedStudent?.name}</h3>
                                        <div onClick={handleUnassign} className="unassign-btn">
                                            
                                            <IoCloseCircle />
                                            
                                        </div>
                                    </div>
                                }


                                {
                                    !assignedStudent?.name && students?.length > 0 && 
                                        <Stack spacing={2}>
                                            <Autocomplete 
                                                disablePortal
                                                id="combo-students-list"
                                                options={students}
                                                value={
                                                    students.find(student => student.id === formik.values.assignedStudent) || null
                                                }
                                                onChange={(event, newValue) => {
                                                    formik.setFieldValue('assignedStudent', newValue ? newValue.id : '');
                                                }}
                                                getOptionLabel={(option) => `${option.label} (${option.studentId})`}
                                                renderInput={(params) => <TextField {...params} label="Students" />}
                                            />
                                            <div>
                                                <Button type="submit" variant='contained'>Assign</Button>
                                            </div>
                                        </Stack>
                                    

                                }


                            </Stack>


                        </div>
                    </form>
                </div>
            </CardContent>
      </Card>
    </>
  )
}

export default EditSingleRoom
