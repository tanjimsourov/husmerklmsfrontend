import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Backdrop, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import * as Yup from 'yup';
import useGetClasses from '../../hooks/useGetClasses';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import dayjs from 'dayjs';
import { Header } from '../../components';
import ClassSelection from '../../components/classSelection/ClassSelection';
import SectionSelection from '../../components/sectionSelection/SectionSelection';
import SubjectSelection from '../../components/subjectSelection/SubjectSelection';
import AttendanceTable from '../../components/attendanceTable/AttendanceTable';
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

function StudentAttendance() {
    
    const authHeader = useAuthHeader()
    const {classLists, isLoading, error} = useGetClasses();
    const [Loading, setLoading ] = useState(false)
    const [students, setStudents] = useState('')
    // const [attendance, setAttendance] = useState([])

    const formik = useFormik({
        initialValues: {
            date: null,
            classLevel: '',
            section: '',
        },
        validationSchema: Yup.object().shape({
            date: Yup.date(),
            classLevel: Yup.string(),
            section: Yup.string(),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            try{
                
                setLoading(true)
                const headers = {
                    "Authorization": authHeader,
                }

                const response = await axios.get(`https://api.ibnhaysam.com/api/v1/classes/${formik.values.classLevel}`, {headers: headers})
                //console.log(response.data.data.students)
                setStudents(response.data.data.students)

            }catch(err){
                console.error(err)
                toast.error(err.response.data.message)
            }finally{
                setLoading(false)
            }
        }
    })


    return (
        <div>
            {toast !== '' && <ToastContainer />}
            <Card>
                <CardContent>

                        <Header title="Student Attendance" noBtn={true} />
                    
                        <form onSubmit={formik.handleSubmit}>
                            <div className="row">
                                <div className="col-xs-12 col-sm-4">
                                    <ClassSelection 
                                        value={formik.values.classLevel}
                                        onChange={formik.handleChange}
                                        errors={formik.errors.classLevel}
                                        touched={formik.touched.classLevel}
                                        classLists={classLists}
                                    />
                                    
                                </div>
                                <div className="col-xs-12 col-sm-4">
                                    <SectionSelection
                                        value={formik.values.section}
                                        onChange={formik.handleChange}
                                        errors={formik.errors.section}
                                        touched={formik.touched.section}
                                        classLists={classLists}
                                        classLevel={formik.values.classLevel}
                                    />
                                    
                                </div>

                                <div className="col-xs-12 col-sm-4">
                                    <LocalizationProvider dateAdapter=  {AdapterDayjs}>
                                        
                                        <DatePicker 
                                            label="Date"
                                            onChange={(date) => {
                                                
                                                const formatedDate = dayjs(date).utc().format();
                                                console.log(formatedDate)
                                                formik.setFieldValue('date', formatedDate)
                                            }}
                                        />
                                        
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                sx={{ marginTop: '1em', marginLeft: 'auto', display: 'flex' }}
                                variant="contained"
                            >
                                Submit
                            </Button>
                        </form>
                   
                </CardContent>
            </Card>
                <Backdrop open={Loading}><CircularProgress /></Backdrop>
            <Card>
                <CardContent>

                    {
                        students && <div>   

                            <AttendanceTable 
                                students={students}
                                values={formik.values}

                            />

                        </div>
                    }
                    
                </CardContent>
            </Card>
        </div>
    );
}

export default StudentAttendance;
