import { Card, CardContent, FormControl, MenuItem, InputLabel, Select, Button, Stack, Backdrop, CircularProgress  } from '@mui/material'
import React, { useState } from 'react'
import Marks from '../../components/Marks'
import ClassSelection from '../../components/classSelection/ClassSelection'
import useGetClasses from '../../hooks/useGetClasses'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import SectionSelection from '../../components/sectionSelection/SectionSelection'
import SubjectSelection from '../../components/subjectSelection/SubjectSelection'
import ExamSelect from '../../components/examSelect/ExamSelect'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { Header } from '../../components'

const url = 'https://api.ibnhaysam.com/api/v1/results/result-register'

function AddSingleResult() {

  const authHeader = useAuthHeader()
  const {classLists, isLoading, error} = useGetClasses()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

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

        console.log(results)

        const response = await axios.post(url, results, { headers: headers });
        console.log(response)

        if(response.status === 201){
          toast.success(response.data.message)
        }else{
          toast.success(response.data.message)
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
    <div>
      {
        <Backdrop open={loading}><CircularProgress /></Backdrop>
      }
      {
        <ToastContainer />
      }
        <form onSubmit={formik.handleSubmit}> 

          <Stack spacing={2}>

            <Card>
                <CardContent>
                    <Header title="Add Result" noBtn={true} />

                    <div className="row">

                        <div className="form-field col-xs-12 col-sm-6 col-md-4">
                          <ClassSelection 
                            value={formik.values.classLevel}
                            onChange={formik.handleChange}
                            name='classLevel'
                            classLists={classLists}
                            isLoading={isLoading}
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

                        <div className="form-field col-xs-12 col-sm-6 col-md-4">
                          
                        </div>
                        
                    </div>
                </CardContent>
            </Card>

            {
              formik.values.classLevel && formik.values.exam && formik.values.section && formik.values.subject &&
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                      <Marks classLevel={formik.values.classLevel} section={formik.values.section} subject={formik.values.subject} exam={formik.values.exam} results={results} setResults={setResults}/>

                      <div className="form-field col-12">
                          <Button type="submit" variant='contained'>Submit</Button>
                      </div>
                  </Stack>

                </CardContent>
              </Card>
            }

          </Stack>

        </form>
        
    </div>
  )
}

export default AddSingleResult
