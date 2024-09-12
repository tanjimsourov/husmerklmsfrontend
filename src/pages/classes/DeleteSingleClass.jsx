import React from 'react'
import DeleteSingleEntry from '../../components/DeleteSingleEntry'

const url = "https://husmerklmsbackend.onrender.com/api/v1/classes/class-delete/"

function DeleteSingleClass() {
  return (
    <div>
        <DeleteSingleEntry url={url} back={'classes'} />
    </div>
  )
}

export default DeleteSingleClass