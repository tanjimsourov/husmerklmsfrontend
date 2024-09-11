import { Backdrop, Card, CardContent, CircularProgress, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ClassSelection from '../../components/classSelection/ClassSelection'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useParams } from 'react-router-dom'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import useApi from '../../hooks/useApi'
import { Header } from '../../components'
import { LoadingButton } from '@mui/lab'

const url = `https://api.ibnhaysam.com/api/v1/sections/`

function EditSingleSection() {
    
    const [loading, setLoading] = useState(false)
    const {id} = useParams();
    const authHeader = useAuthHeader();
    const {data: section, isloading: sectionLoading, error: sectionError, refetch} = useApi(`${url}/${id}`)

    const formik = useFormik({
        initialValues: {
            name: '',
            classLevel: ''
        },
        validateSchema: Yup.object().shape({
            name: Yup.string(),
            classLevel: Yup.string()
        }),
        onSubmit: async(values)=>{
            console.log(values)
            try{
                setLoading(true)
                const headers = {
                    "Authorization": authHeader,
                }

                const response = await axios.put(`https://api.ibnhaysam.com/api/v1/sections/section-update/${id}`, values, {headers: headers});

                console.log(response)
                toast(response.data.message)

                if(response.status === 201){
                    setLoading(false)
                    refetch()
                }else{
                    setLoading(false)
                }

            }catch(error){
                console.error("Error: ", error)
                toast(error.response.data.message)
                setLoading(false)
            }finally{
                setLoading(false)
            }
        }
    })

    useEffect(()=>{
        if(!sectionLoading && section){
            formik.setValues({
                name: section.name,
                classLevel: section.classLevel?._id
            })
        }
    }, [sectionLoading, section])

  return (
    <>
    {
        loading && <Backdrop open={loading}>
            <CircularProgress />
        </Backdrop>
    }
      <Card>
            <CardContent>
                {
                    toast && <ToastContainer />
                }
                {
                    !sectionLoading && !sectionError && section &&
                    <Header title={section.name} noBtn={true} />
                }
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <form onSubmit={formik.handleSubmit}>
                            <Stack spacing={2}>
                                <TextField 
                                    name="name"
                                    id="name"
                                    label="Name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.errors.name}
                                />
                                <ClassSelection 
                                    value={formik.values.classLevel}
                                    error={formik.errors.classLevel}
                                    touched={formik.touched.classLevel}
                                    onChange={formik.handleChange}
                                />
                                <div>
                                    <LoadingButton type="submit" loading={loading} variant='outlined'> 
                                        Update
                                    </LoadingButton>
                                </div>
                            </Stack>
                        </form>
                    </div>
                </div>
            </CardContent>
      </Card>
    </>
  )
}

export default EditSingleSection
