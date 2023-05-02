import { Box, Grid, Typography } from "@mui/material"
import { Project as IProject } from "../../interfaces"
import { grey } from "@mui/material/colors"


interface Props {
    project: IProject
}

export const Project: React.FC<Props> = ({project}) => {
   return (
        <Grid sx={{ my:1, borderRadius:3, p:3, ml:2, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', cursor:'pointer', ":hover":{bgcolor:grey[200]}, transition: 'all .3s ease-in-out' }} item xs={12} md={10} >
             <Box display='flex' alignItems='center'>
                <Typography sx={{ fontWeight:300 }} variant='body1' 
                   className='red-hat-font'>{ project.name } <span style={{color: '#8EA7E9', fontWeight:300}}> {project.client} </span>
                </Typography>
                <Box flex={1} />
                <Typography sx={{color:'#f58b54', fontWeight:900, textTransform:'uppercase' }} variant='body2'>Creator</Typography>
             </Box>
        </Grid>
    )
}
