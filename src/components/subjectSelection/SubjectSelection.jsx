import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

function SubjectSelection({name, value, onChange, classLists, classLevel }) {
  return (
    <>
      <FormControl fullWidth>
            <InputLabel id="select_subject">Select Subject</InputLabel>
            <Select 
                name={name}
                labelId="select_subject"
                label="Select Subject"
                value={value}
                onChange={onChange}
            >
                {
                    classLists && classLevel &&
                    classLists.find(classList => classList._id === classLevel).subjects.map((subject)=>{
                        return <MenuItem 
                            key={subject._id}
                            value={subject._id}
                        >{subject.name} {subject.subjectCode}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
        
    </>
  )
}

export default SubjectSelection


{/* <FormControl fullWidth>
    <InputLabel id="select_subject">Select Subject</InputLabel>
    <Select 
        name="subjects"
        labelId="select_subject"
        label="Select Subject"
        value={formik.values.subjects}
        onChange={formik.handleChange}
    >
        {
            !isLoading && !error && classLists && formik.values.classLevel &&
            classLists.find(classList => classList._id === formik.values.classLevel).subjects.map((subject, idx)=>{
                return <MenuItem 
                    key={subject._id}
                    value={subject._id}
                >{subject.name} {subject.subjectCode}</MenuItem>
            })
        }
    </Select>
</FormControl> */}
