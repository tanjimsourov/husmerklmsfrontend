import React from 'react'
import useGetClasses from '../hooks/useGetClasses'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function GetSectionSelect(props) {
    const {classLists, isLoading, error} = useGetClasses();
    
  return (
    <div className='form-field col-xs-12 col-sm-4 col-md-3'>
        <FormControl fullWidth>
            <InputLabel id="class-label">Class</InputLabel>
            <Select
                labelId="class-lable"
                id="class-select-id"
                label="Class"
                value={props.classTitle}
            >
                {
                   !isLoading && !error && classLists &&  classLists.map((item)=>{
                        return(
                            <MenuItem value={item.name} key={item}>{item.name}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    </div>
  )
}

export default GetSectionSelect