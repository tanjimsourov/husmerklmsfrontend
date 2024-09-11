import { Card, CardContent, TextField } from '@mui/material'
import React from 'react'
import { Header } from '../../components'

function ViewSingeRoute() {
  return (
    <>

        <Card>
            <CardContent>
                <Header title="Route Details" noBtn={true} />
                <div className="row">
                    <div className="form-field col-xs-12 col-sm-6 col-md-4">
                        <TextField 
                            label="Route Name"
                        />
                    </div>
                    <div className="form-field col-xs-12 col-sm-6 col-md-4">
                        <TextField 
                            label="Vehicle Number"
                        />
                    </div>
                    <div className="form-field col-xs-12 col-sm-6 col-md-4">
                        <TextField 
                            label="Driver Name"
                        />
                    </div>
                    <div className="form-field col-xs-12 col-sm-6 col-md-4">
                        <TextField 
                            label="Driver Licence"
                        />
                    </div>
                    <div className="form-field col-xs-12 col-sm-6 col-md-4">
                        <TextField 
                            label="Contact Number"
                        />
                    </div>
                    <div className="form-field col-xs-12 col-sm-6 col-md-4">
                        <TextField 
                            label="Driver Address"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
      
    </>
  )
}

export default ViewSingeRoute
