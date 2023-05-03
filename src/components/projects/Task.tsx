import { Box, Grid, Typography } from "@mui/material"
import { Task as ITask } from "../../interfaces"
import { grey } from "@mui/material/colors"

interface Props {
    task: ITask
}

export const Task: React.FC<Props> = ({ task }) => {
   return (
        <Grid key={task._id} sx={{ mb:2, mt:3, borderRadius:3, p:3, ml:2, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', cursor:'pointer', ":hover":{ bgcolor:grey[200] }, transition: 'all .3s ease-in-out' }} item xs={12} md={10} >
            <Box display='flex' alignItems='center' gap={1}>
                <Typography variant='body1' sx={{fontWeight:500}} className='red-hat-font'>{ task.name }</Typography>
                <Typography variant='body2' sx={{fontWeight:300}} className='red-hat-font'>{ task.description }</Typography>
                <Typography variant='body2' sx={{fontWeight:300}} className='red-hat-font'>{ task.priority+' priority' }</Typography>
            </Box>
        </Grid>
    )
}
