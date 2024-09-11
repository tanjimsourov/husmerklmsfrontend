import { Backdrop, Button, Card, CardContent, CircularProgress, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Header } from '../../components';

const url = 'https://api.ibnhaysam.com/api/v1/users/register';

function AddSingleEmployee() {

    const authHeader = useAuthHeader()
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: "1234567",
            role: 'staff',
            designation: ''
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email('Invalid email').required(),
            designation: Yup.string().required()
        }),
        enableReinitialize: true,
        onSubmit: async ( values, {resetForm} ) => {
            try{
              setLoading(true)
                      
              const headers = {
                  "Authorization": authHeader,
              }

              const response = await axios.post(`${url}`, values, {headers: headers})
              console.log(values)
              console.log('Registration successful:', response.data);
              toast(response.data.message)

              if (response.status === 201) {
                setLoading(false)
              } else{
                  setLoading(false)
              }

              resetForm();

            }catch(error){

                console.error('Error:', error);
                toast(error.message)
                setLoading(false)

            }finally{
                setLoading(false)
            }
        }
   })

  return (
    <div>
      <Card>
            {
                <Backdrop open={loading}>
                    <CircularProgress />
                </Backdrop>
            }
            {
                <ToastContainer />
            }
            <CardContent>
                <Header title="Add Staff" noBtn={true} />

                <form onSubmit={formik.handleSubmit}>
                        <div className="row">
                        <div className="col-xs-12 col-sm-12">
                            <div className="row">
                                
                                <div className="form-field col-xs-12 col-sm-4">
                                    <TextField
                                        name="name"
                                        label="Name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                        error={formik.errors.name && formik.touched.name}
                                        helperText={formik.errors.name && formik.touched.name && formik.errors.name}
                                    />
                                </div>

                                <div className="form-field col-xs-12 col-sm-4">
                                    <TextField
                                        name="email"
                                        label="Email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        error={formik.errors.email && formik.touched.email}
                                        helperText={formik.errors.email && formik.touched.email && formik.errors.email}
                                    />
                                </div>

                                <div className="form-field col-xs-12 col-sm-4">
                                    <TextField
                                        name="designation"
                                        label="Designation"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.designation}
                                        error={formik.errors.designation && formik.touched.designation}
                                        helperText={formik.errors.designation && formik.touched.designation && formik.errors.designation}
                                    />
                                </div>

                            </div>
                        </div>
                        
                    </div>
                    <Button sx={{ marginTop: '20px' }} type="submit" variant="contained">
                        Create
                    </Button>
                </form>

            </CardContent>
      </Card>
    </div>
  )
}

export default AddSingleEmployee
