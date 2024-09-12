import { Backdrop, Button, Card, CardContent, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React, { useState } from 'react'
import Input from '../../components/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import axios from 'axios'

const url = 'https://husmerklmsbackend.onrender.com/api/v1/hostels/hostel-register'

function AddSingleHostel() {

  const [loading, setLoading] = useState(false)
  const authHeader = useAuthHeader()

  const formik = useFormik({
    initialValues: {
      name: '',
      type: 'Male',
      location: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      type: Yup.string().required(),
      location: Yup.string().required(),
    }),
    onSubmit: async(values, {resetForm}) => {
      try{
        setLoading(true)
        
        const headers = {
          "Authorization": authHeader,
        }

        const response = await axios.post(`${url}`, values, {headers: headers})
        toast.success(response.data.message)
        resetForm();


      }catch(error){
        setLoading(false)
        toast.error(error.response.data.message)
        console.error(error)
      }finally{
        setLoading(false)
      }
    }
  })

  return (
    <div>
      {
        loading && 
        <Backdrop open={loading}>
          <CircularProgress />
        </Backdrop>
      }
      {
        toast !== '' && <ToastContainer />
      }
        <div className="row">
            <div className="col-xs-12 col-sm-6">
              <form onSubmit={formik.handleSubmit}>

              
                <Card>
                    <CardContent>
                        <Stack>
                            <Input 
                              name="name"
                              label="Hostel Name"
                              className='col-sm-12'
                              value={formik.values.name}
                              onChange={formik.handleChange}
                              errors={formik.errors.name}
                              touched={formik.touched.name}
                            />
                            <div className="form-field col-xs-12 col-sm-12">
                                <FormControl fullWidth>
                                  
                                    <InputLabel id="type_label_id">Type</InputLabel>
                                    <Select
                                      name="type"
                                      label="Type"
                                      labelId="type_label_id"
                                      id="Type_id"
                                      onChange={formik.handleChange}
                                      value={formik.values.type}
                                    >
                                        <MenuItem value='Male'>Male</MenuItem>
                                        <MenuItem value='Female'>Female</MenuItem>
                                    </Select>

                                </FormControl>
                            </div>
                            <Input 
                              name="location"
                              label="Location"
                              className='col-sm-12'
                              value={formik.values.location}
                              onChange={formik.handleChange}
                              errors={formik.errors.location}
                              touched={formik.touched.location}
                            />

                        </Stack>
                        <Button variant='contained' type='submit'>Submit</Button>
                    </CardContent>
                </Card>

              </form>
            </div>
            <div className="col-xs-12 col-sm-6"></div>
        </div>
    </div>
  )
}

export default AddSingleHostel
