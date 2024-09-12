import { Autocomplete, Backdrop, Button, Card, CardContent, CircularProgress, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import ClassSelection from '../../components/classSelection/ClassSelection'
import SectionSelection from '../../components/sectionSelection/SectionSelection'
import useGetClasses from '../../hooks/useGetClasses'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Input from '../../components/Input'
import { Header } from '../../components'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import dayjs from 'dayjs'

const url = 'https://husmerklmsbackend.onrender.com/api/v1/studentFinancial/student-addFeeDistribution'

function PaymentFor() {

    const authHeader = useAuthHeader()
    const {classLists, isLoading, error} = useGetClasses()
    const [loading, setLoading] = useState(false)


    const formik = useFormik({
        initialValues: {
            classLevel: '',
            section: '',
            year: null,
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
            classLevel: Yup.string(),
            section: Yup.string(),
            year: Yup.number(),
            monthlyTuitionFee: Yup.number(),
            registrationFee: Yup.number(),
            sessionFee: Yup.number(),
            firstSemester: Yup.number(),
            secondSemester: Yup.number(),
            sportsFee: Yup.number(),
            idCard: Yup.number(),
            clubScout: Yup.number(),
            libraryLab: Yup.number(),
            studyTour: Yup.number(),
            testimonialFee: Yup.number(),
            admissionForm: Yup.number(),
            culturalFee: Yup.number(),
            fine: Yup.number(),
        }),
        onSubmit: async (values, {resetForm}) => {
            console.log(values)
            try{
                setLoading(true)

                const headers = {
                    "Authorization": authHeader,
                }

                const response = await axios.post(url, values, {headers: headers})

                if(response.status === 200){
                    resetForm();
                    toast.success(response.data.message)
                }else{
                    toast(response.data.message)
                }

            }catch(error){
                setLoading(false)
                console.error(error)
                toast(error.response.data.message)
            }finally{
                setLoading(false)
            }
        }
    })


  return (
    <>
    {
        toast && <ToastContainer />
    }
    {
        <Backdrop open={loading}><CircularProgress /></Backdrop>
    }
    <Card>
        <CardContent>
            <Header title="Payment distribution" noBtn={true} />
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <Stack spacing={2}>
                            <ClassSelection 
                                value={formik.values.classLevel}
                                onChange={formik.handleChange}
                                touched={formik.touched.classLevel}
                                errors={formik.errors.classLevel}
                                isLoading={isLoading}
                                classLists={classLists}
                                error={error}
                            />

                            <SectionSelection 
                                value={formik.values.section}
                                onChange={formik.handleChange}
                                touched={formik.touched.classLevel}
                                errors={formik.errors.classLevel}
                                classLists={classLists}
                                classLevel={formik.values.classLevel}
                            />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DateRangePicker']}>

                                    <DatePicker
                                        views={['year']}
                                        openTo="year"
                                        name="year" 
                                        label="Year"
                                        onChange={(newValue) => {
                                            console.log(dayjs(newValue).year())
                                            formik.setFieldValue('year', dayjs(newValue).year());
                                        }}
                                        renderInput={(params)=> <TextField {...params} />}
                                    />

                                </DemoContainer>
                            </LocalizationProvider>


                            <div className="row payment-fields-wrapper">

                                <Input
                                    className='col-sm-6'
                                    label="Registration Fee"
                                    name="registrationFee"
                                    value={formik.values.registrationFee}
                                    touched={formik.touched.registrationFee}
                                    errors={formik.errors.registrationFee}
                                    onChange={formik.handleChange}
                                />

                                <Input 
                                    className='col-sm-6'
                                    label="Tuition Fee"
                                    name="monthlyTuitionFee"
                                    value={formik.values.monthlyTuitionFee}
                                    touched={formik.touched.monthlyTuitionFee}
                                    errors={formik.errors.monthlyTuitionFee}
                                    onChange={formik.handleChange}
                                />

                                <Input 
                                    className='col-sm-6'
                                    label="Session Fee"
                                    name="sessionFee"
                                    value={formik.values.sessionFee}
                                    touched={formik.touched.sessionFee}
                                    errors={formik.errors.sessionFee}
                                    onChange={formik.handleChange}
                                />

                                <Input 
                                    className='col-sm-6'
                                    label="First Semester Fee"
                                    name="firstSemester"
                                    value={formik.values.firstSemester}
                                    touched={formik.touched.firstSemester}
                                    errors={formik.errors.firstSemester}
                                    onChange={formik.handleChange}
                                />

                                <Input 
                                    className='col-sm-6'
                                    label="Second Semester Fee"
                                    name="secondSemester"
                                    value={formik.values.secondSemester}
                                    touched={formik.touched.secondSemester}
                                    errors={formik.errors.secondSemester}
                                    onChange={formik.handleChange}
                                />

                                <Input 
                                    className='col-sm-6'
                                    label="Sports Fee"
                                    name="sportsFee"
                                    value={formik.values.sportsFee}
                                    touched={formik.touched.sportsFee}
                                    errors={formik.errors.sportsFee}
                                    onChange={formik.handleChange}
                                />

                                <Input 
                                    className='col-sm-6'
                                    label="Id Card Fee"
                                    name="idCard"
                                    value={formik.values.idCard}
                                    touched={formik.touched.idCard}
                                    errors={formik.errors.idCard}
                                    onChange={formik.handleChange}
                                />

                                <Input 
                                    className='col-sm-6'
                                    label="Clubs Fee"
                                    name="clubScout"
                                    value={formik.values.clubScout}
                                    touched={formik.touched.clubScout}
                                    errors={formik.errors.clubScout}
                                    onChange={formik.handleChange}
                                />

                                <Input 
                                    className='col-sm-6'
                                    label="Library/Lab Fee"
                                    name="libraryLab"
                                    value={formik.values.libraryLab}
                                    touched={formik.touched.libraryLab}
                                    errors={formik.errors.libraryLab}
                                    onChange={formik.handleChange}
                                />

                                <Input 
                                    className='col-sm-6'
                                    label="Study Tour Fee"
                                    name="studyTour"
                                    value={formik.values.studyTour}
                                    touched={formik.touched.studyTour}
                                    errors={formik.errors.studyTour}
                                    onChange={formik.handleChange}
                                />

                                <Input 
                                    className='col-sm-6'
                                    label="Testimonial Fee"
                                    name="testimonialFee"
                                    value={formik.values.testimonialFee}
                                    touched={formik.touched.testimonialFee}
                                    errors={formik.errors.testimonialFee}
                                    onChange={formik.handleChange}
                                />

                                <Input 
                                    className='col-sm-6'
                                    label="Admission Form Fee"
                                    name="admissionForm"
                                    value={formik.values.admissionForm}
                                    touched={formik.touched.admissionForm}
                                    errors={formik.errors.admissionForm}
                                    onChange={formik.handleChange}
                                />

                                <Input 
                                    className='col-sm-6'
                                    label="Cultural Fee"
                                    name="culturalFee"
                                    value={formik.values.culturalFee}
                                    touched={formik.touched.culturalFee}
                                    errors={formik.errors.culturalFee}
                                    onChange={formik.handleChange}
                                />

                                <Input 
                                    className='col-sm-6'
                                    label="Fine Fee"
                                    name="fine"
                                    value={formik.values.fine}
                                    touched={formik.touched.fine}
                                    errors={formik.errors.fine}
                                    onChange={formik.handleChange}
                                />

                            </div>

                            <div>
                                <Button type="submit" variant='contained'>Submit</Button>
                            </div>

                        </Stack>
                    </div>
                    <div className="col-xs-12 col-sm-6">

                    </div>
                </div>
            </form>
        </CardContent>
    </Card>
      
    </>
  )
}

export default PaymentFor
