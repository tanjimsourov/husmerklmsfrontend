import { Backdrop, Button, Card, CardContent, CircularProgress, Stack, TextField, useForkRef } from '@mui/material'
import React, { useState } from 'react'
import { Header } from '../../components'
import useApi from '../../hooks/useApi'
import { useFormik } from 'formik'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import * as Yup from 'yup'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import SectionSelection from '../../components/sectionSelection/SectionSelection'
import SubjectSelection from '../../components/subjectSelection/SubjectSelection'
import ExamSelect from '../../components/examSelect/ExamSelect'
import ClassSelection from '../../components/classSelection/ClassSelection'
import useGetClasses from '../../hooks/useGetClasses'
import { DataGrid } from '@mui/x-data-grid'

const url = 'https://api.ibnhaysam.com/api/v1/results/get-results-by-classLevel-section-exam'

function CheckSingleResult() {

    const {classLists, isLoading: classLoading, error: classError} = useGetClasses()
    const [loading, setLoading] = useState(false)
    const authHeader = useAuthHeader()
    const [result, setResult] = useState([])

    const columns = [
        { field: "classLevel", headerName: "Class", flex: 1 },
        { field: 'section', headerName: 'Section', flex: 1 },
        { field: 'subject', headerName: 'Subject', flex: 1},
        { field: 'student', headerName: 'Student', flex: 1},
        { field: 'marks', headerName: "Marks", flex: 1},
        { field: 'grade', headerName: "Grade", flex: 1}
    ]

    const formik = useFormik({
        initialValues: {
          classLevel: '',
          section: '',
          subject: '',
          exam: '',
        },
        validationSchema: Yup.object().shape({
          classLevel: Yup.string().required(),
          subject: Yup.string().required(),
          exam: Yup.string().required(),
          section: Yup.string().required()
        }),
        onSubmit: async (values, {resetForm}) =>{
          try{
    
            setLoading(true)
            const headers = {
              "Authorization": authHeader,
              'Content-Type': 'application/json',
            };

            console.log(values)

            const response = await axios.post( url, values, {headers: headers})

            console.log(response)

            if(response.status === 200){
                setResult(response)
                toast.success(response.message)
            }else{
                toast.error(response.message)
            }
            
            setLoading(false)
    
          }catch(error){
            setLoading(false)
            toast(error.message)
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



            <Stack spacing={2}>

                <form onSubmit={formik.handleSubmit}>

                    <Card>
                        <CardContent>
                            <Header title="Get Results" noBtn={true} />
                            <div className="row">

                                <div className="form-field col-xs-12 col-sm-6 col-md-4">
                                    <ClassSelection 
                                        value={formik.values.classLevel}
                                        onChange={formik.handleChange}
                                        name='classLevel'
                                        classLists={classLists}
                                        isLoading={classLoading}
                                        error={formik.errors.classLevel}
                                        touched={formik.touched.classLevel}
                                    />
                                </div>

                                <div className="form-field col-xs-12 col-sm-6 col-md-4">
                                    <SectionSelection 
                                        value={formik.values.section}
                                        onChange={formik.handleChange}
                                        touched={formik.touched.section}
                                        errors={formik.errors.section}
                                        classLists={classLists}
                                        classLevel={formik.values.classLevel}
                                    />
                                </div>
                                
                                <div className="form-field col-xs-12 col-sm-6 col-md-4">
                                    <SubjectSelection 
                                        value={formik.values.subject}
                                        onChange={formik.handleChange}
                                        classLists={classLists}
                                        classLevel={formik.values.classLevel}
                                        name='subject'
                                    />
                                </div>

                                <div className="form-field col-xs-12 col-sm-6 col-md-4">
                                    <ExamSelect 
                                        value={formik.values.exam}
                                        name="exam"
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                
                            </div>

                            <div className="form-field col-12">
                                <Button type="submit" variant='contained'>Submit</Button>
                            </div>
                        </CardContent>
                    </Card>

                </form>

                {
                    result && result.length != 0 &&
                    <Card>
                        <CardContent>

                            <DataGrid 
                                rows={result.data.data}
                                columns={columns}
                                getRowId={(row) => row._id} 
                            />
                        </CardContent>
                    </Card>
                }

            </Stack>



      
    </>
  )
}

export default CheckSingleResult
