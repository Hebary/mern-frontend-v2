import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import { Box, Button, Chip, FormControl, Grid, Input, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import {  CheckCircleOutline, DeleteForeverOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useProjects, useUI } from "../../hooks";
import { Layout } from "../../components/layout"
import { FullScreenLoading } from '../../components/ui';
import { Task } from '../../components/projects';
import { Task as ITask} from '../../interfaces';
import { red } from '@mui/material/colors';

type FormData = {
    name        : string;
    description : string;
    deliveryDate: string;
    priority    : string;
}

const PRIORITY = ['Low', 'Medium', 'High'];

export const ProjectEditTask: React.FC = () => {

    const { project, getTaskById, task, updateTask, deleteTask } = useProjects();

    const { isModalOpen, toggleModal } = useUI();
    const [ loading, setLoading ] = useState(false);
    const [ alert, setAlert ] = useState(false);
    
    const { taskId } = useParams();

    const [priority, setPriority] = useState(PRIORITY[0]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues: {
            name: task?.name,
            description: task?.description,
            deliveryDate: task?.deliveryDate,
            priority: PRIORITY[0]
        }
    });

    useEffect(() => {
        setLoading(true);
        getTaskById(taskId as string);
        setTimeout(() => setLoading(false), 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const navigate = useNavigate();

    const onSubmitTask = async( data: FormData ) => {
        updateTask({...data, priority, project: project?._id as string} as ITask);
        setAlert(true);
        setTimeout(() => {
            setAlert(false)
            reset();
            toggleModal();
            navigate(`/projects/${project?._id}`);
        }, 1500);
    }

    const onDeleteTask = () => {
        confirm('Are you sure you want to delete this task?') &&
        deleteTask(task as ITask);
        navigate(`/projects/${project?._id}`);
    }
    return (
        <Layout>
            {
                loading 
                    ? <FullScreenLoading/> 
                    : <> 
                        <Box display={'flex'} justifyContent={'start'} gap={1} alignItems={'center'} sx={{ borderBottom: '1px solid #ccc', py:2 }} className='fadeInUp' >
                            <Typography color='info.main' variant='h5' component='h1' sx={{ textAlign:'justify', letterSpacing: 2, fontWeight: 300, textTransform:'capitalize' }}>{project?.name}</Typography>
                        </Box>
                        <Box sx={{display:'flex', alignItems:'center', px:2, justifyContent:'space-between', my:2}} className='fadeInUp' >
                            <Typography variant='h6' component='h2' sx={{ fontWeight:300, textTransform:'capitalize' }}><strong>Task:</strong> { task?.name }</Typography>
                            <Button size ='small' startIcon={<DeleteForeverOutlined/>} onClick={onDeleteTask} variant='outlined' sx={{":hover":{color:'#FFF', bgcolor:red[700]}, fontWeight:300, textTransform:'capitalize' }}>
                                Delete
                            </Button>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'} onClick={ toggleModal } className='fadeInUp' >
                            <Task task={task as ITask} key={task?._id} showEdit={true} />
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
                                                label='Task succesfully updated'
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
                                                { PRIORITY.map( priority => <MenuItem  key={ priority } value={priority}>{priority}</MenuItem>) }
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
                                                error={!!errors.deliveryDate}

                                        />
                                        <Button type='submit' color='info' variant='contained' fullWidth size='large' >
                                           Update Task
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
