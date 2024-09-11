import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const useApi = (url) => {
    const authHeader = useAuthHeader();

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const headers = {
                "Authorization": authHeader,
                'Content-Type': 'multipart/form-data',
            };

            const response = await axios.get(url, { headers: headers });
            setData(response.data.data);
            console.log(response.data.data)
        } catch (error) {
            setIsLoading(false)
            console.error(error)
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    const refetch = () => {
        fetchData();
    };

    return { data, isLoading, error, refetch };
};


export default useApi;
