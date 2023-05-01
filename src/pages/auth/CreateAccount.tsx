 import { useState } from 'react';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
 import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layout';
import { utils } from '../../utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type FormData = {
    name    : string;
    email   : string;
    password: string;
}

export const CreateAccount: React.FC = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    
    const [welcome, setWelcome] = useState(false);
    const [message, setMessage] = useState('');

    const [error, setError] = useState(false);
    
    const navigate = useNavigate();
    
    const onSignUp = async ({name, email, password}:FormData) =>{
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users`,{name,email, password});
            // console.log(data);
            setWelcome(true);
            setMessage(data.msg);

            setTimeout(()=> {
                setWelcome(false)
                navigate('/login');
                setMessage('');
            },2200);

        } catch (error: unknown) {
            console.log({error});
            setError(true);
            setMessage((error as any).response.data.msg);
            setTimeout(()=> setError(false),2200);
        }
    }
    
    
    return (
        <AuthLayout title='Sign In Page'>
          <Box maxWidth={'350px'} className='fadeInUp' mx='auto'>
              <Typography color='info.main' variant='h3' component='h1' fontWeight={ 300 } sx={{ textAlign:'justify', ml: 1, letterSpacing: 2, textTransform:'capitalize' }}>
                Sign Up
              </Typography>
              <Typography color='primary.main' variant='h3' component='h1' sx={{ ml:1, letterSpacing:2, fontWeight:900, textTransform:'capitalize' }}>
                and manage your projects
              </Typography>
          </Box>
            <form  className='fadeInUp' onSubmit={ handleSubmit(onSignUp) }>
                <Grid sx={{ maxWidth:'350px', mx:'auto', p:4, borderRadius:5, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2)', mt:2 }}>
                      <Grid container spacing={ 3 }>
                            <Grid item xs={ 12 }>
                                
                                <Chip
                                    
                                    label={message}
                                    color='error'
                                    className='fadeIn'
                                    icon= {<ErrorOutline/>}
                                    variant='outlined'
                                    sx={{ display: error ? 'flex' : 'none' , mt: 1 }}
                                />
                                
                                <Chip
                                    label={message}
                                    color='success'
                                    className='fadeIn'
                                    icon= {<CheckCircleOutline/>}
                                    variant='outlined'
                                    sx={{ display: welcome ? 'flex' : 'none' , mt: 1 }}
                                />

                            </Grid>

                            <Grid item xs={ 12 } >
                                <TextField 
                                    type='text'
                                    {...register('name',{
                                        required: 'Name is required',
                                        minLength: {
                                            value: 2, message:'Name must be at least 2 characters'
                                        }
                                    })}
                                    error={ !!errors.name }
                                    helperText={errors.name?.message}
                                    variant='filled' 
                                    fullWidth 
                                    label='Name' />
                            </Grid>
                            <Grid item xs={ 12 } >
                                <TextField 
                                    type='email'
                                    {...register('email',{
                                        required: 'Email is required',
                                        validate: utils.emailValidator.isEmail
                                    })}
                                    error={ !!errors.email }
                                    helperText={errors.email?.message}
                                    variant='filled' 
                                    fullWidth 
                                    label='Email' />
                            </Grid>

                            <Grid item xs={ 12 } >
                                <TextField
                                    {...register('password',{
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6, message:'Password must be at least 6 characters'
                                        }
                                    })} 
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    variant='filled' 
                                    type={'password'} 
                                    fullWidth 
                                    label='Password' />
                            </Grid>

                            <Grid item xs={ 12 } display='flex' justifyContent='center'>
                                <Button type='submit' color='info' variant='contained' fullWidth className='circular-btn' size='large' >
                                    Create Account
                                </Button>
                            </Grid>

                            <Grid item xs={ 12 } display='flex' justifyContent='end'>
                                    <Link component='span'>
                                        <Typography variant='body2' color='black'>
                                            Already have an account? Login
                                        </Typography>
                                    </Link>
                            </Grid>

                        </Grid>
                    </Grid>
            </form>
        </AuthLayout>
    )
}


