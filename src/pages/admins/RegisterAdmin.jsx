import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardContent, Grid, TextField } from '@mui/material';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

function RegisterAdmin() {
    const authHeader = useAuthHeader()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const headers = {
                "Authorization": authHeader
            }

            console.log(headers)
            // https://ibnhaysam.com/api/v1/admins/register
            const response = await axios.post('https://api.ibnhaysam.com/api/v1/users/register', formData, {
                headers: headers
            });
            console.log('Registration successful:', response.data);
            // Optionally, you can reset the form fields after successful registration
            setFormData({
                name: '',
                email: '',
                password: ''
            });
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={3}></Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Box component="form">
                                <div className="row">
                                    <div className="col-xs-12 col-6">
                                        <TextField 
                                            id="admin-name" 
                                            name="name" 
                                            label="Name" 
                                            variant="filled" 
                                            value={formData.name} 
                                            onChange={handleInputChange} 
                                        />
                                    </div>
                                    <div className="col-xs-12 col-6">
                                        <TextField 
                                            id="admin-email" 
                                            name="email" 
                                            label="Email" 
                                            variant="filled" 
                                            value={formData.email} 
                                            onChange={handleInputChange} 
                                        />
                                    </div>
                                    <div className="col-xs-12 col-6">
                                        <TextField sx={{ marginTop: '1em' }} 
                                            id="admin-password" 
                                            name="password" 
                                            label="Password" 
                                            variant="filled" 
                                            value={formData.password} 
                                            onChange={handleInputChange} 
                                        />
                                    </div>
                                </div>
                                <Button sx={{ marginTop: "1em" }} variant='contained' onClick={handleRegistration}>Register</Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3}></Grid>
            </Grid>
        </div>
    );
}

export default RegisterAdmin;
