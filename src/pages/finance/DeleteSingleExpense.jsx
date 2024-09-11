import React from 'react'
import DeleteSingleEntry from '../../components/DeleteSingleEntry'

const url = `https://api.ibnhaysam.com/api/v1/expense/expenses/`

const DeleteSingleExpense = () => {
  return (
    <div>
        <DeleteSingleEntry url={url} back={'register-salary/view-expenses'} />
    </div>
  )
}

export default DeleteSingleExpense
