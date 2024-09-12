import React from 'react'
import DeleteSingleItem from '../../components/deleteItem/DeleteSingleItem'

const url = 'https://husmerklmsbackend.onrender.com/api/v1/students/student-delete'

function DeleteSingleStudent() {
  return (
    <>
      <DeleteSingleItem 
        path='/students'
        url={url}
      />
    </>
  )
}

export default DeleteSingleStudent
