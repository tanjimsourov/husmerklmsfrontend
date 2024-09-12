import { Backdrop, Button, Card, CardContent, CircularProgress, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Header } from '../../components'
import axios from 'axios'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { ToastContainer, toast } from 'react-toastify'

const url = "https://husmerklmsbackend.onrender.com/api/v1/admin-permission/change-router-permission"

function GivePermission() {

    const authHeader = useAuthHeader()
    const [loading, setLoadin] = useState(false)

    const formik = useFormik({
        initialValues: {
            routerEndPoint: '',
            role: "",
            permissionId: "",
            permission: 2222            
        },
        validationSchema: Yup.object().shape({
            routerEndPoint: Yup.string().required(),
            role: Yup.string().required(),
            permissionId: Yup.string().required(),
            permission: Yup.string().required()             
        }),
        onSubmit: async (values, {resetForm})=>{
            try{

                setLoadin(true)

                const headers = {
                    "Authorization": authHeader,
                };

                const response = await axios.post(url, values, {headers: headers})

                console.log(response)
                toast.success(response.data.message)
                resetForm();

            }catch(error){
                console.error(error)
                toast.error(error.message)
            }finally{
                setLoadin(false)
            }
        }
    })
    

  return (
    <>
    {
        <Backdrop opne={loading}><CircularProgress /></Backdrop>
    }
    {
        <ToastContainer />
    }
      <div className="row">
            <div className="col-xs-12 col-sm-6">
                <Card>
                    <CardContent>
                        <Header title="Give Permission" noBtn={true} />
                        <form onSubmit={formik.handleSubmit}>

                            <Stack spacing={2}>
                                <TextField 
                                    id="router-endpoint"
                                    name="routerEndPoint"
                                    value={formik.values.routerEndPoint}
                                    onChange={formik.handleChange}
                                    label="Router Endpoint"
                                />

                                <TextField 
                                    id="role"
                                    name="role"
                                    value={formik.values.role}
                                    onChange={formik.handleChange}
                                    helperText="user, staff, student, teacher, editor, sub-admin"
                                    label="Role"
                                />

                                <TextField 
                                    id="permission_id"
                                    name="permissionId"
                                    value={formik.values.permissionId}
                                    onChange={formik.handleChange}
                                    label="Permission Id"
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

export default GivePermission
