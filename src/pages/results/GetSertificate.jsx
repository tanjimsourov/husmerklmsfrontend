import { Autocomplete, Backdrop, Button, Card, CardContent, CircularProgress, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ExamSelect from '../../components/examSelect/ExamSelect';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useApi from '../../hooks/useApi';
import axios from 'axios';
import bg from '../../assets/imgs/certificate_bg.jpeg'

const url = 'https://husmerklmsbackend.onrender.com/api/v1/students/get-students';

function GetSertificate() {

    const { data, isLoading, error } = useApi(url);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const authHeader = useAuthHeader();
    const [result, setResult] = useState([])

    const formik = useFormik({
        initialValues: {
            student: '',
            exam: '',
        },
        validationSchema: Yup.object().shape({
            student: Yup.string().required(),
            exam: Yup.string().required()
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);
                const headers = {
                    "Authorization": authHeader,
                    'Content-Type': 'application/json',
                };

                // console.log(values);

                const response = await axios.post('https://husmerklmsbackend.onrender.com/api/v1/results/get-results-by-student-exam', values, { headers: headers });

                // console.log(response.data.data);

                if(response.status === 200){
                    setResult(response.data.data);
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
                
                setLoading(false);
            } catch(error) {
                setLoading(false);
                toast(error.message);
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    });

    useEffect(() => {
        if(data?.length > 0) {
            const students = data.map(student => ({
                label: `${student.name} (${student.studentId})`,
                studentId: student.studentId,
                id: student._id
            }));

            setStudents(students);
        }
    }, [isLoading, data]);

    return (
        <>
            {loading && <Backdrop open={loading}><CircularProgress /></Backdrop>}
            <ToastContainer />
            <Stack spacing={2}>

                <Card>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <Stack spacing={2}>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-4">
                                        {students?.length > 0 && (
                                            <Autocomplete 
                                                disablePortal
                                                id="select_students"
                                                options={students}
                                                getOptionLabel={(option) => option.label}
                                                renderInput={(params) => <TextField {...params} label="Students" />}
                                                value={students.find(student => student.id === formik.values.student) || null}
                                                onChange={(event, newValue) => formik.setFieldValue('student', newValue ? newValue.id : '')} // Update formik value
                                            />

                                        )}
                                    </div>
                                    <div className="col-xs-12 col-sm-4">
                                        <ExamSelect 
                                            value={formik.values.exam}
                                            name="exam"
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-4">
                                        <Button type="submit" variant='contained'>Submit</Button>
                                    </div>
                                </div>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>

                {
                    result && result.length != 0 &&

                    <Card>
                        <CardContent>
                            {console.log("result: ", result)}
                            <div className="row">
                                <div className="col-xs-12 col-3"></div>
                                <div className="col-xs-12 col-6">
                                    <div className="certificate" style={{backgroundImage: `url(${bg})`}}>
                                        <Stack spacing={3}>

                                            <div className="header">
                                                <h1>IBN HAYSAM BIGGAN MADRASAH</h1>
                                                <h2>Exam name</h2>
                                            </div>

                                            <div className="body">
                                                <div className="row">
                                                    <div className="col-7 student">
                                                        <h4>Student Name: {result[0].student.name} </h4>
                                                        <h4>Class: {result[0].classLevel}</h4>
                                                        <h4>Section: {result[0].section}</h4>
                                                        <h4>Student Id: {result[0].student.studentId}</h4>
                                                        <h4>Father's Name: {result[0].student.fatherName}</h4>
                                                        <h4>Mother's Name: {result[0].student.motherName}</h4>
                                                    </div>
                                                    <div className="col-5">

                                                        <div className="grade-point">
                                                            <table className="table table-bordered">

                                                                <thead>
                                                                    <tr>
                                                                        <td>Range</td>
                                                                        <td>Point</td>
                                                                    </tr>
                                                                </thead>

                                                                <tbody>
                                                                                                                                                                        <tr>
                                                                        <td>80 - 100</td>
                                                                        <td>A+</td>
                                                                    </tr>
                                                                                                                                                                        <tr>
                                                                        <td>70 - 79</td>
                                                                        <td>A</td>
                                                                    </tr>
                                                                                                                                                                        <tr>
                                                                        <td>60 - 69</td>
                                                                        <td>A-</td>
                                                                    </tr>
                                                                                                                                                                        <tr>
                                                                        <td>50 - 59</td>
                                                                        <td>B</td>
                                                                    </tr>
                                                                                                                                                                        <tr>
                                                                        <td>40 - 49</td>
                                                                        <td>C</td>
                                                                    </tr>
                                                                                                                                                                        <tr>
                                                                        <td>0 - 39</td>
                                                                        <td>F</td>
                                                                    </tr>
                                                                                                                                                                    </tbody>
                                                            </table>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="result">
                                                <Stack spacing={3}>

                                                    <div className="result-title">
                                                        <h3>ACADEMIC TRANSCRIPT</h3>
                                                    </div>
                                                    <div className="result-table">
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>Subject</th>
                                                                    <th>Marks</th>
                                                                    <th>Grade</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    result[0].result.map(item =>{
                                                                        return(
                                                                            <tr>
                                                                                <td>{item.subject}</td>
                                                                                <td>{item.mark}</td>
                                                                                <td>{item.grade}</td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                </Stack>
                                            </div>

                                        </Stack>


                                    </div>
                                </div>
                                <div className="col-xs-12 col-3"></div>
                            </div>
                        </CardContent>
                    </Card>
                }

            </Stack>
        </>
    );
}

export default GetSertificate;
