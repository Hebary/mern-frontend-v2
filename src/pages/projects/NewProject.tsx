import {  useState } from 'react';
import { Box, Button, Chip, Grid, Link, TextField, Typography, RadioGroup, Select, InputLabel, Input } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { AuthLayout } from '../../components/layout';
import { useForm } from 'react-hook-form';

type FormData = {
    name       : string;
    client     : string;
    description: string;
    status     ?: string;
    deliverDate: string;
}

export const NewProject: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [error, setError] = useState(false);
    const [status, setStatus] = useState('');
    
    const onCreateProduct = async ({name, client, description, status, deliverDate}:FormData) => {
        console.log({name, client, description, status, deliverDate});
    }
  
    return (
        <AuthLayout title='New Project'>
          <Box maxWidth={'350px'} display={'flex'} className='fadeInUp' mx='auto'>
              <Typography color='info.main' variant='h3' component='h1' fontWeight={ 500 } sx={{ mr:1, letterSpacing:2, fontWeight:300, textTransform:'capitalize' }}>New</Typography>
              <Typography color='primary.main' variant='h3' component='h1' fontWeight={ 500 } sx={{ ml:1, letterSpacing:2, fontWeight:900, textTransform:'capitalize' }}>Project</Typography>
          </Box>
            <form  className='fadeInUp' onSubmit={ handleSubmit(onCreateProduct) }>
                <Grid sx={{ maxWidth:'420px', mx:'auto', p:4, borderRadius:5, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2)', mt:1 }}>
                      <Grid container spacing={ 3 }>
                            <Grid item xs={ 12 }>
                                
                                <Chip
                                    
                                    label='All Fields are required'
                                    color='error'
                                    className='fadeIn'
                                    icon= {<ErrorOutline/>}
                                    variant='outlined'
                                    sx={{ display: error ? 'flex' : 'none' , mt: 1 }}
                                />

                            </Grid>

                            <Grid item xs={ 12 } >
                                <TextField 
                                    {...register('name',{
                                        required: 'Name is required',
                                        minLength: {
                                            value: 3, message:'Name must be at least 3 characters'
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
                                    {...register('client',{
                                        required: 'Client is required',
                                        minLength: {
                                            value: 3, message:'Client must be at least 3 characters'
                                        }
                                    })}
                                    error={ !!errors.client }
                                    helperText={errors.client?.message}
                                    variant='filled' 
                                    fullWidth 
                                    label='Client' />
                            </Grid>

                            <Grid item xs={ 12 } >
                                <TextField 
                                    sx={{mb:2}}
                                    multiline
                                    rows={3}
                                    fullWidth
                                    {...register('description',{
                                        required: 'Description is required',
                                        minLength: {
                                            value: 10, message:'Description must be at least 10 characters'
                                        }
                                    })} 
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                    variant='filled' 
                                    label='Description' 
                                />
                                {/* <RadioGroup sx={{mb:2}}>
                                    <InputLabel sx={{ fontWeight:400, fontSize:15, ml:.5 }}>Priority Level</InputLabel>
                                    <Select 
                                        value={status}
                                        onChange={(e)=>setStatus(e.target.value)}
                                        // {...register('status',{
                                        //     required: 'Status is required',

                                        // })}
                                    >
                                        <option style={{cursor: 'pointer'}} value={'Low'} >Low</option>
                                        <option style={{cursor: 'pointer'}} value={'Medium'} >Medium</option>
                                        <option style={{cursor: 'pointer'}} value={'High'} >High</option>
                                    </Select>
                                </RadioGroup> */}

                                <Input 
                                    type='date'
                                    fullWidth
                                    sx={{my:'2px', py:2, px:1}} 
                                    {...register('deliverDate',{
                                        required: 'Deliver Date is required',
                                    })}
                                />
                            </Grid>

                            <Grid item xs={ 12 } display='flex' justifyContent='center'>
                                <Button type='submit' color='info' variant='contained' fullWidth className='circular-btn' size='large' >
                                    Create Project
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
            </form>
        </AuthLayout>
    )
}


