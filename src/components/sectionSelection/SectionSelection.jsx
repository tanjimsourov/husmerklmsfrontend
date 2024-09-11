import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

function SectionSelection({value, onChange, touched, errors, classLists, classLevel}) {
  return (
    <>
<       FormControl fullWidth>
            <InputLabel id="section-select">Section</InputLabel>
            <Select 
                labelId="section-select"
                label="Section"
                id="section-select"
                name="section"
                value={value}
                onChange={onChange}
                error={touched && Boolean(errors)}
            >
                
                {
                    classLists && classLevel &&
                    classLists.find(classList => classList._id === classLevel).sections.map((section, idx)=>{
                        return <MenuItem 
                            key={section._id}
                            value={section._id}
                        >{section.name}</MenuItem>
                    })
                    
                }

            </Select>
            {touched && errors && (
                <FormHelperText errors>{errors}</FormHelperText>
            )}
        </FormControl>      
        
    </>
  )
}

export default SectionSelection


{/* <FormControl fullWidth>
        <InputLabel id="section-select">Section</InputLabel>
        <Select 
            labelId="section-select"
            label="Section"
            id="section-select"
            name="section"
            value={formik.values.section}
            onChange={formik.handleChange}
            error={formik.touched.section && Boolean(formik.errors.section)}
        >
            
            {
                !isLoading && !error && classLists && formik.values.classLevel &&
                classLists.find(classList => classList._id === formik.values.classLevel).sections.map((section, idx)=>{
                    return <MenuItem 
                        key={section._id}
                        value={section._id}
                    >{section.name}</MenuItem>
                })
            }

        </Select>
        {formik.touched.section && formik.errors.section && (
            <FormHelperText error>{formik.errors.section}</FormHelperText>
        )}
    </FormControl> */}
