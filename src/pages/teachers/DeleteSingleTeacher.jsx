import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { Link, useParams } from 'react-router-dom';
import { Alert, Button } from '@mui/material';

function DeleteSingleTeacher() {
    const { id } = useParams();
    const authHeader = useAuthHeader();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const deleteStudent = async () => {
          setIsLoading(true);
          setError(null);
    
          try {
            const headers = {
              Authorization: authHeader,
            };
    
            const response = await axios.delete(
              `https://api.ibnhaysam.com/api/v1/teachers/teacher-delete/${id}`,
              { headers }
            );
            console.log(response.data);
          } catch (error) {
            setError(error.message);
          } finally {
            setIsLoading(false);
          }
        };
    
        deleteStudent();
    
      }, [authHeader]);

  return (
    <div>

        {
            !isLoading && !error && 
            <Alert severity='success'>
                Teacher Deleted Success!
            </Alert>
        }
            <Button variant='outlined'>
                <Link to="/teachers">Go back</Link>
            </Button>

    </div>
  )
}

export default DeleteSingleTeacher