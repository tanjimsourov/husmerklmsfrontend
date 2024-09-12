import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const url = 'https://husmerklmsbackend.onrender.com/api/v1/students/get-students';

function useGetStudents() {
    const authHeader = useAuthHeader();

    const [students, setStudents] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const headers = {
                    "Authorization": authHeader,
                    'Content-Type': 'multipart/form-data',
                };

                const response = await axios.get(url, { headers: headers });
                setStudents(response.data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {};
    }, [authHeader]);

    return { students, isLoading, error };
}

export default useGetStudents