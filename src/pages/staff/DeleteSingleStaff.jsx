import React from 'react'
import DeleteSingleEntry from '../../components/DeleteSingleEntry'

const url = 'https://api.ibnhaysam.com/api/v1/users/delete/';

const DeleteSingleStaff = () => {
  return (
    <>
      <DeleteSingleEntry url={url} />
    </>
  )
}

export default DeleteSingleStaff
