import React from 'react'
import DeleteSingleItem from '../../components/deleteItem/DeleteSingleItem'

const url = 'https://husmerklmsbackend.onrender.com/api/v1/hostels/delete-hostel'

function DeleteSingleHostel() {
  return (
    <>
      <DeleteSingleItem path="/hostels" url={url} />
    </>
  )
}

export default DeleteSingleHostel
