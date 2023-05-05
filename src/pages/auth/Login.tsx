import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layout';
import { utils } from '../../utils';
import { useAuth, useProjects } from '../../hooks';
import { User } from '../../interfaces';
import { pmApi } from '../../config';

type FormData = {
    email    : string;
    password : string;
}

export const Login: React.FC = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ errorM, setError ] = useState(false);
    const [ welcome, setWelcome ] = useState(false);
    const [ message, setMessage ] = useState('');

    const navigate = useNavigate();

    const { setUserSession } = useAuth();
    const { updateProjectsInState } = useProjects();


    const onSignIn = async ({ email, password }: FormData) => {
        try {
            const { data } = await pmApi.post(`/users/login`, { email, password });
            
            setWelcome(true);

            localStorage.setItem('token', data.token);
            setUserSession(data as User);
            updateProjectsInState();
            setTimeout(() => {
                setWelcome(false)
                navigate('/projects');
            }, 1000);
            
        } catch (error: unknown) {

            console.log({error});
            setError(true);
            setMessage((error as any).response.data.msg);
            setTimeout(()=> {
                setError(false)
                setMessage('');
            }, 2200);
        }   
    }

    return (
        <AuthLayout title='Login Page'>
          <Box maxWidth={'350px'} className='fadeInUp' mx='auto'>
              <Typography color='info.main' variant='h3' component='h1' sx={{ textAlign:'justify', ml:1, letterSpacing:2, fontWeight:300, textTransform:'capitalize' }}>Log in</Typography>
              <Typography color='primary.main' variant='h3' component='h1' sx={{ ml:1, letterSpacing:2, fontWeight:900, textTransform:'capitalize' }}>and manage your projects</Typography>
          </Box>
            <form  className='fadeInUp' onSubmit={ handleSubmit(onSignIn) }>
                <Grid sx={{ maxWidth:'350px', mx:'auto', p: 4, borderRadius: 5, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2)', mt: 2 }}>
                      <Grid container spacing={ 3 }>
                            <Grid item xs={ 12 }>
                                <Chip
                                    label={ message }
                                    color='error'
                                    className='fadeInUp'
                                    icon= {<ErrorOutline/>}
                                    variant='outlined'
                                    sx={{ display: errorM ? 'flex' : 'none' , mt: 1 }}
                                />

                                <Chip
                                    label='Verified'
                                    color='success'
                                    className='fadeInUp'
                                    icon= {<CheckCircleOutline/>}
                                    variant='outlined'
                                    sx={{ display: welcome ? 'flex' : 'none' , mt: 1 }}
                                />
                            </Grid>

                            <Grid item xs={ 12 } >
                                <TextField 
                                    type='email'
                                    {...register('email',{
                                        required: 'Email is required',
                                        validate: utils.emailValidator.isEmail
                                    })}
                                    error={ !!errors.email }
                                    helperText={errors?.email?.message as string}
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
                                    helperText={errors.password?.message as string}
                                    variant='filled' 
                                    type={'password'} 
                                    fullWidth 
                                    label='Password' />
                            </Grid>

                            <Grid item xs={ 12 } display='flex' justifyContent='center'>
                                <Button type='submit' color='info' variant='contained' fullWidth className='circular-btn' size='large' >
                                    Log in
                                </Button>
                            </Grid>

                            <Grid item xs={ 12 } display='flex' justifyContent='end'>
                                <Link component='span'>
                                    <Typography variant='body2' color='black'>
                                        Don&apos;t have an account? Sign Up
                                    </Typography>
                                </Link>
                            </Grid>

                        </Grid>
                    </Grid>
            </form>
        </AuthLayout>
    )
}


