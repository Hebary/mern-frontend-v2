import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom"
import { Box, Button, Chip, FormControl, Grid, IconButton, Input, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { Layout } from "../../components/layout"
import { useProjects, useUI } from "../../hooks";
import { FullScreenLoading } from '../../components/ui';
import { AddCircleOutlineRounded, CheckCircleOutline, EditOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { grey } from '@mui/material/colors';

type FormData = {
    name        : string;
    description : string;
    deliveryDate: string;
    priority    : string;
}

const PRIORITY = ['Low', 'Medium', 'High'];

export const ProjectPage: React.FC = () => {

    const { getProjectById, project, createNewTask } = useProjects();

    const { isModalOpen, toggleModal } = useUI();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);

    const [priority, setPriority] = useState(PRIORITY[0]);
    
    const { id } = useParams();
    
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    useEffect(() => {
        setLoading(true);
        getProjectById(id as string);
        setTimeout(() => setLoading(false), 2000);
    }, [])

    const onSubmitTask = async( data: FormData ) => {
        createNewTask({...data, priority, project: project?._id as string});
        setAlert(true);
        setTimeout(() => {
            setAlert(false)
            toggleModal();
        }, 1500);
    }

    return (
        <Layout>
            {
                loading 
                    ? <FullScreenLoading/> 
                    : <> 
                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} sx={{ borderBottom: '1px solid #ccc', py:2 }} className='fadeInUp' >
                            <Typography color='info.main' variant='h5' component='h1' sx={{ textAlign:'justify', letterSpacing: 2, fontWeight: 300, textTransform:'capitalize' }}>{project?.name}</Typography>
                            <Link to={`/projects/edition/${project?._id}`}>
                                <Button
                                    variant='outlined'
                                    sx={{ py:0, textTransform:'capitalize', fontWeight:300, fontSize:'15px' }}
                                    endIcon={<EditOutlined sx={{ color:'primary.main',  fontSize:'30px' }}/> }
                                 >Edit Project
                                </Button>
                            </Link>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} mt={2} justifyContent='space-between' className='fadeInUp' >
                            <Typography variant='h6' component='h2' sx={{ fontWeight:300, textTransform:'capitalize' }}>Tasks</Typography>
                            <Button variant='outlined' onClick={ toggleModal }  sx={{ textTransform:'capitalize', py:0, fontWeight:300 }} endIcon={<AddCircleOutlineRounded/>}>
                                Add Task
                            </Button>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'} gap={2} className='fadeInUp' >
                            {project?.tasks.map(task => 
                                <Grid sx={{ mb:2, mt:3, borderRadius:3, p:3, ml:2, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', cursor:'pointer', ":hover":{ bgcolor:grey[200] }, transition: 'all .3s ease-in-out' }} item xs={12} md={10} >
                                    <Box display='flex' alignItems='center' gap={1}>
                                        <Typography variant='body1' sx={{fontWeight:500}} className='red-hat-font'>{ task.name }</Typography>
                                        <Typography variant='body2' sx={{fontWeight:300}} className='red-hat-font'>{ task.description }</Typography>
                                        <Typography variant='body2' sx={{fontWeight:300}} className='red-hat-font'>{ task.priority+' priority' }</Typography>
                                    </Box>
                                </Grid>
                                )
                            }
                        </Box>

                        <Modal
                            open={ isModalOpen }
                            onClose={ toggleModal }
                            aria-labelledby="parent-modal-title"
                            aria-describedby="parent-modal-description"
                            sx={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}
                            >
                              <Box sx={{  width: 400 }}>
                            <form onSubmit={handleSubmit(onSubmitTask)}>
                                <Box display='flex' flexDirection='column' gap={2} sx={{ width:'100%', bgcolor:'background.paper', p:2, borderRadius:2 }}>
                                    <Box display='flex' alignItems='center' justifyContent={'center'} mt={2} gap={1}>
                                        <Typography id="parent-modal-title" color='info.main' fontWeight={300} textTransform={'capitalize'} textAlign={'center'} variant="h5" component="h2">new</Typography>
                                        <Typography id="parent-modal-title" textAlign={'center'} variant="h5" component="h2">task</Typography>
                                    </Box>

                                    <Grid item xs={ 12 }>
                                        <Chip
                                            label='Task succesfully created'
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
                                    </Grid>
                                    
                                    
                                    <FormControl fullWidth>
                                      <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                                        <Select
                                          value={priority}
                                          onChange={(e) => setPriority(e.target.value)}
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          label="Priority"
                                        >
                                            { PRIORITY.map( priority => 
                                                    <MenuItem value={priority}>{priority}</MenuItem>
                                                )
                                            }
                                        </Select>

                                    </FormControl>
                                    <Input 
                                            type='date'
                                            fullWidth
                                            sx={{my:'2px', py:2, px:1}} 
                                            {...register('deliveryDate',{
                                                required: 'Deliver Date is required',
                                                }   
                                            )}
                                    />
                                    <Button type='submit' color='info' variant='contained' fullWidth size='large' >
                                        Add Task
                                    </Button>
                                </Box>
                            </form>
                            </Box>
                        </Modal>
                    </>
            }

        </Layout>
    )
}
