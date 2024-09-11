import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const useAssignedStudentId = () => {
    const { roomId, seatId } = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const authHeader = useAuthHeader();

    const assignStudentToSeat = async () => {
        setIsLoading(true);
        setError(null);

        const headers = {
            "Authorization": authHeader
        };

        try {
            const response = await axios.post(`https://api.ibnhaysam.com/api/v1/rooms/assign-student`, {
                roomId,
                seatId
            }, {headers: headers});
            setData(response.data.data);
        } catch (error) {
            setError(error.message);
            setData(error.response.data.message)
        } finally {
            setIsLoading(false);
        }
    };

    const refetch = () => {
        assignStudentToSeat();
    };

    useEffect(() => {
        assignStudentToSeat();

        // Cleanup function (optional)
        return () => {
            // Cleanup logic (if needed)
        };
    }, [roomId, seatId]);

    return { data, isLoading, error, refetch };
};

export default useAssignedStudentId;
