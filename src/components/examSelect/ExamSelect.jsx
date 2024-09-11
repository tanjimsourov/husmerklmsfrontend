import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import useApi from '../../hooks/useApi'

const url = 'https://api.ibnhaysam.com/api/v1/exams/get-exams'

function ExamSelect({name, value, onChange }) {

  const {data, isLoading, error} = useApi(url)
    
  return (
    <>
      <FormControl fullWidth>
            <InputLabel id="exam_select">Select Exam</InputLabel>
            <Select 
                name={name}
                labelId="exam_select"
                label="Select Exam"
                value={value}
                onChange={onChange}
            >
                {
                    !isLoading && !error && data &&
                    data.map((exam)=>{
                        return <MenuItem 
                            key={exam._id}
                            value={exam._id}
                        >{exam.name} {exam.Year}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
        
    </>
  )
}

export default ExamSelect

