import React from 'react'
import useApi from '../../hooks/useApi';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, CardContent } from '@mui/material';
import { Header } from '../../components';
import { BsPencilSquare } from 'react-icons/bs';

const url = 'https://api.ibnhaysam.com/api/v1/subjects/get-subject';

function SingleCourse() {
    const {id} = useParams()
    const editUrl = `/subjects/edit/${id}`
    const {data, isLoading, error } = useApi(`${url}/${id}`)

  return (
    <div>


      {
        !isLoading && data &&
      
        <Card>
            <CardContent>
                <div className="edit-option">
                    <Button
                        startIcon={<BsPencilSquare />}
                        component="label"
                        variant='contained'
                        href = {editUrl}
                    >
                        <Link to={editUrl}>Edit</Link>
                    </Button>
                </div>
                <Header title="Course details" noBtn={true} />
                <h2>Course Title: {data?.name}</h2>
                <h3>Course Code: {data?.subjectCode}</h3>
            </CardContent>
        </Card>
      }
    </div>
  )
}

export default SingleCourse
