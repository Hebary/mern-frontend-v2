import { Box, Grid, Typography } from "@mui/material"
import { Project as IProject } from "../../interfaces"
import { blue } from "@mui/material/colors"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks"


interface Props {
    project: IProject
}

export const Project: React.FC<Props> = ({project}) => {

    const { user } = useAuth();
    return (
        <Grid sx={{ my:1, borderRadius:3, p:3, ml:2, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', cursor:'pointer', ":hover":{ bgcolor:blue[50] }, transition: 'all .2s ease-in-out' }} item xs={12} md={10} >
            <Box display='flex' alignItems='center' flexWrap={'wrap'}>
                <Typography sx={{ fontWeight: 500 }} variant='body1' 
                   className='red-hat-font'>{ project.name } <span style={{color: blue[900], fontWeight:500, marginLeft:'20px', display:'inline-block'}}> { project.client } </span>
                </Typography>
                <Box flex={1} />
                <Typography sx={{color:'info.main', mr:3, fontWeight:900, textTransform:'uppercase' }} variant='body2'>{ user._id === project.creator ? 'Creator':'Contributor' }</Typography>
                <Link to={`${project._id}`} style={{ textDecoration:'none', fontSize:17, color:'#8EA7E9', fontWeight:300, textTransform:'capitalize'}} >{'view project'}</Link>
            </Box>
        </Grid>
    )
}
