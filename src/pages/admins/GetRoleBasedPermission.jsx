import { Backdrop, Button, Card, CardContent, CircularProgress, Stack, TextField } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { ToastContainer, toast } from 'react-toastify'
import * as Yup from 'yup'
import { Header } from '../../components'
import { DataGrid } from '@mui/x-data-grid'

const url = "https://husmerklmsbackend.onrender.com/api/v1/admin-permission/get-router-permission"

function GetRoleBasedPermission() {

    const authHeader = useAuthHeader()
    const [loading, setLoading] = useState(false)
    const [permissions, setPermissions] = useState([])

    const formik = useFormik({
        initialValues: {
            routerEndPoint: ''  
        },
        validationSchema: Yup.object().shape({

        }),
        onSubmit: async (values) => {
            try{
                setLoading(true)

                const headers = {
                    "Authorization": authHeader,
                };

                const response = await axios.post(url, values, {headers:headers})
                console.log(response)
                toast.success(response.data.message)
                setPermissions(response.data.data)

            }catch(error){
                setLoading(false)
                console.log(error)
                toast.error(error.message)
            }finally{
                setLoading(false)
            }
        }
    })

    const columns = [
        { field: 'role', headerName: "Role", flex: 1 },
        { field: 'routerEndPoint', headerName: "Router End Point", flex: 1 },
        { 
            field: 'permissionId',
            headerName: "Permission Name",
            flex: 1,
            renderCell: params => {
                return params.value.permissionName
            }
         }
    ]

  return (
    <div>

        {
            <Backdrop open={loading}><CircularProgress /></Backdrop>
        }
        {
            <ToastContainer />
        }
           
        <Stack spacing={2}>

            <Card>
                <CardContent>
                    <Header title="Get role based permission" noBtn={true} />
                    <form onSubmit={formik.handleSubmit}>
                        <div className="row">
                            <Stack spacing={2}>
                                <div className="col-xs-12 col-sm-6">
                                    <TextField 
                                        name="routerEndPoint"
                                        id="routerEndPoint"
                                        label="Router End Point"
                                        value={formik.values.routerEndPoint}
                                        onChange={formik.handleChange}
                                    />
                                </div>

                                <div>
                                    <Button variant='contained' type="submit">Submit</Button>
                                </div>

                            </Stack>
                        </div>
                        
                    </form>
                </CardContent>
            </Card>

            {
                permissions && permissions.length !== 0 &&
                <Card>
                    <CardContent>
                        {console.log("Permission: ", permissions)}
                        <DataGrid 
                            columns={columns}
                            rows={permissions}
                            getRowId={row => row._id}
                        />
                    </CardContent>
                </Card>
            }

        </Stack>
            
        
    </div>
  )
}

export default GetRoleBasedPermission
