import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const url = 'https://api.ibnhaysam.com/api/v1/rooms';

const useRooms = (id) => {
    const authHeader = useAuthHeader();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const headers = {
                "Authorization": authHeader
            };

            const response = await axios.post(url, {hostel: id}, { headers: headers });
            setData(response.data.data);
            console.log(response)
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const refetch = () => {
        fetchData();
    };

    return { data, isLoading, error, refetch };
};

export default useRooms;
