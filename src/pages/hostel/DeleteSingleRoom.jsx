import React from 'react'
import DeleteSingleItem from '../../components/deleteItem/DeleteSingleItem'

const url = 'https://husmerklmsbackend.onrender.com/api/v1/rooms/room-delete'

function DeleteSingleRoom() {
  return (
    <>
      <DeleteSingleItem url={url}/>
    </>
  )
}

export default DeleteSingleRoom
