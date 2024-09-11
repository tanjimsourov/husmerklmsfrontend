import React from 'react'
import DeleteSingleItem from '../../components/deleteItem/DeleteSingleItem'
import { useParams } from 'react-router-dom'

const url = 'https://api.ibnhaysam.com/api/v1/studentFinancial/student-fee-collection/delete/:id'

function DeleteSingleDistribution() {

  const {id} = useParams()
  return (
    <>
      <DeleteSingleItem path="/payment" url={`${url}/${id}`} />
    </>
  )
}

export default DeleteSingleDistribution
