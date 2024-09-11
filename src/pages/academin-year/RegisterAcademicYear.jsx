import React, { useState } from 'react';
import { Card, CardContent, Grid, Button, FormControl } from '@mui/material';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

function RegisterAcademicYear() {
    const authHeader = useAuthHeader()
    const [fromYear, setFromYear] = useState(null); // Changed fromYear initial state to null
    const [toYear, setToYear] = useState(null); // Changed toYear initial state to null
    const [academicYearName, setAcademicYearName] = useState("");
    const [success, setSuccess] = useState('')

    const handleInputChange = (e) => {
        setAcademicYearName(e.target.value);
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        const headers = {
            "Authorization": authHeader
        }
        try {
            const response = await axios.post('https://ibnhaysam.com/api/v1/academic-year/register', {
                name: academicYearName,
                fromYear: fromYear,
                toYear: toYear
            }, {
                headers: headers
            });
            console.log('Registration successful:', response.data);
            setSuccess(response.data.message)
            // Optionally, you can handle success response here
            setFromYear("");
            setToYear("")
            setAcademicYearName("")

        } catch (error) {
            console.error('Registration failed:', error);
            // Optionally, you can handle error response here
        }
    };

    return (
        <div>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            {success !== '' && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                {success}
            </Alert>}
                            <TextField
                                required
                                name="academic-year-name"
                                id="academic-year-name"
                                label="Academic Year Name"
                                defaultValue=""
                                variant="filled"
                                onChange={handleInputChange}
                                value={academicYearName}
                            />

                            <div className="wrapper">

                                <InputLabel id="academic-year">From</InputLabel>
                                <FormControl>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            sx={{ width: '100%' }}
                                            name="academic-year-from"
                                            id="academic-year"
                                            value={fromYear}
                                            onChange={(date) => setFromYear(date)}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                                    
                                <InputLabel id="academic-year-to">To</InputLabel>
                                <FormControl>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            sx={{ width: '100%' }}
                                            name="academic-year-to"
                                            id="academic-year-to"
                                            value={toYear}
                                            onChange={(date) => setToYear(date)}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            
                            </div>

                            <Button sx={{ marginTop: "1em" }} variant='contained' onClick={handleRegistration}>Register</Button>

                        </Grid>
                        <Grid item xs={12} sm={6}>

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}

export default RegisterAcademicYear;
