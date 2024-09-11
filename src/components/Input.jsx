import { TextField } from '@mui/material'
import React from 'react'

const Input = ({required, readOnly, label, name, value, variant, onBlur , formik,touched, onChange, errors, className, ...props}) => {

  const extraClass = className ? className : 'col-sm-4 col-md-3'
  
  return (
    <div className={ `form-field col-xs-12 ${extraClass}` }>
        <TextField 
            required={required}
            id={name}
            name={name}
            label={label}
            variant={variant}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            InputProps={{
              readOnly: readOnly
            }}
            error={
              touched && Boolean(errors)
            }
            helperText={touched && errors}
            {...props}
        />
    </div>
  )
}

export default Input