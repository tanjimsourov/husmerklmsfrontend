import React, { useEffect, useState } from 'react'
import useApi from '../../hooks/useApi';
import { Autocomplete, TextField } from '@mui/material';

const url = 'https://api.ibnhaysam.com/api/v1/students/get-students';

function StudentListSelection({value, onChange }) {

    const {data, isLoading, error} = useApi(url)
    const [students, setStudents] = useState([])
    const [selectedStudentId, setSelectedStudentId] = useState()


    useEffect(()=>{
        if( data?.length > 0){
            const students = []
            data.map(student=>{
                students.push({label: student.name, studentId: student.studentId, id: student._id})
            })

            setStudents(students)
        }
    }, [isLoading, data])

  return (
    <>
        {
            students?.length > 0 && 
            <Autocomplete 
                disablePortal
                id="select_students"
                options={students}
                getOptionLabel={(option) => `${option.label} (${option.studentId})`}
                renderInput={(params) => <TextField {...params} label="Students" />}
                value={
                    students.find(student => student.id === value) || null
                }
                onChange={onChange}
            />
        }
      
    </>
  )
}

export default StudentListSelection

{/* <Autocomplete 
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
/> */}