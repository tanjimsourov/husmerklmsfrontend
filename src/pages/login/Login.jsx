import React, {useEffect, useState} from 'react'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import { Backdrop, Button, Card, CardContent, Stack } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { ToastContainer, toast } from 'react-toastify';


import Logo from '../../assets/imgs/logo.png'
import Bg from '../../assets/imgs/login-page-bg.jpg'
import { Header } from '../../components';


function Login() {

  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()
  
  useEffect(()=>{
    
    if(isAuthenticated()){
      navigate('/')
    }
  }, [])

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const signIn = useSignIn();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values)=>{

      setLoading(true)
      try{
          const res = await axios.post("https://husmerklmsbackend.onrender.com/api/v1/users/login", values)
          console.log("Data: ", res.data)

          setLoading(false)
          
          if(res.success){

            toast.success(res.data.message)

          }else{
            toast.error(res.data.message)
          }

          if(signIn({
  
            auth: {
                token: res.data.token,
                type: 'Bearer'
            },
            userState: {
              user: res.data.data[0].name,
              token: res.data.token,
              role: res.data.data[0].role
            }

          })){
            
            navigate('/'); 
            setLoading(false)
          }else {
              setError('could not logged in')
          }

      }catch(error){
        // setError(error.res?.data.message);
        toast.error(error.message)
        console.error(error)
      }
    }
  });  

  return (
    <div className='login-page' style={{backgroundImage: `url(${Bg})`}}>

      {
        loading && <Backdrop open={loading}><CircularProgress /></Backdrop>
      }

      {
        toast && <ToastContainer />
      }
        
          <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-5">
                  <div className="login-wrapper">
                    

                            <div className="row">

                                    <div className="col-12">

                                        <img src={Logo} alt="Logo" style={{  height : 250, width: 250, }}/>
                                        <Header title="Husmerk School/Madrasa Management System" subtitle={'Control/Manage your institution'} noBtn={true} />
                                        <Header title="Sign In" subtitle={'Please login to your account'} noBtn={true} />
                                        <form onSubmit={formik.handleSubmit}>
                                            <Stack spacing={2}>

                                              <TextField
                                                  name="email"
                                                  id="email"
                                                  label="email"
                                                  value={formik.values.email}
                                                  onChange={formik.handleChange}
                                                  variant="outlined"
                                                  fullWidth
                                              />

                                              <FormControl fullWidth>
                                                  <InputLabel htmlFor="password">Password</InputLabel>
                                                  <Input
                                                      name="password"
                                                      id="password"
                                                      type={showPassword ? 'text' : 'password'}
                                                      value={formik.values.password}
                                                      onChange={formik.handleChange}
                                                      fullWidth
                                                      endAdornment={
                                                      <InputAdornment position="end" sx={{width: '100%', justifyContent: 'flex-end'}}>
                                                          <IconButton
                                                          aria-label="toggle password visibility"
                                                          onClick={handleClickShowPassword}
                                                          onMouseDown={handleMouseDownPassword}
                                                          >
                                                          {showPassword ? <VisibilityOff /> : <Visibility />}
                                                          </IconButton>
                                                      </InputAdornment>
                                                      }
                                                  />

                                              </FormControl>

                                              <Button sx={{backgroundColor: 'var(--main-color)'}} type="submit" variant='contained' >Login</Button>
                                                      
                                            </Stack>
                                            
                                        </form>                                            

                                    </div>
                            </div>

                          
                        
                  </div>
              </div>
          </div>
    </div>
  )
}

export default Login