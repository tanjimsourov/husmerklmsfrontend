import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';

const url = 'https://api.ibnhaysam.com/api/v1/classes/';

function GetClasses(props) {
    const authHeader = useAuthHeader();
    const [classLists, setClassLists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const headers = {
                    Authorization: authHeader,
                    'Content-Type': 'multipart/form-data',
                };

                const response = await axios.get(url, { headers: headers });
                setClassLists(response.data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {};
    }, [authHeader]); // Include authHeader in the dependency array

    return (
        <div>
            {isLoading && <CircularProgress />}
            {error && <FormHelperText error>{error}</FormHelperText>}
            {!isLoading && !error && (
                <Select sx={{ width: '100%' }} {...props}>
                    {classLists.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            )}
        </div>
    );
}

export default GetClasses;
