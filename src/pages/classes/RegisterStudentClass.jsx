import { Card, CardContent, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import React, {useState } from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import CircularProgress from '@mui/material/CircularProgress';

const url = 'https://husmerklmsbackend.onrender.com/api/v1/classes/class-register'

function RegisterStudentClass() {

  const authHeader = useAuthHeader()
  const [isLoading, setIsLoading ] = useState(false)

  const formik = useFormik({
    initialValues:{
      name: ''
    },
    validationSchema:Yup.object().shape({
      name: Yup.string()
      .min(3, 'Too Short!')
      .required('Required')
    })
    ,
    onSubmit: async (values, {resetForm})=> {
      try{
        setIsLoading(true)

        const headers = {
          "Authorization": authHeader,
        }

        const response = await axios.post(url, values, {headers: headers})
        toast.success(response.data.message)
        console.log(response.data)
        resetForm();

      }catch(err){
        console.error(err)
        toast.error(err.message)
      }finally{
        setIsLoading(false)
      }
    }
  })

  return (
    <div>
        {isLoading && <div className="shadow"><CircularProgress /></div>}
        <Card>
            <CardContent>
                {toast !== '' && <ToastContainer />}
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <form action="" onSubmit={formik.handleSubmit}>
                            <div className="field-input">
                                <TextField
                                  id="outlined-basic" 
                                  name="name"
                                  label="Class Name" 
                                  variant='outlined' 
                                  onChange={formik.handleChange}
                                  value={formik.values.name}
                                  error={
                                    formik.touched.name && formik.errors.name
                                  }
                                  helperText={
                                    formik.touched.name && formik.errors.name
                                  }
                                />
                            </div>
                            
                            <Button type="submit" variant='contained'>Submit</Button>
                        </form>
                    </div>
                    <div className="col-xs-12 col-sm-6"></div>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default RegisterStudentClass

