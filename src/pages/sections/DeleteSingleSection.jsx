import React from 'react'
import DeleteSingleItem from '../../components/deleteItem/DeleteSingleItem'

const url = 'https://api.ibnhaysam.com/api/v1/sections/section-delete'

function DeleteSingleSection() {
  return (
    <>
      <DeleteSingleItem path='/sections' url={url} />
    </>
  )
}

export default DeleteSingleSection
