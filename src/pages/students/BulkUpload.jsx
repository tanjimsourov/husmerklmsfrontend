import { Alert, Backdrop, Card, CardContent, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { Header } from '../../components'
import { FaFileUpload } from "react-icons/fa";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { CheckCircleOutline } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import axios from 'axios';

function BulkUpload() {

  const authHeader = useAuthHeader()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      csv: '',
    },
    validationSchema: Yup.object().shape({
      csv: Yup.mixed()
      .test('fileType', 'Invalid file type, please upload a CSV file.', (value) => {
        if (!value) return true; // No file uploaded, validation should pass
        return value && ['text/csv'].includes(value.type);
      })
    }),
    enableReinitialize: true,
    onSubmit: async(values, {resetForm})=>{
      try{
        setLoading(true)

        const headers = {
          "Authorization": authHeader,
          'Content-Type': 'multipart/form-data',
        }

        const response = await axios.post('https://husmerklmsbackend.onrender.com/api/v1/students/student-import', values, {headers: headers});

        console.log('Registration successful:', response.data);
        toast(response.data.message)

        if (response.status === 200) {
          // Reset the form after successful submission
          setLoading(false)
          resetForm();
        } else{
            setLoading(false)
        }

      }catch(error){
        console.error('Error:', error);
        toast(error.response.data.error)
        setLoading(false)
      }finally{
        setLoading(false)

      }
    }
  })

  return (
    <div>
        {loading && <Backdrop open={loading}><CircularProgress /></Backdrop>}
        { toast !== '' && <ToastContainer />}
        <Card>
            <CardContent>
                <Header title="Upload CSV" noBtn={true} subtitle="Select file to upload"/>
                <form onSubmit={formik.handleSubmit}>
                  <div className="upload-media-wrapper">
                        <span className='file-upload-icon'>
                          <FaFileUpload />
                        </span>
                        <Button
                          component="label"
                          variant="contained"
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload file
                          <input
                            accept=".csv"
                            name="csv"
                            id="contained-button-file"
                            onChange={event=>{
                              formik.setFieldValue("csv", event.target.files[0]);
                            }}
                            type="file"
                            style={{ display: 'none' }}
                          />

                        </Button>
                  </div>
                
                    {
                        formik.values.csv &&
                        <Alert icon={<CheckCircleOutline />} severity='success'>
                            {formik.values.csv.name}
                        </Alert>
                    }

                    {
                      formik.values.csv && 
                      <Button type="submit" sx={{marginTop: '20px'}} variant="outlined">
                        Submit
                      </Button>
                    }
                </form>
              
            </CardContent>
        </Card>
      
    </div>
  )
}

export default BulkUpload
