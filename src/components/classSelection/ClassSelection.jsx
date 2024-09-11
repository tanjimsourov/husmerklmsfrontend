import { Backdrop, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
// import useGetClasses from '../../hooks/useGetClasses'

function ClassSelection({value, onChange, touched, errors, name, classLists, isLoading, error}) {

    //const {classLists, isLoading, error} = useGetClasses();

  return (
    <div>
            <FormControl fullWidth>
                <InputLabel id="class-select">Class</InputLabel>
                <Select 
                    
                    labelId="class-select"
                    id="class-select"
                    name={name? name : 'classLevel'}
                    label="Class"
                    value={value}
                    onChange={onChange}
                    error={touched && Boolean(errors)}
                >
                    {
                        isLoading && <Backdrop open={isLoading}><CircularProgress /></Backdrop>
                    }
                    
                    {!isLoading && !error && classLists && classLists.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
                {touched && errors && (
                    <FormHelperText errors>{errors}</FormHelperText>
                )}
            </FormControl>
            
    </div>
  )
}

export default ClassSelection



{/* <FormControl fullWidth>
        <InputLabel id="class-select">Class</InputLabel>
        <Select 
            
            labelId="class-select"
            id="class-select"
            name="classLevel"
            label="Class"
            value={formik.values.classLevel}
            onChange={formik.handleChange}
            error={formik.touched.classLevel && Boolean(formik.errors.classLevel)}
        >
            {!isLoading && !error && classLists && classLists.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                    {item.name}
                </MenuItem>
            ))}
        </Select>
        {formik.touched.classLevel && formik.errors.classLevel && (
            <FormHelperText error>{formik.errors.classLevel}</FormHelperText>
        )}
    </FormControl> */}
