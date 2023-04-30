// import { useEffect, useState } from 'react';
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography, TextareaAutosize, RadioGroup, Select, InputLabel } from '@mui/material';
// import { ErrorOutline } from '@mui/icons-material';
import { AuthLayout } from '../../components/layout';
import BasicDatePicker from '../../components/ui/projects/DatePicker';



export const NewProject: React.FC = () => {

  {/* onSubmit={ handleSubmit(onSignIn) } */}
   return (
        <AuthLayout title='New Project'>
          <Box maxWidth={'350px'} display={'flex'} className='fadeInUp' mx='auto'>
              <Typography color='info.main' variant='h3' component='h1' fontWeight={ 500 } sx={{ mr:1, letterSpacing:2, fontWeight:300, textTransform:'capitalize' }}>New</Typography>
              <Typography color='primary.main' variant='h3' component='h1' fontWeight={ 500 } sx={{ ml:1, letterSpacing:2, fontWeight:900, textTransform:'capitalize' }}>Project</Typography>
          </Box>
            <form  className='fadeInUp'>
                <Grid sx={{ maxWidth:'420px', mx:'auto', p:4, borderRadius:5, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2)', mt:1 }}>
                      <Grid container spacing={ 3 }>
                            <Grid item xs={ 12 }>
                                
                                {/* <Chip
                                    
                                    label='Please check your credentials'
                                    color='error'
                                    className='fadeIn'
                                    icon= {<ErrorOutline/>}
                                    variant='outlined'
                                    sx={{ display: error ? 'flex' : 'none' , mt: 1 }}
                                /> */}

                            </Grid>

                            <Grid item xs={ 12 } >
                                <TextField 
                                    // type='email'
                                    // {...register('email',{
                                    //     required: 'Email is required',
                                    //     validate: utils.isEmail
                                    // })}
                                    // error={ !!errors.email }
                                    // helperText={errors.email?.message}
                                    variant='filled' 
                                    fullWidth 
                                    label='Name' />
                            </Grid>
                            <Grid item xs={ 12 } >
                                <TextField 
                                    // type='email'
                                    // {...register('email',{
                                    //     required: 'Email is required',
                                    //     validate: utils.isEmail
                                    // })}
                                    // error={ !!errors.email }
                                    // helperText={errors.email?.message}
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
                                    // {...register('password',{
                                    //     required: 'Password is required',
                                    //     minLength: {
                                    //         value: 6, message:'Password must be at least 6 characters'
                                    //     }
                                    // })} 
                                    // error={!!errors.password}
                                    // helperText={errors.password?.message}
                                    variant='filled' 
                                    label='Description' 
                                />
                                <RadioGroup sx={{mb:2}}>
                                    <InputLabel sx={{ fontWeight:400, fontSize:15, ml:.5 }}>Priority Level</InputLabel>
                                    <Select>
                                        <option style={{cursor: 'pointer'}} value={'Low'} >Low</option>
                                        <option style={{cursor: 'pointer'}} value={'Medium'} >Medium</option>
                                        <option style={{cursor: 'pointer'}} value={'High'} >High</option>
                                    </Select>
                                </RadioGroup>
                                <BasicDatePicker/>
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


