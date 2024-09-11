import React from 'react'
import DeleteSingleEntry from '../../components/DeleteSingleEntry'

const url = "https://api.ibnhaysam.com/api/v1/studentFinancial/student-fee-collection/delete/"

const DeleteSingleTransaction = () => {
  return (
    <div>
        <DeleteSingleEntry url={url} />
    </div>
  )
}

export default DeleteSingleTransaction
