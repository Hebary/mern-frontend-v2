import { Layout } from "../../components/layout"
import { Project } from "../../components/projects"
import { Grid, Typography } from '@mui/material';
import { useProjects } from "../../hooks";


export const Projects: React.FC = () => {

   const { projects } = useProjects();

   return (
        <Layout>
           <Typography variant='h4' sx={{fontWeight:300}} className='red-hat-font'>My projects</Typography>
           <Grid container display='flex' mt={2} flexDirection='column' >

               { projects.map( project => (
                  <Project key={project._id} project={project}/>
               ))}
               
            </Grid> 
        </Layout>
    )
}
