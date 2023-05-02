import { useState } from 'react';
import { useForm } from "react-hook-form"
import { Box, Button, Chip, Grid, Input, TextField, Typography } from "@mui/material"
import { CheckCircleOutline } from "@mui/icons-material"
import { Layout } from "../../components/layout"
import { useProjects } from '../../hooks';
import { useNavigate } from 'react-router-dom';

type FormData = {
    name       : string;
    description: string;
    client     : string;
    deliveryDate: string;
}

export const EditProject = () => {

    const { project, updateProject } = useProjects();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            name: project?.name,
            description: project?.description,
            client: project?.client,
            deliveryDate: project?.deliveryDate 
        }
    });

    const [alert, setAlert] = useState(false);

    const navigate = useNavigate();

    const onUpdateProject = async (projectData: FormData) => {
        console.log(projectData)
        setAlert(true);
        setTimeout(() => { 
            updateProject(projectData);
            setAlert(false);
            navigate('/projects');
        },1500);

    }

  return (
    <Layout title='Edit Project'>
          <Box maxWidth={'350px'} display={'flex'} className='fadeInUp' m='20px auto 0'>
              <Typography color='info.main' variant='h3' component='h1' fontWeight={ 500 } sx={{ mr:1, letterSpacing:2, fontWeight:300, textTransform:'capitalize' }}>Update</Typography>
              <Typography color='primary.main' variant='h3' component='h1' fontWeight={ 500 } sx={{ ml:1, letterSpacing:2, fontWeight:900, textTransform:'capitalize' }}>Project</Typography>
          </Box>
            <form  className='fadeInUp' onSubmit={ handleSubmit(onUpdateProject) }>
                <Grid sx={{ maxWidth:'420px', mx:'auto', p:4, borderRadius:5, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2)', mt:1 }}>
                      <Grid container spacing={ 3 }>
                            <Grid item xs={ 12 }>
                                
                                <Chip
                                    label='Project succesfully updated'
                                    color='success'
                                    className='fadeInUp'
                                    icon= {< CheckCircleOutline/>}
                                    variant='outlined'
                                    sx={{ display: alert ? 'flex' : 'none' , mt: 1 }}
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
                                    sx={{ mb:2 }}
                                    multiline
                                    rows={3}
                                    {...register('description',{
                                        required: 'Description is required',
                                        minLength: {
                                            value: 10, message:'Description must be at least 10 characters'
                                        }
                                    })} 
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                    variant='filled' 
                                    fullWidth
                                    label='Description' 
                                />

                                <Input 
                                    type='date'
                                    sx={{ my:'2px', py:2, px:1 }} 
                                    {...register('deliveryDate',{
                                        required: 'Deliver Date is required',
                                        }
                                        )}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={ 12 } display='flex' justifyContent='center'>
                                <Button type='submit' color='info' variant='contained' fullWidth className='circular-btn' size='large' >
                                    Update Project
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
            </form>
        </Layout>
    )
}

