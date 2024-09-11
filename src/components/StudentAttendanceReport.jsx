import React from 'react'
import { Box, CircularProgress } from '@mui/material';

function StudentAttendanceReport(props) {

    const calculateAttendance = ()=>{
        console.log(Math.round((props.attend/props.taken)*100));
        return Math.round((props.attend/props.taken)*100);
    }

  return (
    <div style={{width: '100%'}}>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress style={{color: '#0a7518'}} variant="determinate" value={calculateAttendance()} />
            <Box
                sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}
            >
                
                {calculateAttendance()+"%"}
                
            </Box>
        </Box>

    </div>
  )
}

export default StudentAttendanceReport