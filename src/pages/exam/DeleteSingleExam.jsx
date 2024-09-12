import React from 'react'
import DeleteSingleEntry from '../../components/DeleteSingleEntry'

const url = "https://husmerklmsbackend.onrender.com/api/v1/exams/exam-delete/"

function DeleteSingleClass() {
  return (
    <div>
        <DeleteSingleEntry url={url} back={'exams'} />
    </div>
  )
}

export default DeleteSingleClass