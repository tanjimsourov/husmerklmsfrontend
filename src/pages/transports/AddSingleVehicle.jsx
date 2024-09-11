import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { Header } from '../../components'

function AddSingleVehicle() {
  return (
    <>
       <Card>
            <CardContent>
                <Header title="Vehicle Information" noBtn={true} />
                <form>
                    <div className="row">
                        <div className="form-field col-xs-12 col-sm-6 col-md-4">
                            <TextField 
                                name="name"
                                label="Vehicle Name"
                            />
                        </div>
                        <div className="form-field col-xs-12 col-sm-6 col-md-4">
                            <TextField 
                                name="licenseNumber"
                                label="License Number"
                            />
                        </div>
                        <div className="form-field col-xs-12 col-sm-6 col-md-4">
                            <FormControl fullWidth>
                                <InputLabel id="driver-select-label">Driver</InputLabel>
                                <Select
                                    labelId="driver-select-label"
                                    id="driver-select-id"
                                    label="Driver"
                                >
                                    <MenuItem value={1}>Driver 1</MenuItem>
                                    <MenuItem value={2}>Driver 2</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <Button type="submit" variant='contained'>Submit</Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card> 
    </>
  )
}

export default AddSingleVehicle
