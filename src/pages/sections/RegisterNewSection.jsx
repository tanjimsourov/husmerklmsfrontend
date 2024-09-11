import { Button, Card, CardContent, Stack, FormControl, TextField } from '@mui/material'
import React, {useState, useRef} from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { FormHelperText } from '@mui/material';
import useGetClasses from '../../hooks/useGetClasses';
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

function RegisterNewSection() {

    const authHeader = useAuthHeader()
    const {classLists, isLoading, error} = useGetClasses();
    const [Loading, setLoading ] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: '',
            classLevel: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string(),
            classLevel: Yup.string(),
        }),
        onSubmit: async (values, {resetForm}) => {
            try{
                console.log(values)
                setLoading(true)
                const headers = {
                    "Authorization": authHeader,
                }
                const response = await axios.post('https://api.ibnhaysam.com/api/v1/sections/section-register', values, {headers: headers});
                toast.success(response.data.message)
                console.log(response.data)
                resetForm();
            }catch(err){
                console.error(err)
                toast.error(err.response.data.message)
            }finally{
                setLoading(false)
            }
        }
    })

  return (
    <div>
        {Loading && <div className="shadow"><CircularProgress /></div>}
        <Card>
            <CardContent>
                {toast !== '' && <ToastContainer />}
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <form action="" onSubmit={formik.handleSubmit}>

                            <Stack spacing={2}>
                                <TextField 
                                    label="Section Name" 
                                    variant='filled' 
                                    name="name"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    error={
                                        formik.touched.name && formik.errors.name
                                    }
                                    helperText={
                                        formik.touched.name && formik.errors.name
                                    }
                                />
                                <FormControl variant="filled" sx={{ width: '100%' }}>
                                    <InputLabel id="s_class_label_id">Class</InputLabel>

                                    <Select 
                                        labelId="s_class_label_id"
                                        label="Student class"
                                        id="s_class"
                                        variant='filled'
                                        name="classLevel"
                                        value={formik.values.classLevel}
                                        onChange={formik.handleChange}
                                        error={formik.touched.classLevel && Boolean(formik.errors.classLevel)}
                                    >
                                        {!isLoading && !error && classLists && classLists.map((item) => (
                                            <MenuItem key={item._id} value={item._id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                    
                                        {formik.touched.classLevel && formik.errors.classLevel && (
                                            <FormHelperText error>{formik.errors.classLevel}</FormHelperText>
                                        )}
                                </FormControl>
                            </Stack>
                            <Button type="submit" variant="contained">Submit</Button>
                        </form>
                    </div>
                    <div className="col-xs-12 col-sm-6"></div>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default RegisterNewSection