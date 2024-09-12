import React from 'react'
import DeleteSingleItem from '../../components/deleteItem/DeleteSingleItem'

const url = 'https://husmerklmsbackend.onrender.com/api/v1/subjects/subject-delete'

function DeleteSingleCourse() {
  return (
    <>
        <DeleteSingleItem path='/subjects' url={url} />
    </>
  )
}

export default DeleteSingleCourse
