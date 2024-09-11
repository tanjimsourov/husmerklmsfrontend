import React from 'react'
import Button from '@mui/material/Button'
import { IoIosAddCircle } from 'react-icons/io' 
import { Link } from 'react-router-dom'

function AddItem() {
  return (
    <Link to='add'>
      <Button 
        sx={{backgroundColor: 'var(--main-color)', display: 'flex', alignItems: 'center' }} 
        variant="contained" 
        startIcon={<IoIosAddCircle />}
      >
          Add Item
      </Button>
    </Link>
  )
}

export default AddItem