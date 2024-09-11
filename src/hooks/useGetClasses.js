import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const url = 'https://api.ibnhaysam.com/api/v1/classes/get-class';

const useGetClasses = () => {
    const authHeader = useAuthHeader();

    const [classLists, setClassLists] = useState(null);
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
                setClassLists(response.data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {};
    }, [authHeader]);

    return { classLists, isLoading, error };
};

export default useGetClasses;
