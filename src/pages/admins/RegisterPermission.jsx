import { Backdrop, Button, Card, CardContent, CircularProgress, Stack, TextField } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { ToastContainer, toast } from 'react-toastify'
import * as Yup from 'yup'

const url = 'https://api.ibnhaysam.com/api/v1/admin-permission/add-permission'

function RegisterPermission() {

    const authHeader = useAuthHeader()
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            permissionName: ''
        },
        validationSchema: Yup.object().shape({
            permissionName: Yup.string().required()
        }),
        onSubmit: async (values, {resetForm}) => {
            try{
                setLoading(true)

                const headers = {
                    "Authorization": authHeader,
                };

                const response = await axios.post(url, values, {headers: headers})
                console.log(response)
                toast.success(response.data.message)

                resetForm();


            }catch(error){
                console.error(error)
            }finally{
                setLoading(false)
            }
        }
    })

  return (
    <>

    {
        <Backdrop open={loading}><CircularProgress /></Backdrop>
    }

    {
        <ToastContainer />
    }

    <div className="row">
        <div className="col-xs-12 col-sm-6">

            <Card>
                <CardContent>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack spacing={2}>

                                <TextField 
                                    id="permission_name"
                                    name="permissionName"
                                    onChange={formik.handleChange}
                                    value={formik.values.permissionName}
                                    label="Permission Name"
                                />

                                <div>
                                    <Button type="submit" variant='contained'>Submit</Button>
                                </div>

                        </Stack>
                    </form>
                </CardContent>
            </Card>

        </div>
    </div>
      
    </>
  )
}

export default RegisterPermission
