import { Card, CardContent, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useApi from '../hooks/useApi'

const url = 'https://api.ibnhaysam.com/api/v1/students/get-student-by-class-id'

function Marks({results, setResults, classLevel, section, subject, exam}) {

    const {data, isLoading, error} = useApi(`${url}/${classLevel}`)
    //Need to create an api to get the students from classLevel Id
    // console.log("classLevel: ", data)

    const rows = [
        {_id: 1, studentId: 101, name: "Suhail Habib", mark: 90 }
    ]

    const handleBlur = (event, studentId) => {
        const newValue = event.target.value;
        const updatedResults = [...results];
        const existingIndex = updatedResults.findIndex(result => result.studentId === studentId);
        if (existingIndex !== -1) {
            updatedResults[existingIndex].mark = newValue;
        } else {
            updatedResults.push({
                studentId: studentId,
                marks: newValue,
                classLevel, // Assuming classId is same for all students
                sectionId: section, // Assuming sectionId is same for all students
                examId: exam, // Assuming exam is same for all students
                subjectId: subject // Assuming subjectId is same for all students
            });
        }
        setResults(updatedResults);
    };


  return (
    <div>

            <Stack spacing={2}>

                {   !isLoading && !error && data &&
                    data.map(student=>{
                        return (
                            <>
                            <div className="row" key={student._id}>
                                <div className="col-xs-12 col-sm-4">
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Student Id" 
                                        variant="outlined"
                                        value={student.studentId}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                                <div className="col-xs-12 col-sm-4">
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Student Name" 
                                        variant="outlined"
                                        value={student.name}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                                <div className="col-xs-12 col-sm-4">
                                    <TextField
                                        id={`mark-${student._id}`}
                                        label="Mark"
                                        variant="outlined"
                                        onBlur={(event) => handleBlur(event, student._id)}
                                    />
                                </div>
                            </div>          
                            </>
                            
                        )
                    })
                }
            </Stack>


            
    </div>
  )
}

export default Marks
