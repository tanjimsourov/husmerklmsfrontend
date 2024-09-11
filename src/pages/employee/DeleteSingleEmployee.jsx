import React from 'react'
import DeleteSingleItem from '../../components/deleteItem/DeleteSingleItem'

const url = 'https://api.ibnhaysam.com/api/v1/users/delete'

function DeleteSingleEmployee() {
  return (
    <>
      <DeleteSingleItem path="/employees" url={url} />
    </>
  )
}

export default DeleteSingleEmployee
