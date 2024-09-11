import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Alert, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const DeleteSingleEntry = (props) => {
  const { id } = useParams();
  const authHeader = useAuthHeader();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const deleteStudent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const headers = {
          Authorization: authHeader,
        };

        const response = await axios.delete(
          `${props.url}${id}`,
          { headers }
        );
        console.log(response.data);
      } catch (error) {
        setError(error.message);
        console.error(error)
        toast.error(error.message)
      } finally {
        setIsLoading(false);
      }
    };

    deleteStudent();

  }, [authHeader]);

  const handleClick = ()=>{
    navigate(-1)
  }

  return(

    <>
      {
        <ToastContainer />
      }

      {
        !isLoading && !error && 
        <Alert severity='success'>
            Deleted Success!
        </Alert>
      }
      {/* <Button variant='outlined'>
        <Link to={`/${props.back}`}>Go back</Link>
      </Button> */}
      <Button variant='outlined' onClick={handleClick}>
          Go Back
      </Button>
    </>
  );
};

export default DeleteSingleEntry;
