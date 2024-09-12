import { Box, Card, CardContent, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {GoZoomIn} from "react-icons/go"
import {RxCross2} from 'react-icons/rx'

function StudentRoutine({data}) {

    const [open, setOpen] = useState(false)
    
    const handleOpen = ()=> setOpen(true)
    const handleClose = ()=> setOpen(false)

  return (
    
        <div>
            {
                data && <div>

                    <Modal 
                        open={open}
                    >
                        <div className="container" style={{padding: '1rem', maxHeight: 'calc(100vh - 2rem )'}}>
                            
                                <Card>
                                    <CardContent>
                                        <div style={{fontSize: '1.5em', cursor: 'pointer'}} className="cross" onClick={handleClose}>
                                            <RxCross2 />
                                        </div>
                                        <Box
                                            sx={{overflow: 'scroll', width: '100%', maxHeight: 'calc(100vh - 2rem )'}}
                                        >
                                        {
                                            data?.routine &&
                                            <img style={{width: '100%', aspectRatio: '1/1', objectFit: 'contain'}} src={`https://husmerklmsbackend.onrender.com/api/v1/uploads/${data?.routine}`} alt="" />
                                        }
                                        </Box>
                                    </CardContent>
                                </Card>
                            
                        </div>
                    </Modal>
                    <div className="row">
                        <div className="col-xs-12 col-sm-3"></div>
                        <div className="col-xs-12 col-sm-6" style={{position: 'relative'}}>
                            
                                <div onClick={handleOpen} className="float">
                                    <GoZoomIn />
                                </div>
                                <img style={{width: '100%', aspectRatio: '1/1', objectFit: 'contain'}} src={`https://husmerklmsbackend.onrender.com/api/v1/uploads/${data?.routine}`} alt="" />

                            

                        </div>
                        <div className="col-xs-12 col-sm-3"></div>
                    </div>
                </div>
            }
        </div>
    
  )
}

export default StudentRoutine