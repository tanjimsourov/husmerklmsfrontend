import React from 'react'
import DeleteSingleEntry from '../../components/DeleteSingleEntry'

const url = 'https://husmerklmsbackend.onrender.com/api/v1/financial/delete-salary-details/'

const DeleteSingleSalary = () => {
  return (
    <div>

        <DeleteSingleEntry url={url} />
      
    </div>
  )
}

export default DeleteSingleSalary
