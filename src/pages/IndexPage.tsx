import { grey } from "@mui/material/colors";
import { Layout } from "../components/layout"
import { Box, Grid, Typography } from '@mui/material';


export const IndexPage: React.FC = () => {
   return (
        <Layout>
           <Typography variant='h4' sx={{fontWeight:300}} className='red-hat-font'>My projects</Typography>
           <Grid container display='flex' mt={2} flexDirection='column' >
               
               <Grid sx={{ my:1, borderRadius:3, p:3, ml:2, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', cursor:'pointer', ":hover":{bgcolor:grey[200]}, transition: 'all .3s ease-in-out' }} item xs={12} md={10} >
                  <Box display='flex' alignItems='center'>
                     <Typography sx={{ fontWeight:300 }} variant='body1' 
                        className='red-hat-font'>Project 1
                     </Typography>
                     <Box flex={1} />
                     <Typography sx={{color:'#f58b54', fontWeight:900, textTransform:'uppercase' }} variant='body2'>Creator</Typography>
                  </Box>
               </Grid>

               <Grid sx={{fontWeight:300, my:1, borderRadius:3, p:3, ml:2, boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', cursor:'pointer', ":hover":{bgcolor:grey[200]}, transition: 'all .3s ease-in-out' }}item xs={12} md={10} >
                  <Box 
                  display='flex' alignItems='center'>
                     <Typography sx={{fontWeight:300}} variant='body1' 
                        className='red-hat-font'>Project 2
                     </Typography>
                     <Box flex={1} />
                     <Typography sx={{color:'#311E65', fontWeight:900, textTransform:'uppercase' }} variant='body2'>Contributor</Typography>
                  </Box>   
               </Grid>

            </Grid> 
        </Layout>
    )
}
