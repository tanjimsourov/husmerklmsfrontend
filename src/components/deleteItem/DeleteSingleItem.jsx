import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const DeleteSingleItem = ({ url }) => {
  const { id } = useParams();
  const authHeader = useAuthHeader();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigation = useNavigate()

  useEffect(() => {
    const deleteItem = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const headers = {
          Authorization: authHeader,
        };

        const response = await axios.delete(
          `${url}/${id}`,
          { headers }
        );
        console.log(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    deleteItem();

  }, [authHeader]);

  return(
    <>
      {
        !isLoading && !error && 
        <Alert severity='success'>
            Deleted Success!
        </Alert>
      }
      <LoadingButton onClick={()=> navigation(-1)} loading={isLoading} variant="outlined">
        Go back
      </LoadingButton>
      
    </>
  );
};

export default DeleteSingleItem;
