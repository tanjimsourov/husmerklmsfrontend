import React from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { RxAvatar } from 'react-icons/rx'

function UserProfile() {
  return (

    <Tooltip title="profile"> 
        <IconButton>

            <RxAvatar />
          
        </IconButton>
    </Tooltip>

  )
}

export default UserProfile