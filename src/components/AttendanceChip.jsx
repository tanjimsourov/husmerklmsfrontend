import React from 'react'

function AttendanceChip({color, label}) {

  return (
    <>
      <div className={`attendance-chip ${color}`} >
            <span>{label}</span>
      </div>
    </>
  )
}

export default AttendanceChip
