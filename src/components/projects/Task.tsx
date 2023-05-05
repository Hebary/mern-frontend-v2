import { Box, Button, Grid, Typography } from "@mui/material"
import { grey, green, orange, blue } from "@mui/material/colors"
import { CheckCircleOutline, EditOutlined, RuleRounded } from "@mui/icons-material"
import { useProjects } from "../../hooks"
import { Task as ITask } from "../../interfaces"
import { useAdmin } from '../../hooks/useAdmin';
import { Link } from "react-router-dom"

interface Props {
    task: ITask;
    showEdit?: boolean;
}

export const Task: React.FC<Props> = ({ task, showEdit = false }) => {
    const { changeTaskState } = useProjects();
    const admin = useAdmin();

    const onChangeTaskState = () => {
        changeTaskState(task?._id as string);
    }
    return (
        <>
            <Grid key={task?._id} sx={{ mb:2, borderRadius:3, p:3, mx:4, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', cursor:'pointer', ":hover":{ bgcolor:blue[50] }, transition: 'all .3s ease-in-out' }} item xs={12} md={10} >
                <Box display='flex' alignItems='center' justifyContent={'space-between'} flexWrap='wrap' gap={1}>
                    <Typography variant='body1' sx={{ fontWeight:500 }} className='red-hat-font'>{ task?.name }</Typography>
                    <Typography variant='body2' sx={{ fontWeight:300 }} className='red-hat-font'>{ task?.description }</Typography>
                    <Typography variant='body2' sx={{ fontWeight:500 }} color={task?.priority === 'High' ? 'error' : '#FFA55A'} className='red-hat-font'>{ task?.priority+' priority' }</Typography>
                    <Box alignItems='center' justifyContent={'center'} display='flex' gap={1}>
                        { 
                            !task?.state
                            ?   <Button onClick={onChangeTaskState}size='small' sx={{ fontWeight:300, bgcolor:orange[500],':hover':{color:'#FFF', bgcolor:orange[700]} }}  endIcon={<RuleRounded/>} variant='text'>Incomplete</Button>
                            :   <Box display='flex' flexDirection='column' alignItems='start' justifyContent='end'>
                                    <Button onClick={onChangeTaskState}size='small' sx={{ fontWeight:300, bgcolor:green[300], ':hover':{color:'#FFF', bgcolor:green[400]} }} endIcon={<CheckCircleOutline/>} variant='text'>Complete</Button>
                                    { task?.completed.name &&
                                        <Typography className='fadeInUp' variant='body2'sx={{ml:.5, mt:.5}}>Completed by <span style={{fontWeight:'bold'}}> {task?.completed.name}</span></Typography>
                                    }
                                </Box>
                        } 
                        </Box>                
                    { admin && showEdit===false &&
                        <Link to={`task/${task?._id}`} style={{ textDecoration:'none', fontSize:17, color:'#8EA7E9', fontWeight:300, textTransform:'capitalize'}} >
                            <Button className='fadeInUp red-hat-font' size='small' sx={{textTransform:'capitalize'}}endIcon={<EditOutlined />} >
                                Edit
                            </Button>
                        </Link>
                    }
                </Box>
            </Grid>
        </>
    )
}
