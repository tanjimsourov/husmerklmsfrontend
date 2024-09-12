import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { Backdrop, Button, Card, CardContent, CircularProgress, FormControlLabel, Stack, Switch, TextField } from '@mui/material'
import axios from 'axios'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useApi from '../../hooks/useApi'
import { ToastContainer, toast } from 'react-toastify'

const url = 'https://husmerklmsbackend.onrender.com/api/v1/studentFinancial/student-feeDistributionByYear'

function ViewSingleFeeDistribution() {

    const authHeader = useAuthHeader()
    const navigation = useNavigate()
    const [loading, setLoading] = useState(false)
    const {year, id} = useParams()
    const [edit, setEdit] = useState(false)

    const {data, isLoading, error} = useApi(`${url}/${year}`)


    const formik = useFormik({
        initialValues: {
            monthlyTuitionFee: '',
            registrationFee: '',
            sessionFee: '',
            firstSemester: '',
            secondSemester: '',
            sportsFee: '',
            idCard: '',
            clubScout: '',
            libraryLab: '',
            studyTour: '',
            testimonialFee: '',
            admissionForm: '',
            culturalFee: '',
            fine: '',
        },
        validationSchema: Yup.object().shape({
            monthlyTuitionFee: Yup.number().nullable(),
            registrationFee: Yup.number().nullable(),
            sessionFee: Yup.number().nullable(),
            firstSemester: Yup.number().nullable(),
            secondSemester: Yup.number().nullable(),
            sportsFee: Yup.number().nullable(),
            idCard: Yup.number().nullable(),
            clubScout: Yup.number().nullable(),
            libraryLab: Yup.number().nullable(),
            studyTour: Yup.number().nullable(),
            testimonialFee: Yup.number().nullable(),
            admissionForm: Yup.number().nullable(),
            culturalFee: Yup.number().nullable(),
            fine: Yup.number().nullable(),
        }),        
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
        
            try {
                // Remove classLevel and year properties from values object
                const { classLevel, year, ...formData } = values;
        
                const headers = {
                    "Authorization": authHeader,
                    'Content-Type': 'application/json', // Use application/json for JSON data
                };
        
                const response = await axios.put(`https://husmerklmsbackend.onrender.com/api/v1/studentFinancial/student-feeDistribution/update/${id}`, formData, { headers: headers });
        
                console.log("Response: ", response);
        
                toast.success(response.data.message);
        
                console.log("Values: ", formData);
        
            } catch (error) {
                setLoading(false);
                toast.error(error.message);
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        
    })

    useEffect(() => {
        if (data && !loading && data.length !== 0) {
            console.log("Data: ", data[0])
            formik.setValues(data[0]); // Assuming `data` has the same shape as initialValues
        }
    }, [isLoading, data]);

    const handleSwitchChange = ()=> {
        setEdit(!edit)
    }

  return (
    <>
    {
        <Backdrop open={isLoading}><CircularProgress /></Backdrop>
    }

    {
        <ToastContainer />
    }

    {
        !isLoading && data && data.length !== 0 &&
      <Card>
        <CardContent>
            
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        
                        <Stack spacing={2}>
                            <Stack spacing={2}>

                                <FormControlLabel control={<Switch onChange={handleSwitchChange} />} label="Edit" />
                                
                                <div>
                                    <Button onClick={()=> navigation(-1)} variant='contained'>Go back</Button>
                                </div>
                            
                            </Stack>

                            <TextField 
                                value={data[0].classLevel.name}
                                label="Class"
                            />

                            <TextField 
                                label="Year"
                                value={data[0].year}
                            />

                            <form onSubmit={formik.handleSubmit}>
                                <Stack spacing={2}>

                                    <div className="row payment-fields-wrapper" style={{gap: '10px;'}}>

                                        <div className='form-field col-xs-12 col-sm-6'>

                                            <TextField
                                                label="Registration Fee"
                                                name="registrationFee"
                                                value={formik.values.registrationFee}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.registrationFee && Boolean(formik.errors.registrationFee)}
                                                helperText={formik.touched.registrationFee && formik.errors.registrationFee}
                                            />

                                        </div>

                                        <div className='col-xs-12 col-sm-6 form-field'>
                                            <TextField 
                                                label="Tuition Fee"
                                                name="monthlyTuitionFee"
                                                value={formik.values.monthlyTuitionFee}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>

                                        <div className='col-xs-12 col-sm-6 form-field'>
                                            <TextField 
                                                label="Session Fee"
                                                name="sessionFee"
                                                value={formik.values.sessionFee}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>

                                        <div className='col-xs-12 col-sm-6 form-field'>
                                            <TextField 
                                                label="First Semester Fee"
                                                name="firstSemester"
                                                value={formik.values.firstSemester}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>

                                        <div className='col-xs-12 col-sm-6 form-field'>
                                            <TextField 
                                                label="Second Semester Fee"
                                                name="secondSemester"
                                                value={formik.values.secondSemester}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>

                                        <div className='col-xs-12 col-sm-6 form-field'>
                                            <TextField 
                                                label="Sports Fee"
                                                name="sportsFee"
                                                value={formik.values.sportsFee}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>

                                        <div className='col-xs-12 col-sm-6 form-field'>
                                            <TextField 
                                                label="Id Card Fee"
                                                name="idCard"
                                                value={formik.values.idCard}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>

                                        <div className='col-xs-12 col-sm-6 form-field'>
                                            <TextField 
                                                label="Clubs Fee"
                                                name="clubScout"
                                                value={formik.values.clubScout}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.clubScout && Boolean(formik.errors.clubScout)}
                                                helperText={formik.touched.clubScout && formik.errors.clubScout}
                                            />
                                        </div>

                                        <div className='col-xs-12 col-sm-6 form-field'>
                                            <TextField 
                                                label="Library/Lab Fee"
                                                name="libraryLab"
                                                value={formik.values.libraryLab}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>

                                        <div className='col-xs-12 col-sm-6 form-field'>
                                            <TextField 
                                                label="Study Tour Fee"
                                                name="studyTour"
                                                value={formik.values.studyTour}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>

                                        <div className='col-xs-12 col-sm-6 form-field'>
                                            <TextField 
                                                label="Testimonial Fee"
                                                name="testimonialFee"
                                                value={formik.values.testimonialFee}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>

                                        <div className='col-xs-12 col-sm-6 form-field'>
                                            <TextField 
                                                label="Admission Form Fee"
                                                name="admissionForm"
                                                value={formik.values.admissionForm}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>

                                        <div className='col-xs-12 col-sm-6 form-field'>
                                            <TextField 
                                                label="Cultural Fee"
                                                name="culturalFee"
                                                value={formik.values.culturalFee}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>

                                        <div className='col-xs-12 col-sm-6 form-field'>
                                            <TextField 
                                                label="Fine Fee"
                                                name="fine"
                                                value={formik.values.fine}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>


                                    </div>

                                    {
                                        edit &&
                                        <div>
                                            <Button type="submit" variant='contained'>Submit</Button>
                                        </div>
                                    }

                                </Stack>

                            </form>
                        </Stack>
                    </div>
                    <div className="col-xs-12 col-sm-6">

                    </div>
                </div>
        </CardContent>
      </Card>
    }

    </>
  )
}

export default ViewSingleFeeDistribution
