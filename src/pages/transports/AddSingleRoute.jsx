import { Box, Button, Card, CardContent, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import React from 'react'
import { Header } from '../../components'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function AddSingleRoute() {

  const formik = useFormik({
    initialValues: {
      name: "",
      vehicles: [],
      routeFare: ''
    },
    onSubmit: async (values, {resetForm})=>{
      try{

        console.log( values )

      }catch(error){

      }finally{

      }
    },
    validationSchema: Yup.object().shape({
      name: Yup.string(),
      vehicles: Yup.array(),
      routeFare: Yup.number(),
    })
  })

  return (
    <>
      <Card>
          <CardContent>
              <Header title="Transport Information" noBtn={true} />
              <form>
                  <div className="row">
                      <div className="form-field col-xs-12 col-sm-6 col-md-4">
                          <TextField 
                              name="name"
                              label="Route Name"
                          />
                      </div>
                      <div className="form-field col-xs-12 col-sm-6 col-md-4">
                          <FormControl fullWidth>
                              <InputLabel id="vehicle-select-label">Vehicles</InputLabel>
                              <Select
                                multiple
                                labelId="vehicle-select-label"
                                id="vehicle-select-id"
                                label="Vehicles"
                                name="vehicles"
                                value={formik.values.vehicles}
                                onChange={formik.handleChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={selected=>(
                                  <Box>
                                      {
                                        selected.map((value)=>(
                                          <Chip key={value} label={value} />
                                        ))
                                      }
                                  </Box>
                                )}
                              >
                                  <MenuItem value={1}>ljldk</MenuItem>
                                  <MenuItem value={2}>lxjldk</MenuItem>
                              </Select>
                          </FormControl>
                      </div>
                      
                      <div className="form-field col-xs-12 col-sm-6 col-md-4">
                          <TextField 
                              name="routeFare"
                              label="Route Fare"
                          />
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

export default AddSingleRoute
